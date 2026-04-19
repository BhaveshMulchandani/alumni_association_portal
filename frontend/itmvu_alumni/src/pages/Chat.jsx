import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chatlayout from "../components/Chat/Chatlayout";

const Chat = () => {
  const { sessionId } = useParams();

  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null);

  const bottomRef = useRef(null);

  const currentUserId = localStorage.getItem("userId");

  // ✅ Fetch all sessions (conversations)
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/session`,
          { withCredentials: true }
        );

        const convos = res.data.sessions.map((s) => ({
          id: s._id,
          name:
            s.student?._id === currentUserId
              ? s.alumni.username
              : s.student.username,
          avatar: (
            s.student?._id === currentUserId
              ? s.alumni.username
              : s.student.username
          )?.charAt(0),
        }));

        setConversations(convos);

        if (sessionId) {
          setSelectedConvo(sessionId);
        } else if (convos.length > 0) {
          setSelectedConvo(convos[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSessions();
  }, [sessionId]);

  // ✅ Fetch messages for selected session
  useEffect(() => {
    if (!selectedConvo) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/chat/${selectedConvo}/messages`,
          { withCredentials: true }
        );

        const formatted = res.data.messages.map((m) => ({
          id: m._id,
          text: m.message,
          sender: m.sender._id === currentUserId ? "me" : "other",
          time: new Date(m.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages((prev) => ({
          ...prev,
          [selectedConvo]: formatted,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [selectedConvo]);

  // ✅ scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConvo]);

  // ✅ send message
  const sendMessage = async () => {
    if (!input.trim() || !selectedConvo) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/${selectedConvo}/messages`,
        { message: input },
        { withCredentials: true }
      );

      const newMsg = {
        id: res.data.newmessage._id,
        text: res.data.newmessage.message,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedConvo]: [...(prev[selectedConvo] || []), newMsg],
      }));

      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Chatlayout
      conversations={conversations}
      selectedConvo={selectedConvo}
      setSelectedConvo={setSelectedConvo}
      messages={messages}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      bottomRef={bottomRef}
    />
  );
};

export default Chat;
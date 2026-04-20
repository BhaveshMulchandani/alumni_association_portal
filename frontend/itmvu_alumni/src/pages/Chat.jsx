import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chatlayout from "../components/Chat/Chatlayout";
import socket from "../socket";

const Chat = () => {
  const { sessionId } = useParams();

  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const bottomRef = useRef(null);

  // 🔥 STEP 1: GET CURRENT USER (IMPORTANT)
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/me`,
          { withCredentials: true }
        );

        setCurrentUserId(String(res.data.user._id));
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchMe();
  }, []);

  // 🔹 STEP 2: FETCH SESSIONS
  useEffect(() => {
    if (!currentUserId) return;

    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/session`,
          { withCredentials: true }
        );

        const convos = res.data.sessions.map((s) => ({
          id: s._id,
          name:
            String(s.student?._id) === currentUserId
              ? s.alumni.username
              : s.student.username,
          avatar: (
            String(s.student?._id) === currentUserId
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
        console.error("Session fetch error:", err);
      }
    };

    fetchSessions();
  }, [sessionId, currentUserId]);

  // 🔹 STEP 3: SOCKET JOIN
  useEffect(() => {
    if (!selectedConvo) return;

    socket.emit("join_session", selectedConvo);

    return () => {
      socket.emit("leave_session", selectedConvo);
    };
  }, [selectedConvo]);

  // 🔹 STEP 4: RECEIVE MESSAGE (REALTIME)
  useEffect(() => {
    if (!currentUserId) return;

    const handler = (data) => {
      const newMsg = {
        id: data._id,
        text: data.message,
        sender:
          String(data.sender._id) === currentUserId ? "me" : "other",
        time: new Date(data.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => {
        const existing = prev[data.session] || [];

        if (existing.some((m) => m.id === data._id)) return prev;

        return {
          ...prev,
          [data.session]: [...existing, newMsg],
        };
      });
    };

    socket.on("receive_message", handler);

    return () => socket.off("receive_message", handler);
  }, [currentUserId]);

  // 🔹 STEP 5: FETCH MESSAGES
  useEffect(() => {
    if (!selectedConvo || !currentUserId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/chat/${selectedConvo}/messages`,
          { withCredentials: true }
        );

        const formatted = res.data.messages.map((m) => ({
          id: m._id,
          text: m.message,
          sender:
            String(m.sender._id) === currentUserId ? "me" : "other",
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
        console.error("Message fetch error:", err);
      }
    };

    fetchMessages();
  }, [selectedConvo, currentUserId]);

  // 🔹 STEP 6: SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConvo]);

  // 🔹 STEP 7: SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim() || !selectedConvo) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chat/${selectedConvo}/messages`,
        { message: input },
        { withCredentials: true }
      );

      setInput("");
    } catch (err) {
      console.error("Send error:", err);
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
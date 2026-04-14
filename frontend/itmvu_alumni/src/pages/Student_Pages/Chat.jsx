import { useState, useRef, useEffect } from "react";
import Chatlayout from "../../components/Chat/Chatlayout";

const conversations = [
  { id: 1, name: "Rahul Verma", avatar: "RV", lastMsg: "Sure, let's discuss React hooks.", time: "2m ago", unread: 2 },
  { id: 2, name: "Dr. Ananya Sharma", avatar: "AS", lastMsg: "I'll share some resources.", time: "1h ago", unread: 0 },
  { id: 3, name: "Sneha Reddy", avatar: "SR", lastMsg: "Great portfolio! Keep it up.", time: "3h ago", unread: 0 },
];

const mockMessages = {
  1: [
    { id: 1, text: "Hi Rahul! I had a question about React hooks.", sender: "me", time: "10:30 AM" },
    { id: 2, text: "Sure! What do you want to know?", sender: "other", time: "10:31 AM" },
    { id: 3, text: "When should I use useCallback vs useMemo?", sender: "me", time: "10:32 AM" },
    { id: 4, text: "useCallback memoizes functions, useMemo memoizes values. Use useCallback when passing callbacks to child components.", sender: "other", time: "10:33 AM" },
  ],
  2: [
    { id: 1, text: "Hello Dr. Sharma! Could you recommend resources for ML?", sender: "me", time: "9:00 AM" },
    { id: 2, text: "I'll share some resources.", sender: "other", time: "9:15 AM" },
  ],
  3: [
    { id: 1, text: "Thanks for reviewing my portfolio!", sender: "me", time: "Yesterday" },
    { id: 2, text: "Great portfolio! Keep it up.", sender: "other", time: "Yesterday" },
  ],
};

const Chat = () => {
  const [selectedConvo, setSelectedConvo] = useState(1);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConvo, messages]);

  const sendMessage = () => {
    if (!input.trim() || !selectedConvo) return;

    const newMsg = {
      id: Date.now(),
      text: input.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedConvo]: [...(prev[selectedConvo] || []), newMsg],
    }));

    setInput("");
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
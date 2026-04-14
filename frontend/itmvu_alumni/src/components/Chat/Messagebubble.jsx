const Messagebubble = ({ msg }) => {
  return (
    <div className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
          msg.sender === "me"
            ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-br-md"
            : "bg-white text-gray-800 border border-pink-100 rounded-bl-md"
        }`}
      >
        <p>{msg.text}</p>
        <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-pink-100" : "text-gray-400"}`}>
          {msg.time}
        </p>
      </div>
    </div>
  );
};

export default Messagebubble;
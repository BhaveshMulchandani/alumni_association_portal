const Messagebubble = ({ msg }) => {
  return (
    <div className={`flex mb-4 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
          msg.sender === "me"
            ? "bg-pink-500 text-white rounded-br-sm"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
        }`}
      >
        <p className="break-words">{msg.text}</p>
        <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-pink-100" : "text-gray-400"}`}>
          {msg.time}
        </p>
      </div>
    </div>
  );
};

export default Messagebubble;
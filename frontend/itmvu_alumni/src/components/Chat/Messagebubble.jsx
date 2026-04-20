const Messagebubble = ({ msg }) => {
  const isMe = msg?.sender === "me";

  return (

    <div className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
          isMe
            ? "bg-pink-500 text-white rounded-br-sm"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
        }`}
      >
        <p className="break-words">{msg?.text || ""}</p>

        <p
          className={`text-xs mt-1 ${isMe ? "text-pink-100" : "text-gray-400"}`}
        >
          {msg?.time || ""}
        </p>
      </div>
    </div>
  );
};
export default Messagebubble;

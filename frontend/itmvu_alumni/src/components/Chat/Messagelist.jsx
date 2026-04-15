import Messagebubble from "./Messagebubble";

const Messagelist = ({ messages, bottomRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map(msg => (
        <Messagebubble key={msg.id} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messagelist;
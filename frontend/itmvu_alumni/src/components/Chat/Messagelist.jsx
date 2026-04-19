import Messagebubble from "./Messagebubble";

const Messagelist = ({ messages, bottomRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages?.length > 0 ? (
        messages.map((msg) => (
          <Messagebubble key={msg.id || msg._id} msg={msg} />
        ))
      ) : (
        <p className="text-center text-gray-500 text-sm mt-4">
          No messages yet
        </p>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default Messagelist;

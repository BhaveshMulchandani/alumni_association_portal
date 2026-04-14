import ConversationItem from "./Conversationitem";

const Conversationlist = ({ conversations, selectedConvo, setSelectedConvo }) => {
  return (
    <div className="w-full sm:w-80 bg-white border-r border-pink-100 flex flex-col">
      <div className="p-4 border-b border-pink-50">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map(c => (
          <ConversationItem
            key={c.id}
            convo={c}
            isActive={selectedConvo === c.id}
            onClick={() => setSelectedConvo(c.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Conversationlist;
import ConversationItem from "./Conversationitem";

const Conversationlist = ({
  conversations,
  selectedConvo,
  setSelectedConvo,
}) => {
  return (
    <div className="w-full sm:w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations?.length > 0 ? (
          conversations.map((c) => (
            <ConversationItem
              key={c.id}
              convo={c}
              isActive={selectedConvo === c.id}
              onClick={() => setSelectedConvo(c.id)}
            />
          ))
        ) : (
          <p className="p-4 text-gray-500 text-sm">No conversations yet</p>
        )}
      </div>
    </div>
  );
};

export default Conversationlist;

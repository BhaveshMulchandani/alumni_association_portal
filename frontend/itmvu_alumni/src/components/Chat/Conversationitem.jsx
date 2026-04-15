const Conversationitem = ({ convo, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-l-4 ${
        isActive ? "bg-blue-50 border-pink-500" : "border-transparent"
      }`}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
        {convo.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-800 text-sm truncate">{convo.name}</span>
          <span className="text-xs text-gray-400">{convo.time}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">{convo.lastMsg}</p>
      </div>
      {convo.unread > 0 && (
        <span className="w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center shrink-0">
          {convo.unread}
        </span>
      )}
    </button>
  );
};

export default Conversationitem;
import { ArrowRight } from "lucide-react";
const Chatinput = ({ input, setInput, sendMessage }) => {
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage();
  };
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={!input.trim()}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500 text-white hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chatinput;

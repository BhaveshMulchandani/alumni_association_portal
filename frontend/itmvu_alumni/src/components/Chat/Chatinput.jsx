const Chatinput = ({ input, setInput, sendMessage }) => {
  return (
    <div className="p-3 bg-white border-t border-pink-100 sticky bottom-0">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-pink-50/50"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatinput;
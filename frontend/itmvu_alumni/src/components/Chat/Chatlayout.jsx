import ConversationList from "./Conversationlist";
import ChatHeader from "./Chatheader";
import MessageList from "./Messagelist";
import ChatInput from "./Chatinput";
import { GraduationCap } from "lucide-react";

const ChatLayout = (props) => {
  const { conversations, selectedConvo, setSelectedConvo, messages } = props;

  const activeConvo = conversations.find(c => c.id === selectedConvo);
  const currentMessages = selectedConvo ? messages[selectedConvo] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Alumni Connect</h1>
              <p className="text-sm text-gray-500">Messages</p>
            </div>
          </div>
          <button type="button" className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 73px)" }}>
        <ConversationList {...props} />

        <div className={`flex-1 flex flex-col ${!selectedConvo ? "hidden sm:flex" : "flex"}`}>
          {activeConvo ? (
            <>
              <ChatHeader convo={activeConvo} setSelectedConvo={setSelectedConvo} />
              <MessageList messages={currentMessages} bottomRef={props.bottomRef} />
              <ChatInput {...props} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <GraduationCap className="w-16 h-16 mx-auto mb-3 text-pink-200" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">Choose a mentor to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
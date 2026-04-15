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
    <div className="flex h-full bg-gray-50 overflow-hidden">

      {/* LEFT SIDE */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <ConversationList {...props} />
      </div>

      {/* RIGHT SIDE */}
      <div className={`flex-1 flex flex-col ${!selectedConvo ? "hidden sm:flex" : "flex"}`}>
        
        {activeConvo ? (
          <>
            <ChatHeader convo={activeConvo} setSelectedConvo={setSelectedConvo} />

            {/* MESSAGE AREA */}
            <div className="flex-1 overflow-y-auto">
              <MessageList messages={currentMessages} bottomRef={props.bottomRef} />
            </div>

            {/* INPUT */}
            <ChatInput {...props} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-600">Select a conversation</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatLayout;
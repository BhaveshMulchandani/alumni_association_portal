import { useState, useEffect } from "react";
import Navbar_alumni from "../../componenets/Navbar_alumni";
import axios from "axios";

const Dashboard = () => {
  const [allposts, setallposts] = useState([]);
  const [activeChat, setActiveChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  // Mock data for chat UI
  const [messages, setMessages] = useState([
    { id: 1, sender: "Bhavesh Mulchandani", text: "Hey! How is your new job going?", time: "10:30 AM", isMe: false },
    { id: 2, sender: "Me", text: "It's going great! The team is amazing.", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Bhavesh Mulchandani", text: "Awesome! We should catch up soon.", time: "10:35 AM", isMe: false },
  ]);

  const fetchposts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/post/allposts`,
        { withCredentials: true }
      );
      setallposts(res.data.posts);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  const handlelike = async (postid) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/post/likepost/${postid}`, {}, { withCredentials: true });
      fetchposts();
    } catch (error) {
      console.log("error when we click on like", error);
    }
  };

  useEffect(() => {
    fetchposts();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessages([...messages, { 
      id: messages.length + 1, 
      sender: "Me", 
      text: chatMessage, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
      isMe: true 
    }]);
    setChatMessage("");
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar_alumni />
      
      <main className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Welcome back, Bhavesh! 👋
            </h1>
            <p className="text-indigo-100 max-w-2xl text-lg">
              Check out the latest updates from your alumni network, mentor students, or explore new opportunities.
            </p>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -m-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-32 -m-16 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Feed Section */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Create Post Prompt */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center space-x-4 cursor-text transition-shadow hover:shadow-md">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
                alt="Your profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50"
              />
              <div className="flex-1 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full px-5 py-3 text-gray-500 text-sm">
                Share an update or post a new job...
              </div>
              <button className="p-3 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors">
                <i className="ri-image-add-line text-2xl"></i>
              </button>
            </div>

            {/* Posts */}
            {allposts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
                <p className="text-gray-500 mt-6">Loading fresh updates...</p>
              </div>
            ) : (
              allposts.map((post) => (
                <div key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?w=600&auto=format&fit=crop&q=60"
                        alt="Author"
                        className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm"
                      />
                      <div>
                        <h2 className="font-semibold text-gray-900 text-lg">Bhavesh M</h2>
                        <h3 className="font-medium text-indigo-500 text-sm">
                          Software Engineer at Amazon
                        </h3>
                        <p className="text-gray-400 text-xs mt-0.5">2 hours ago</p>
                      </div>
                      <button className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full">
                        <i className="ri-more-2-fill text-xl"></i>
                      </button>
                    </div>

                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[15px]">
                      {post.caption}
                    </p>
                  </div>
                  
                  {post.image && (
                    <div className="border-t border-b border-gray-50 bg-gray-50 flex justify-center">
                      <img
                        src={post.image}
                        alt="Post attachment"
                        className="w-full object-contain max-h-[500px]"
                      />
                    </div>
                  )}

                  <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between border-t border-gray-50">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handlelike(post._id)}
                        className="group flex items-center space-x-2 text-gray-500 hover:text-pink-600 transition-colors"
                      >
                        <div className="p-2 rounded-full group-hover:bg-pink-100 transition-colors">
                          <i className={`text-xl ${post.likes?.includes('my_id') ? 'ri-heart-3-fill text-pink-500' : 'ri-heart-3-line'}`}></i>
                        </div>
                        <span className="font-medium text-sm">{post.likes?.length || 0}</span>
                      </button>
                      <button className="group flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                        <div className="p-2 rounded-full group-hover:bg-indigo-100 transition-colors">
                          <i className="ri-chat-3-line text-xl"></i>
                        </div>
                        <span className="font-medium text-sm">Comment</span>
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-indigo-600 flex items-center space-x-2 group">
                      <span className="font-medium text-sm hidden sm:inline">Share</span>
                      <div className="p-2 rounded-full group-hover:bg-indigo-100 transition-colors">
                        <i className="ri-share-forward-line text-xl"></i>
                      </div>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat / Messages Section */}
          <div className="w-full lg:w-1/3 flex flex-col h-[600px] lg:h-[calc(100vh-8rem)] sticky top-28">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 shadow-indigo-100/50 flex flex-col h-full overflow-hidden transition-all duration-300">
              
              {!activeChat ? (
                <>
                  {/* Messages List view */}
                  <div className="p-5 border-b border-gray-100 bg-white z-10 relative">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-bold text-xl text-gray-900 tracking-tight">Messages</h2>
                      <span className="bg-pink-100 text-pink-600 py-1 px-3 rounded-full text-xs font-bold tracking-wide">2 NEW</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all text-sm outline-none placeholder-gray-400"
                      />
                      <i className="ri-search-2-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Chat Item */}
                    <div 
                      onClick={() => setActiveChat(true)}
                      className="flex items-center justify-between p-4 px-5 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-transparent hover:border-indigo-500"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            className="rounded-full w-12 h-12 object-cover border border-gray-200 shadow-sm"
                            src="https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=600&auto=format&fit=crop&q=60"
                            alt="avatar"
                          />
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">Bhavesh Mulchandani</h3>
                          <p className="text-gray-500 text-xs truncate w-36 sm:w-48 lg:w-32 xl:w-40">Awesome! We should catch up soon.</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1.5 min-w-[50px]">
                        <span className="text-[11px] font-medium text-gray-400">10:35 AM</span>
                        <span className="bg-indigo-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold shadow-sm shadow-indigo-200">1</span>
                      </div>
                    </div>
                    
                    {/* Mock Chat Item 2 */}
                    <div className="flex items-center justify-between p-4 px-5 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-transparent">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            className="rounded-full w-12 h-12 object-cover border border-gray-200"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60"
                            alt="avatar"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">Rahul Sharma</h3>
                          <p className="text-gray-500 text-xs truncate w-36 sm:w-48 lg:w-32 xl:w-40">Thanks for the referral! Really appreciate it.</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1.5 min-w-[50px]">
                        <span className="text-[11px] font-medium text-gray-400">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col h-full animate-fade-in">
                  {/* Chat interface header */}
                  <div className="p-3.5 border-b border-gray-100 flex items-center bg-white z-10">
                    <button 
                      onClick={() => setActiveChat(false)}
                      className="mr-3 p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                    >
                      <i className="ri-arrow-left-s-line text-2xl leading-none"></i>
                    </button>
                    <div className="relative">
                      <img
                        className="rounded-full w-10 h-10 object-cover border border-gray-200"
                        src="https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=600&auto=format&fit=crop&q=60"
                        alt="avatar"
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></div>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">Bhavesh Mulchandani</h3>
                      <p className="text-green-500 text-xs font-medium mt-0.5">Online</p>
                    </div>
                    <div className="ml-auto flex space-x-1">
                      <button className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors"><i className="ri-phone-line text-lg"></i></button>
                      <button className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors"><i className="ri-more-2-fill text-lg"></i></button>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 overflow-y-auto p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-gray-50/80 flex flex-col space-y-4 custom-scrollbar">
                    <div className="text-center w-full mb-2">
                      <span className="bg-gray-200/70 text-gray-500 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">Today</span>
                    </div>
                    
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm relative group ${msg.isMe ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-none shadow-indigo-200' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}>
                          <p className="text-[14px] leading-relaxed">{msg.text}</p>
                          <span className={`text-[10px] mt-1.5 block font-medium ${msg.isMe ? 'text-indigo-100 text-right' : 'text-gray-400 text-left'}`}>
                            {msg.time} {msg.isMe && <i className="ri-check-double-line ml-1 text-indigo-200"></i>}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input - Sticky at bottom */}
                  <div className="p-3.5 bg-white border-t border-gray-100 z-10">
                    <form 
                      onSubmit={handleSendMessage}
                      className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-4 pr-1.5 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 focus-within:bg-white transition-all shadow-sm inset-shadow-sm"
                    >
                      <button type="button" className="text-gray-400 hover:text-pink-500 transition-colors p-1">
                        <i className="ri-emotion-line text-xl"></i>
                      </button>
                      <button type="button" className="text-gray-400 hover:text-indigo-500 transition-colors p-1">
                        <i className="ri-attachment-2 text-xl"></i>
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 px-2 outline-none w-full placeholder-gray-400"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                      />
                      <button 
                        type="submit"
                        disabled={!chatMessage.trim()}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all shadow-sm ml-2 ${chatMessage.trim() ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                      >
                        <i className="ri-send-plane-fill"></i>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;

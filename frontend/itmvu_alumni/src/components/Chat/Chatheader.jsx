import React from 'react';

const Chatheader = ({ convo, setSelectedConvo }) => {
  return (
    <div className="flex items-center space-x-3 px-4 py-3 bg-white border-b border-gray-200">
      <button
        type="button"
        onClick={() => setSelectedConvo(null)}
        className="sm:hidden text-gray-500 hover:text-gray-700 p-1"
      >
        {/* <ArrowLeft className="w-5 h-5" /> */}
        ←
      </button>
      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
        {convo?.avatar || "?"}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-base">{convo?.name || "User"}</h3>
      </div>
    </div>
  );
};

export default Chatheader;
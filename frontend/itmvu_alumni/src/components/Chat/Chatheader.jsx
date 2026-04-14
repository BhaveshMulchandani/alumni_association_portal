import React from 'react';
import { ArrowLeft } from "lucide-react";

const Chatheader = ({ convo, setSelectedConvo }) => {
  return (
    <div className="flex items-center space-x-3 px-4 py-3 bg-white border-b border-pink-100">
      <button
        type="button"
        onClick={() => setSelectedConvo(null)}
        className="sm:hidden text-gray-500 hover:text-pink-500"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="w-9 h-9 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
        {convo.avatar}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 text-sm">{convo.name}</h3>
        <p className="text-xs text-green-500">Online</p>
      </div>
    </div>
  );
};

export default Chatheader;
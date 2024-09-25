import React, { useState, useEffect } from "react";
import { useChat, useChatHistory } from "@/hooks/chat";
import { useConversation } from "@/hooks/convo";
import api from "@/api";
import socket from "@/socket";

interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  content: string;
  timestamp: string;
}

const Chat: React.FC<{ receiverId: string }> = ({ receiverId }) => {


 

  return (
    <div className="h-g">
     message section
    </div>
  );
};

export default Chat;


import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fadeIn`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-3xl shadow-sm ${
          isUser
            ? 'bg-[#ccd5ae] text-[#4a5d23] rounded-br-none'
            : 'bg-white text-[#604439] border border-[#faedcd] rounded-bl-none'
        }`}
      >
        <p className={`text-base leading-relaxed ${isUser ? 'font-medium' : 'font-serif-biblical'}`}>
          {message.content.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className={`text-[10px] mt-2 opacity-50 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

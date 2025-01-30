import React, { useState } from 'react';

const ChatInterface = () => {

  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState([
    {
      id: 0,
      text:  "Ask Me anything..." ,
      sender: "bot"
    }
  ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newMessage = {
      id: message.length + 1,
      text: inputText,
      sender: "user"
    };
    setMessage((prev) => [...prev, newMessage]);

    await call(inputText);
    setInputText("");
  };

  const call = async (inputText) => {
    try {
      const make = await fetch("https://gemini-backend-five.vercel.app/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputText
        })
      });

      
      const response = await make.json();
      

 

      const botResponse = {
        id: message.length + 2,
        text: response.text ? response.text : "Ask Me anything..." ,
        sender: "bot"
      };

      setMessage((prev) => [...prev, botResponse]);

    } catch (error) {
      console.log("Something went wrong", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen sm:w-96 w-full mx-auto bg-gray-50">
      <div className="bg-blue-600 p-4 shadow-md">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-blue-600 font-bold">IG</span>
          </div>
          <h1 className="text-xl font-bold text-white ml-3">Imran Gemini</h1>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto min-w-full">
  <div className="space-y-4">
    {message.map((message) => (
      <div
        key={message.id}
        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        {message.sender === 'bot' && (
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
        )}
        <div
          className={`max-w-sm p-3 rounded-2xl ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow-sm'}`}
        >
          {message.text}
        </div>
        {message.sender === 'user' && (
          <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ml-2 flex-shrink-0">
            <span className="text-white font-bold text-sm">U</span>
          </div>
        )}
      </div>
    ))}
  </div>
</div>


      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSend} className="flex space-x-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <span className="font-semibold">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

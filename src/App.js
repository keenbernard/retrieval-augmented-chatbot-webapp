import './App.css';
import { AuthenticatedTemplate } from "@azure/msal-react";
import { useMsalAuthentication } from "@azure/msal-react";
import {InteractionType} from "@azure/msal-browser";
import React, { useEffect, useState, useRef } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import ProfileContent from "./components/Microsoft/ProfileContent";
import SignOutButton from "./components/Microsoft/SignOutButton";
import {useProfileData} from "./hooks/ProfileState"
import DOMPurify from "dompurify";

const App = () => {
  useMsalAuthentication(InteractionType.Redirect);
  const [chats, setChats] = useState([]); // List of all chats
  const [activeChatId, setActiveChatId] = useState(null); // Currently active chat ID
  const [loading, setLoading] = useState(false);
  const chatHistory = useRef(null);
  const {serverConnection, userRole} = useProfileData();

  const createNewChat = async (isInitial = false) => {
    const newChat = {
      id: chats.length + 1,
      title: isInitial ? 'Welcome Chat' : `New Chat ${chats.length + 1}`,
      qaHistory: [],
      initialized: false,
    };

    setChats((prevChats) => [newChat, ...prevChats]); // Add new chat to state
    setActiveChatId(newChat.id); // Set it as the active chat

    // Initialize the chat
    try {
      const response = await fetch(`${serverConnection}/initialize`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ directory: 'policies' }),
      });

      const initialize_response = await response.json();
      // console.log('Initialize Response:', initialize_response.message);

      // Mark the chat as initialized
      setChats((prevChats) =>
          prevChats.map((chat) =>
              chat.id === newChat.id
                  ? { ...chat, initialized: true, message: initialize_response.message }
                  : chat
          )
      );
    } catch (e) {
      console.error('Failed to initialize chat:', e);
    }
  };

  const queryChatbot = async (question) => {
    if (!activeChatId) return;

    // Add the question to the active chat's history
    setChats((prevChats) =>
        prevChats.map((chat) =>
            chat.id === activeChatId
                ? { ...chat, qaHistory: [...chat.qaHistory, { type: 'question', text: question }] }
                : chat
        )
    );

    setLoading(true);

    try {
      const response = await fetch(`${serverConnection}/query`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: question, role: userRole }),
      });

      const query_answer = await response.json();
      const formattedAnswer = query_answer.answer
          .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
          .replace(/\n/g, "<br>");
      const safeAnswer = DOMPurify.sanitize(formattedAnswer);

      // Add the answer to the active chat's history
      setChats((prevChats) =>
          prevChats.map((chat) =>
              chat.id === activeChatId
                  ? { ...chat, qaHistory: [...chat.qaHistory, { type: 'answer', text: safeAnswer  }] }
                  : chat
          )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = e.target.query.value.trim();
    if (question) {
      queryChatbot(question);
      e.target.query.value = ''; // Clear the input field
    }
  };

  const scrollToBottom = () => {
    if (chatHistory.current) {
      chatHistory.current.scrollTo({
        top: chatHistory.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // Automatically create a chat on first load
  useEffect(() => {
    if (chats.length === 0) {
      createNewChat(true); // Pass `true` for the first "Welcome Chat"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this only runs once on load

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
      <AuthenticatedTemplate>
        <div className="chat-app" data-testid="chat-app">
          <ProfileContent />
          <Sidebar data-testid="side-bar-module"
              chats={chats}
              activeChatId={activeChatId}
              onNewChat={() => createNewChat(false)} // Pass `false` for user-created chats
              onSelectChat={setActiveChatId}
          />
          <div className="chat-section">
            <div className='SignOut'>
              <SignOutButton />
            </div>
            {activeChat ? (
                <>
                  <div className="chat-history" ref={chatHistory}>
                    {activeChat.qaHistory.map((item, index) => (
                        <div
                            key={index}
                            className={`chat-bubble ${
                                item.type === 'question' ? 'chat-question' : 'chat-answer'
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.text }}
                        >
                        </div>
                    ))}
                    {loading && <div className="chat-loading">Thinking...</div>}
                  </div>

                  <form className="chat-input-container" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="query"
                        className="chat-input"
                        placeholder="Try me! Ask anything on policies and labour laws"
                        disabled={loading}
                    />
                    <button type="submit" className="chat-submit" disabled={loading}>
                      {loading ? 'Thinking...' : 'Send'}
                    </button>
                  </form>
                </>
            ) : (
                <div className="chat-placeholder">No chat selected. Create a new one!</div>
            )}
          </div>
        </div>
      </AuthenticatedTemplate>
  );
};

export default App;
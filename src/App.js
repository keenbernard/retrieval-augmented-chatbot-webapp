import './App.css';
import { useEffect, useState, useRef } from 'react';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  const [chats, setChats] = useState([]); // List of all chats
  const [activeChatId, setActiveChatId] = useState(null); // Currently active chat ID
  const [loading, setLoading] = useState(false);
  const chatHistory = useRef(null);

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
      const response = await fetch('http://localhost:3001/initialize', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ directory: 'policies' }),
      });

      const initialize_response = await response.json();
      console.log('Initialize Response:', initialize_response.message);

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
      const response = await fetch('http://localhost:3001/query', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: question }),
      });

      const query_answer = await response.json();

      // Add the answer to the active chat's history
      setChats((prevChats) =>
          prevChats.map((chat) =>
              chat.id === activeChatId
                  ? { ...chat, qaHistory: [...chat.qaHistory, { type: 'answer', text: query_answer.answer }] }
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
  }, []); // Empty dependency array ensures this only runs once on load

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  return (
      <div className="chat-app">
        <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            onNewChat={() => createNewChat(false)} // Pass `false` for user-created chats
            onSelectChat={setActiveChatId}
        />
        <div className="chat-section">
          {activeChat ? (
              <>
                <div className="chat-history" ref={chatHistory}>
                  {activeChat.qaHistory.map((item, index) => (
                      <div
                          key={index}
                          className={`chat-bubble ${
                              item.type === 'question' ? 'chat-question' : 'chat-answer'
                          }`}
                      >
                        {item.text}
                      </div>
                  ))}
                  {loading && <div className="chat-loading">Thinking...</div>}
                </div>

                <form className="chat-input-container" onSubmit={handleSubmit}>
                  <input
                      type="text"
                      name="query"
                      className="chat-input"
                      placeholder="Ask a question..."
                      disabled={loading}
                  />
                  <button type="submit" className="chat-submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Send'}
                  </button>
                </form>
              </>
          ) : (
              <div className="chat-placeholder">No chat selected. Create a new one!</div>
          )}
        </div>
      </div>
  );
};

export default App;

import './App.css';
import {useEffect, useState} from "react";

const App = () => {
  const [directory, setDirectory] = useState('policies');
  const [query, setQuery] = useState('');
  const [qaHistory, setQaHistory] = useState([]);
  const [loading, setLoading] = useState(false);


  const queryChatbot = async (question) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/query', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          query: question
        })
      });

      const query_answer = await response.json();
      setQaHistory((prev) => [...prev, { question: question, answer: query_answer.answer }]);
      setQuery('')

      console.log(JSON.stringify(query_answer, null, 2));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await fetch('http://localhost:3001/initialize', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, body: JSON.stringify({
            directory: directory
          })
        });

        const initialize_response = await response.json();

        console.log('Initialize Response:', initialize_response.message);

      } catch (e) {
        console.log(e);
      }
    }
    initialize().then(() => {
      const controller = new AbortController();
      controller.abort();
    });
  }, [directory]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{textAlign: 'left', maxWidth: '1400px'}}>
          {qaHistory.map((qa, index) => (
              <div key={index} style={{marginBottom: '15px', color: 'white'}}>
                <strong style={{color: "darkgray"}}>Q{index + 1}: {qa.question}</strong>
                <p style={{margin: 1, color: 'whitesmoke', wordWrap: 'break-word', lineHeight: 1.5}}>A: {qa.answer}</p>
              </div>
          ))}
        </div>
        <div style={{textAlign: 'left', marginTop: '20px', maxWidth: '1400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <input
              type="text"
              value={query}
              placeholder="Enter your question here..."
              onChange={(e) => setQuery(e.target.value)}
              style={{margin: '0 10px', padding: '5px'}}
          />
          <button
              style={{margin: '0 10px', padding: '5px'}}
              className="App-button"
              onClick={() => {
                if (query.trim()) queryChatbot(query);
              }}
          >
            {loading ? 'Loading...' : 'Submit Question'}
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;

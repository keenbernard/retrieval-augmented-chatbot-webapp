import React from 'react'
import './ChatInput.css'

const ChatInput = (props) => {

  return (
      <form className="chat-input-container" onSubmit={props.handlesubmit}>
        <input
            type="text"
            name="query"
            className="chat-input"
            placeholder="Try me! Ask anything on policies and labour laws"
            disabled={props.loading}
        />
        <button type="submit" className="chat-submit" disabled={props.loading}>
          {props.loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
  )
}

export default ChatInput;
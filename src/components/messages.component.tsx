import React, { FC, ChangeEvent } from "react";
import { Message } from "../domain/models/message.model";

export interface MessagesComponentProps {
  onMessage: Function;
  messagesHistory: Message[] | null;
}
const MessagesComponent: FC<MessagesComponentProps> = ({
  onMessage,
  messagesHistory,
}) => {
  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const message = formData.get("message");
    e.target.reset();
    onMessage(message);
  };

  return (
    <div>
      <div className="messages-wrapper">
    
          {messagesHistory &&
            messagesHistory.map((message) => (
              <div key={message.getHashCode()} className="message">
                <small>From: {message.from}</small><br/>
                <span>{message.message}</span>
              </div>
            ))}
       
      </div>
      <div className="message-wrapper text-left">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label>Message:</label>
            <input
              type="text"
              required
              autoFocus
              className="form-control"
              id="txtMessage"
              name="message"
              placeholder="Enter your message"
            />
          </div>
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
};

export default MessagesComponent;

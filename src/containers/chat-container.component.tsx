import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatService } from "../domain/services/chat.service";
import { setActiveUsers, setSelectedUser, userConnected, setMessagesHistory, addNewMessage } from "../store/actions";
import { RootState } from "../store";
import UsersComponent from "../components/users.component";
import MessagesComponent from "../components/messages.component";
import { User } from "../domain/models/user.model";
import { ModelFactory } from "../domain/factories/model.factory";
import { Message } from "../domain/models/message.model";


export interface ChatContainerProps {}
const ChatContainer: FC<ChatContainerProps> = () => {
  const dispatch = useDispatch();
  const activeUsers = useSelector((state: RootState) => state.global.activeUsers);
  const selectedUser = useSelector((state: RootState) => state.global.selectedUser);
  const messagesHistory = useSelector((state: RootState) => state.global.messagesHistory);

  const conectedHandler = (e: any) => {
    console.log('connected');
    ChatService.getInstance().getConnectedUsers().then((users)=>{
      dispatch(setActiveUsers(users));
    });
  }

  const onMessageHandler = (e: Object) => {
    console.log(e);
    dispatch(addNewMessage(ModelFactory.getInstance().create<Message>(Message as any, e)));
  }
  const onUserConnected = (userDTO: any) => {
    console.log(userDTO);
    dispatch(userConnected(ModelFactory.getInstance().create<User>(User as any, userDTO)));
  }
  const onUserDisconnected = (e: any) => {
    console.log(e);
  }
  const onErrorHandler = (e: any) => {
    console.log(e);
  }

  const onMessageSend = (message: string) => {
    if(!selectedUser){
      return;
    }
    console.log(message);
    const userId = selectedUser.getHashCode();
    ChatService.getInstance().sendMessage(message, userId);
  }

  const onUserClick = (user: User) => {
    dispatch(setSelectedUser(user));
    const userId = user.getHashCode();
    ChatService.getInstance().getChatHistory(userId).then((messages)=>{
      dispatch(setMessagesHistory(messages));
    })
  }


  useEffect(() => {
    ChatService.getInstance().connect(conectedHandler, onMessageHandler, onUserConnected, onUserDisconnected, onErrorHandler);
}, []);

  return (
    <div className="row">
      <div className="col-md-4">
      <UsersComponent users={activeUsers} selectedUser={selectedUser} onUserClick={onUserClick} />
      </div>
      <div className="col-md-8">
        {selectedUser?<MessagesComponent onMessage={onMessageSend} messagesHistory={messagesHistory} />:<div>Please select user!</div>}
        
      </div>
    </div>
  );
};

export default ChatContainer;

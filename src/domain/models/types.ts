import { User } from "./user.model";
import { Message } from "./message.model";

export interface UserDTO {
    name: string;
    username: string;
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_ACTIVE_USERS = 'SET_ACTIVE_USERS';
export const SET_SELECTED_USER = 'SET_SELECTED_USER';
export const USER_CONNECTED = 'USER_CONNECTED';
export const SET_MESSAGES_HISTORY = 'SET_MESSAGE_HISTORY';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

interface GetCurrentUser {
    type: typeof SET_CURRENT_USER;
    payload: User;
}

interface SetActiveUsers {
    type: typeof SET_ACTIVE_USERS;
    payload: User[];
}

interface SetSelectedUser {
    type: typeof SET_SELECTED_USER;
    payload: User;
}

interface UserConnected {
    type: typeof USER_CONNECTED;
    payload: User;
}

interface SetMessagesHistory {
    type: typeof SET_MESSAGES_HISTORY;
    payload: Message[];
}
interface AddNewMessage {
    type: typeof ADD_NEW_MESSAGE;
    payload: Message;
}

export type StoreAction = GetCurrentUser | SetActiveUsers | SetSelectedUser | UserConnected | SetMessagesHistory | AddNewMessage;

export interface GlobalState {
    currentUser: User;
    selectedUser: User;
    messagesHistory: Message[];
    activeUsers: User[];
    isLoggedIn: boolean;
}
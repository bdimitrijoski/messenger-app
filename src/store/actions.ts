import { SET_CURRENT_USER, StoreAction, SET_ACTIVE_USERS, SET_SELECTED_USER, USER_CONNECTED, SET_MESSAGES_HISTORY, ADD_NEW_MESSAGE } from "../domain/models/types";
import { User } from "../domain/models/user.model";
import { Message } from "../domain/models/message.model";

export const setCurrentUser = (user: User): StoreAction => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};
export const setSelectedUser = (user: User): StoreAction => {
    return {
        type: SET_SELECTED_USER,
        payload: user,
    };
};

export const userConnected = (user: User): StoreAction => {
    return {
        type: USER_CONNECTED,
        payload: user,
    };
};

export const setActiveUsers = (users: User[]): StoreAction => {
    return {
        type: SET_ACTIVE_USERS,
        payload: users,
    };
};
export const setMessagesHistory = (messages: Message[]): StoreAction => {
    return {
        type: SET_MESSAGES_HISTORY,
        payload: messages,
    };
};
export const addNewMessage = (message: Message): StoreAction => {
    return {
        type: ADD_NEW_MESSAGE,
        payload: message,
    };
};

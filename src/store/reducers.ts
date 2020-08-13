import { GlobalState, SET_CURRENT_USER, StoreAction, SET_ACTIVE_USERS, SET_SELECTED_USER, USER_CONNECTED, SET_MESSAGES_HISTORY, ADD_NEW_MESSAGE } from "../domain/models/types";
import produce from "immer";

const initialState: GlobalState = {
    currentUser: null,
    selectedUser: null,
    messagesHistory: [],
    activeUsers: [],
    isLoggedIn: false
};

export default (state = initialState, action: StoreAction): GlobalState => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true,
            };
        case SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: action.payload,
                messagesHistory: []
            };
        case SET_ACTIVE_USERS:
            return {
                ...state,
                activeUsers: action.payload
            };
        case SET_MESSAGES_HISTORY:
            return {
                ...state,
                messagesHistory: action.payload
            };
        case ADD_NEW_MESSAGE:
            return {
                ...state,
                messagesHistory: [...state.messagesHistory, action.payload]
            };
        case USER_CONNECTED:
            const nextState = produce(state, draftState => {
                const userExist = draftState.activeUsers.findIndex(user=>user.getHashCode()===action.payload.getHashCode())!==-1;
                if(!userExist){
                    draftState.activeUsers.push(action.payload);
                }
            })
            return nextState;
        default:
            return state;
    }
};

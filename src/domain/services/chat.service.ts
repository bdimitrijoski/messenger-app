import { SocketService } from "./socket.service";
import { ModelFactory } from "../factories/model.factory";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";
import { Message } from "../models/message.model";

export class ChatService {
    private driver: SocketService;
    private static instance: ChatService;

    private constructor() {
        this.driver = new SocketService();
    }

    static getInstance(): ChatService {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService();
        }

        return ChatService.instance;
    }


    connect(onOpen: Function, onMessage: Function, onUserConnected: Function, onUserDisconnected: Function, onError: Function){
        return this.driver.connect(onOpen, onMessage, onUserConnected, onUserDisconnected, onError);
    }

    getConnectedUsers(): Promise<User[]>{
        const curUser = AuthService.getInstance().getCurrentUser();
        return fetch('/api/users')
        .then((res) => res.json())
        .then((data)=>{
            return data.map((dto: any)=>ModelFactory.getInstance().create<User>(User as any, dto))
            .filter((user: User)=>user.getHashCode()!==curUser.getHashCode());
        })
    }

    getChatHistory(userId: string): Promise<Message[]>{
        return fetch(`/api/history/${userId}`)
        .then((res) => res.json())
        .then((data)=>{
            return data.map((dto: any)=>ModelFactory.getInstance().create<Message>(Message as any, dto));
        })
    }

    sendMessage(message: string, toUserId: string){
        this.driver.sendMessage(message, toUserId);
    }

    disconnect(){
        this.driver.disconnect();
    }
}
import io from 'socket.io-client'
import { SOCKET_URL } from "../constants";
import { AuthService } from "./auth.service";

export class SocketService {
  private socket: SocketIOClient.Socket;

  connect(onOpen: Function, onMessage: Function, onUserConnected: Function, onUserDisconnected: Function, onError: Function) {
    const user = AuthService.getInstance().getCurrentUser();
    const id = user.getHashCode();

    this.socket = io.connect(SOCKET_URL, {
        reconnection: true
    });
    this.socket.emit("signin", {id});
    onOpen();

    this.socket.on("message", (e: any)=>onMessage(e));
    this.socket.on("userConnected", (e: any)=>onUserConnected(e));
    this.socket.on("reconnect", this.onReconnection.bind(this));
    this.socket.on("disconnect", (e: any)=>onUserDisconnected(e));
  }

  sendMessage(message: string, userId: string) {
    this.socket.emit("message", {to: userId, message});
  }

  disconnect(){
    const user = AuthService.getInstance().getCurrentUser();
    const id = user.getHashCode();
    this.socket.emit("disconnect", {id});
    this.socket.disconnect();
  }

  onMessageRecieved(message: any) {
    console.log(message);
  }

  onClientDisconnected() {
    console.log("Connection Lost from server please check your connection.");
  }

  onReconnection() {
    console.log("Reconecting");

    const user = AuthService.getInstance().getCurrentUser();
    if (user) {
      this.socket.emit("signin", { id: user.getHashCode() });
    }
  }
}

import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Placeholder URL

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      console.log('Initializing socket connection...');
      this.socket = io(SOCKET_URL, {
        autoConnect: true,
        reconnection: true,
      });

      this.socket.on('connect', () => {
        console.log('Socket connected successfully with ID:', this.socket.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected.');
      });
    }
    return this.socket;
  }

  getSocket() {
    return this.socket || this.connect();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;

import { createContext } from 'react';
import socketio from 'socket.io-client';
const ENDPOINT = 'http://localhost:4001';

export const socket = socketio.connect(ENDPOINT);
export const SocketContext = createContext();

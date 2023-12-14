import { io } from "socket.io-client";
import dotenv from "dotenv"

dotenv.config();

const envirnmentt = NEXT_PUBLIC_ENVIRNMENT ? 'production' : 'development';
const url = envirnmentt === 'production' ? 'https://drawingtool.onrender.com' : 'http://localhost:5000';

export const socket = io(url);
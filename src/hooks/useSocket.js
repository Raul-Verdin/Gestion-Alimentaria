import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket() {
  const socketRef = useRef(null);

  useEffect(() => {
    const url = import.meta.env.VITE_WS_URL || 'http://localhost:4000';
    socketRef.current = io(url);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return socketRef;
}

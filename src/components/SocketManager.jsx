import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:4000");
export const charactersAtom = atom([]);

export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom);
    useEffect(() => {
        function onConnect() {
            console.log("connected");
        }
        function onDisconnect() {
            console.log("disconnected");
        }

        function onCharacters(value) {
            setCharacters(value);
        }

        function onChat(value) {
            console.log(value);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("characters", onCharacters);
        socket.on("chat", onChat);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("characters", onCharacters);
            socket.off("chat", onChat);
        };
    }, []);
};

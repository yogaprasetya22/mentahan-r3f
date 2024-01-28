import { useState } from "react";
import { socket } from "./SocketManager";

export const SendMeesage = () => {
    const [value, setValue] = useState("");
    const handleSumbit = (e) => {
        e.preventDefault();
        socket.emit("message", value);
    };
    return (
        <form onSubmit={handleSumbit}>
            <input type="text" onChange={(e) => setValue(e.target.value)} />
            <input type="submit" value="send" />
        </form>
    );
};

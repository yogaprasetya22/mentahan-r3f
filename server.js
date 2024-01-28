import { Server } from "socket.io";
import http from "http";
import Router from "express-promise-router";
import express from "express";
import { createServer } from "vite";
import viteConfig from "./vite.config.js";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const router = Router();
const app = express();

const io = new Server({
    cors: {
        origin: "http://localhost:8080",
    },
});

io.listen(process.env.SOCKET_PORT || 4000);

const characters = [];
const chat = [];

const generateRandomPosition = () => {
    return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
    console.log("user connected");

    characters.push({
        id: socket.id,
        position: generateRandomPosition(),
        hairColor: generateRandomHexColor(),
        topColor: generateRandomHexColor(),
        bottomColor: generateRandomHexColor(),
        username: null,
    });

    io.emit("characters", characters);
    io.emit("chat", chat);

    socket.on("message", (msg) => {
        const character = characters.find((c) => c.id === socket.id);
        const username = character.username || "Anonymous";
        chat.push({ id: socket.id, username: username, msg, time: new Date() });
        io.emit("chat", chat);
    });

    socket.on("move", (position) => {
        const character = characters.find(
            (character) => character.id === socket.id
        );
        character.position = position;
        io.emit("characters", characters);
    });

    socket.on("username", (msg) => {
        const character = characters.find((c) => c.id === socket.id);
        character.username = msg;
        io.emit("characters", characters);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");

        characters.splice(
            characters.findIndex((character) => character.id === socket.id),
            1
        );
        chat.splice(
            chat.findIndex((character) => character.id === socket.id),
            1
        );
        io.emit("characters", characters);
        io.emit("chat", chat);
    });
});
if (process.env.NODE_ENV === "development") {
    const vite = await createServer({
        configFile: false,
        server: {
            middlewareMode: true,
        },
        ...viteConfig,
    });
    router.use(vite.middlewares);
} else {
    app.use(express.static("dist"));
}

router.get("/", async (req, res) => {
    let html = fs.readFileSync("index.html", "utf-8");
    if (process.env.NODE_ENV === "development") {
        html = await vite.transformIndexHtml(req.url, html);
    }
    res.send(html);
});

app.use(router);

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port http://localhost:8080...`);
});

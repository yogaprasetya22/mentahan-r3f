import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { SendMeesage } from "./components/SendMeesage";
import {
    KeyboardControls,
    Loader,
    PerformanceMonitor,
    SoftShadows,
} from "@react-three/drei";
import { useMemo } from "react";

export const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
    enterChat: "enterChat",
};

function App() {
    const map = useMemo(
        () => [
            { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
            { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
            { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
            { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
            { name: Controls.jump, keys: ["Space"] },
            { name: Controls.enterChat, keys: ["Enter"] },
        ],
        []
    );
    return (
        <>
            <Loader />
            <SocketManager />
            <SendMeesage />
            <KeyboardControls map={map}>
                <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
                    <color attach="background" args={["#ececec"]} />
                    <Experience />
                </Canvas>
            </KeyboardControls>
        </>
    );
}

export default App;

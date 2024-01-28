/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/model/Hoodie Character.glb -o src/components/HoodieCharacter.jsx -r public 
*/

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations, Billboard, Text } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

export function HoodieCharacter({
    hairColor = "black",
    topColor = "pink",
    bottomColor = "brown",
    ...props
}) {
    const group = useRef();
    const { scene, materials, animations } = useGLTF(
        "/model/Hoodie Character.glb"
    );

    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);

    const { actions } = useAnimations(animations, group);
    // console.log(actions);
    const [animation, setAnimation] = useState("CharacterArmature|Idle");

    useEffect(() => {
        actions[animation].reset().fadeIn(0.5).play();
        return () => actions[animation]?.fadeOut(0.5);
    }, [animation]);

    return (
        <>
            <group ref={group} {...props} dispose={null}>
                <group name="Root_Scene">
                    <Username message={props?.username} />
                    <group name="RootNode">
                        <group
                            name="CharacterArmature"
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={100}
                        >
                            <primitive object={nodes.Root} />
                        </group>
                        <group
                            name="Casual_Feet"
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={100}
                        >
                            <skinnedMesh
                                name="Casual_Feet_1"
                                geometry={nodes.Casual_Feet_1.geometry}
                                material={materials.White}
                                skeleton={nodes.Casual_Feet_1.skeleton}
                            />
                            <skinnedMesh
                                name="Casual_Feet_2"
                                geometry={nodes.Casual_Feet_2.geometry}
                                material={materials.Purple}
                                skeleton={nodes.Casual_Feet_2.skeleton}
                            />
                        </group>
                        <group
                            name="Casual_Legs"
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={100}
                        >
                            <skinnedMesh
                                name="Casual_Legs_1"
                                geometry={nodes.Casual_Legs_1.geometry}
                                material={materials.Skin}
                                skeleton={nodes.Casual_Legs_1.skeleton}
                            >
                                <meshStandardMaterial color={bottomColor} />
                            </skinnedMesh>
                            <skinnedMesh
                                name="Casual_Legs_2"
                                geometry={nodes.Casual_Legs_2.geometry}
                                material={materials.LightBlue}
                                skeleton={nodes.Casual_Legs_2.skeleton}
                            />
                        </group>
                        <group
                            name="Casual_Head"
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={100}
                        >
                            <skinnedMesh
                                name="Casual_Head_1"
                                geometry={nodes.Casual_Head_1.geometry}
                                material={materials.Skin}
                                skeleton={nodes.Casual_Head_1.skeleton}
                            />
                            <skinnedMesh
                                name="Casual_Head_2"
                                geometry={nodes.Casual_Head_2.geometry}
                                material={materials.Eyebrows}
                                skeleton={nodes.Casual_Head_2.skeleton}
                            >
                                <meshStandardMaterial color={hairColor} />
                            </skinnedMesh>
                            <skinnedMesh
                                name="Casual_Head_3"
                                geometry={nodes.Casual_Head_3.geometry}
                                material={materials.Eye}
                                skeleton={nodes.Casual_Head_3.skeleton}
                            />
                            <skinnedMesh
                                name="Casual_Head_4"
                                geometry={nodes.Casual_Head_4.geometry}
                                material={materials.Hair}
                                skeleton={nodes.Casual_Head_4.skeleton}
                            />
                        </group>
                        <group
                            name="Casual_Body"
                            position={[0, 0.007, 0]}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={100}
                        >
                            <skinnedMesh
                                name="Casual_Body_1"
                                geometry={nodes.Casual_Body_1.geometry}
                                material={materials.Purple}
                                skeleton={nodes.Casual_Body_1.skeleton}
                            >
                                <meshStandardMaterial color={topColor} />
                            </skinnedMesh>
                            <skinnedMesh
                                name="Casual_Body_2"
                                geometry={nodes.Casual_Body_2.geometry}
                                material={materials.Skin}
                                skeleton={nodes.Casual_Body_2.skeleton}
                            />
                        </group>
                    </group>
                </group>
            </group>
        </>
    );
}

const Username = ({ username }) => {
    return (
        <Billboard position-y={1.6}>
            <Text position-y={0.36} fontSize={0.2} color="black">
                {username}
                <meshBasicMaterial color="black" />
            </Text>
        </Billboard>
    );
};

useGLTF.preload("/model/Hoodie Character.glb");


import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SEAT_SIZE, AISLE_WIDTH, ROW_SPACING, PASSENGER_SIZE, ANIMATION_SPEED } from './boarding.js';

const Passenger = ({ startPos, targetRow, targetSeat, color, startTime }) => {
  const groupRef = useRef();
  const [started, setStarted] = useState(false);
  const [seated, setSeated] = useState(false);
  const timeRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startTime);
    return () => clearTimeout(timer);
  }, [startTime]);

  useFrame((_, delta) => {
    if (!started || seated || !groupRef.current) return;

    timeRef.current += delta;

    // Calculate target position
    const targetZ = -targetRow * ROW_SPACING;
    const targetX = targetSeat < 3
      ? -AISLE_WIDTH / 2 - (2.5 - targetSeat) * SEAT_SIZE
      : AISLE_WIDTH / 2 + (targetSeat - 3.5) * SEAT_SIZE;
    const targetY = PASSENGER_SIZE;

    // Calculate position differences
    const dx = targetX - groupRef.current.position.x;
    const dy = targetY - groupRef.current.position.y;
    const dz = targetZ - groupRef.current.position.z;

    // Move passenger
    if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01 || Math.abs(dz) > 0.01) {
      groupRef.current.position.x += dx * ANIMATION_SPEED;
      groupRef.current.position.y += dy * ANIMATION_SPEED;
      groupRef.current.position.z += dz * ANIMATION_SPEED;

      // Walking animation
      const swing = Math.sin(timeRef.current * 3) * 0.3;
      const bob = Math.abs(Math.sin(timeRef.current * 6)) * 0.05;
      groupRef.current.children[0].position.y = PASSENGER_SIZE * 2 + bob;
      groupRef.current.children[2].rotation.x = swing;
      groupRef.current.children[3].rotation.x = -swing;
      groupRef.current.children[4].rotation.x = -swing;
      groupRef.current.children[5].rotation.x = swing;
    } else {
      groupRef.current.position.set(targetX, targetY, targetZ);
      groupRef.current.children[0].position.y = PASSENGER_SIZE * 2;
      groupRef.current.children[2].rotation.x = 0;
      groupRef.current.children[3].rotation.x = 0;
      groupRef.current.children[4].rotation.x = 0;
      groupRef.current.children[5].rotation.x = 0;
      setSeated(true);
    }
  });

  return (
    <group ref={groupRef} position={startPos} visible={started}>
      {/* Head */}
      <mesh position={[0, PASSENGER_SIZE * 2, 0]}>
        <sphereGeometry args={[PASSENGER_SIZE * 0.3, 32, 32]} />
        <meshStandardMaterial color="#f0c4a0" roughness={0.5} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, PASSENGER_SIZE * 1.2, 0]}>
        <cylinderGeometry args={[PASSENGER_SIZE * 0.4, PASSENGER_SIZE * 0.4, PASSENGER_SIZE * 1.2, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} /> {/* Color-coded, smooth */}
      </mesh>
      {/* Left Arm */}
      <mesh position={[-PASSENGER_SIZE * 0.5, PASSENGER_SIZE * 1.5, 0]}>
        <cylinderGeometry args={[PASSENGER_SIZE * 0.1, PASSENGER_SIZE * 0.1, PASSENGER_SIZE * 0.8, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} /> {/* Matches torso */}
      </mesh>
      {/* Right Arm */}
      <mesh position={[PASSENGER_SIZE * 0.5, PASSENGER_SIZE * 1.5, 0]}>
        <cylinderGeometry args={[PASSENGER_SIZE * 0.1, PASSENGER_SIZE * 0.1, PASSENGER_SIZE * 0.8, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} /> {/* Matches torso */}
      </mesh>
      {/* Left Leg */}
      <mesh position={[-PASSENGER_SIZE * 0.2, PASSENGER_SIZE * 0.4, 0]}>
        <cylinderGeometry args={[PASSENGER_SIZE * 0.15, PASSENGER_SIZE * 0.15, PASSENGER_SIZE * 0.8, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.5} /> {/* Dark for contrast */}
      </mesh>
      {/* Right Leg */}
      <mesh position={[PASSENGER_SIZE * 0.2, PASSENGER_SIZE * 0.4, 0]}>
        <cylinderGeometry args={[PASSENGER_SIZE * 0.15, PASSENGER_SIZE * 0.15, PASSENGER_SIZE * 0.8, 16]} />
        <meshStandardMaterial color="#333333" roughness={0.5} /> {/* Dark for contrast */}
      </mesh>
    </group>
  );
};

export default Passenger;

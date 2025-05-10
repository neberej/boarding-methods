
import React from 'react';
import { SEAT_SIZE } from './boarding.js';


const Seat = ({ position }) => {
  return (
    <group position={position}>
      {/* Seat base */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[SEAT_SIZE * 0.9, 0.4, SEAT_SIZE * 0.9]} />
        <meshStandardMaterial color="#87ceeb" roughness={0.6} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.5, -SEAT_SIZE * 0.3]}>
        <boxGeometry args={[SEAT_SIZE * 0.9, 0.6, 0.2]} />
        <meshStandardMaterial color="#87ceeb" roughness={0.6} />
      </mesh>
      {/* Left Armrest */}
      <mesh position={[-SEAT_SIZE * 0.45, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.2, SEAT_SIZE * 0.9]} />
        <meshStandardMaterial color="#444444" roughness={0.5} />
      </mesh>
      {/* Right Armrest */}
      <mesh position={[SEAT_SIZE * 0.45, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.2, SEAT_SIZE * 0.9]} />
        <meshStandardMaterial color="#444444" roughness={0.5} />
      </mesh>
    </group>
  );
};

export default Seat;

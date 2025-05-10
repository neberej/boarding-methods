
import React from 'react';
import { ROWS, SEATS_PER_ROW, SEAT_SIZE, AISLE_WIDTH, ROW_SPACING } from './boarding.js';
import Seat from './Seat';

const PLANE_LENGTH = ROWS * ROW_SPACING;
const PLANE_WIDTH = SEATS_PER_ROW * SEAT_SIZE + AISLE_WIDTH;

const Plane = () => {
  return (
    <group>
      {/* Runway */}
      <mesh position={[0, -0.1, -PLANE_LENGTH / 2]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[PLANE_WIDTH * 1, PLANE_LENGTH * 1]} />
        <meshStandardMaterial color="#333333" roughness={0.8} />
      </mesh>
      {/* Runway Markings */}
      <mesh position={[0, -0.09, -PLANE_LENGTH / 2]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.2, PLANE_LENGTH * 1.5]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[PLANE_WIDTH, PLANE_LENGTH]} />
        <meshStandardMaterial color="#cccccc" roughness={0.7} />
      </mesh>
      {/* Aisle */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
        <planeGeometry args={[AISLE_WIDTH, PLANE_LENGTH]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.5} />
      </mesh>
      
      {/* Seats */}
      {Array.from({ length: ROWS }).map((_, row) =>
        Array.from({ length: SEATS_PER_ROW }).map((_, seat) => {
          const x = seat < 3
            ? -AISLE_WIDTH / 2 - (2.5 - seat) * SEAT_SIZE
            : AISLE_WIDTH / 2 + (seat - 3.5) * SEAT_SIZE;
          const z = -row * ROW_SPACING;
          return <Seat key={`${row}-${seat}`} position={[x, 0, z]} />;
        })
      )}
      {/* Cockpit (front, z=0.5) */}
      <mesh position={[0, 0.5, 0.5]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="#555555" roughness={0.5} />
      </mesh>
      {/* Cockpit Control Panel */}
      <mesh position={[0, 0.5, 0.8]}>
        <boxGeometry args={[0.8, 0.4, 0.2]} />
        <meshStandardMaterial color="#222222" roughness={0.5} />
      </mesh>
      {/* Tail (rear, z=-PLANE_LENGTH-0.5) */}
      <mesh position={[0, 1, -PLANE_LENGTH - 0.5]}>
        <boxGeometry args={[0.2, 1, 0.5]} />
        <meshStandardMaterial color="#555555" roughness={0.5} />
      </mesh>
      {/* Door 1 (front, row 0, left side) */}
      <mesh position={[-PLANE_WIDTH / 2, 0.5, 0]}>
        <boxGeometry args={[0.1, 1, 0.8]} />
        <meshStandardMaterial color="#ff4444" roughness={0.5} />
      </mesh>
      {/* Door 2 (mid, row 15, left side) */}
      <mesh position={[-PLANE_WIDTH / 2, 0.5, -15 * ROW_SPACING]}>
        <boxGeometry args={[0.1, 1, 0.8]} />
        <meshStandardMaterial color="#ff4444" roughness={0.5} />
      </mesh>
    </group>
  );
};

export default Plane;

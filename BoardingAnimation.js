import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Passenger from './Passenger';
import Plane from './Plane';
import { createPassengerData, ROWS, SEATS_PER_ROW, SEAT_SIZE, AISLE_WIDTH, ROW_SPACING } from './boarding.js';

import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp";
import { FaArrowsAltH } from "@react-icons/all-files/fa/FaArrowsAltH";
import { FaVideo } from "@react-icons/all-files/fa/FaVideo";  

import "./BoardingAnimation.scss";

const PLANE_LENGTH = ROWS * ROW_SPACING;
const PLANE_WIDTH = SEATS_PER_ROW * SEAT_SIZE + AISLE_WIDTH;

const BoardingAnimation = () => {
  const [passengers, setPassengers] = useState([]);
  const cameraRef = useRef();

  const startAnimation = (method) => {
    try {
      console.log(`Starting ${method} animation`);
      const newPassengers = createPassengerData(method);
      setPassengers([]);
      setTimeout(() => setPassengers(newPassengers), 100); // slight delay
    } catch (error) {
      console.error(`Error starting ${method}:`, error);
    }
  };

  const updateCamera = (position) => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...position);
      cameraRef.current.lookAt(0, 0, -PLANE_LENGTH / 2);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', background: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: '700px', height: '600px', margin: '0 auto', border: '3px solid #222', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        <Canvas
          camera={{ position: [0, 10, 0], fov: 60, far: 100 }}
          shadows
          onCreated={({ camera }) => {
            cameraRef.current = camera;
            camera.lookAt(0, 0, -PLANE_LENGTH / 2);
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[0, 10, 0]} intensity={0.9} castShadow />
          <Plane />
          {passengers.map((p, i) => (
            <Passenger
              key={i}
              startPos={p.startPos}
              targetRow={p.targetRow}
              targetSeat={p.targetSeat}
              color={p.color}
              startTime={p.startTime}
            />
          ))}
          <OrbitControls target={[0, 0, -PLANE_LENGTH / 2]} enableRotate={true} enableZoom={true} enablePan={false} minDistance={5} maxDistance={20} />
        </Canvas>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {['openSeating', 'backToFront', 'windowMiddleAisle', 'steffen', 'reversePyramid', 'rotatingZone'].map(method => (
          <button
            key={method}
            onClick={() => startAnimation(method)}
            className="method"
          >
            {method.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => updateCamera([0, 10, 0])}
          className="top-view camera"
        >
          <FaArrowUp />
        </button>
        {/* Side view button */}
        <button
          onClick={() => updateCamera([20, 2, -PLANE_LENGTH / 2])}
          className="side-view camera"
        >
          <FaArrowsAltH />
        </button>
        {/* Cinematic view button */}
        <button
          onClick={() => updateCamera([5, 5, 5])}
          className="cinematic-view camera"
        >
          <FaVideo />
        </button>
      </div>
    </div>
  );
};

export default BoardingAnimation;

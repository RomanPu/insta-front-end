import * as React from 'react';
import { useEffect, useRef } from 'react';
import { red } from '@mui/material/colors';
import imgUrl from '../assets/imgs/camili.jpeg';

export function Avatar({ picUrl = imgUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 200;

    // Draw background circle
    context.fillStyle = red[500];
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    // Draw image
    const image = new Image();
    image.src = picUrl;
    image.onload = () => {
      context.save();
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
      context.closePath();
      context.clip();
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.restore();
    };
  }, []);

  return <canvas ref={canvasRef} className="avatar" alt="Avatar" />;
}
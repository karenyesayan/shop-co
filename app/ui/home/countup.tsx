"use client";

import { useState, useEffect } from "react";

const easingFn = (t: number) => t * (2 - t);
const frameDuration = 1000 / 60;

export default function AnimatedCountUp({
  children,
  duration = 2000,
}: {
  children: any;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId: any | null = null;

    let frame = 0;
    const totalFrames = Math.round(duration / frameDuration);

    function onFrame() {
      frame++;
      const progress = easingFn(frame / totalFrames);
      setCount(children * progress);
      if (frame !== totalFrames) {
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function start() {
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId);
      frame = 0;
      frameId = null;
    }

    start();
    return () => stop();
  }, [children, duration]);

  return <span>{Math.floor(count).toLocaleString("en-US")}+</span>;
}

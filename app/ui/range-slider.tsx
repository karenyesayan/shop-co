import { useState } from "react";

export default function RangeSlider({
  min,
  max,
  defaultValue,
}: {
  min: number;
  max: number;
  defaultValue: number[];
}) {
  const [minValue, setMinValue] = useState(defaultValue[0]);
  const [maxValue, setMaxValue] = useState(defaultValue[1]);

  return (
    <div className="relative mx-auto mt-6 mb-7.5 h-2 w-full max-w-md xl:mt-7 xl:mb-6">
      {/* Slider track */}
      <div className="absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 rounded-[1.25rem] bg-[#F0F0F0]" />
      {/* Slider filled track */}
      <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-[1.25rem] bg-black"
        style={{
          left: `${(minValue / max) * 100}%`,
          right: `${100 - (maxValue / max) * 100}%`,
        }}
      />
      <input
        type="range"
        name="minPrice"
        min={min}
        max={max}
        value={minValue}
        onChange={(e) =>
          setMinValue(Math.min(Number(e.target.value), maxValue - 1))
        }
        className="pointer-events-none absolute w-full appearance-none bg-transparent"
        style={{ zIndex: minValue > max - 100 ? "5" : "6" }}
      />
      <span
        className="absolute top-3.5 -ml-2.5 text-sm leading-[1.1875rem] font-medium text-black not-italic"
        style={{ left: `${(minValue / max) * 100}%` }}
      >
        ${minValue}
      </span>
      <input
        type="range"
        name="maxPrice"
        min={min}
        max={max}
        value={maxValue}
        onChange={(e) =>
          setMaxValue(Math.max(Number(e.target.value), minValue + 1))
        }
        className="pointer-events-none absolute w-full appearance-none bg-transparent"
      />
      <span
        className="absolute top-3.5 -mr-2.5 text-sm leading-[1.1875rem] font-medium text-black not-italic"
        style={{ right: `${100 - (maxValue / max) * 100}%` }}
      >
        ${maxValue}
      </span>
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          position: relative;
          z-index: 10;
          bottom: 6px;
        }
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: black;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          border: none;
          bottom: 6px;
        }
      `}</style>
    </div>
  );
}

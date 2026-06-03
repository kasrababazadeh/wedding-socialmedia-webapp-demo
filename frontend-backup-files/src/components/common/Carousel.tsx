"use client";

import { useState } from "react";
import clsx from "clsx";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const slides = [
  { id: 1, content: "Slide 1", color: "bg-red-300" },
  { id: 2, content: "Slide 2", color: "bg-green-300" },
  { id: 3, content: "Slide 3", color: "bg-blue-300" },
  { id: 4, content: "Slide 4", color: "bg-yellow-300" },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full mt-20">
      <div className="flex justify-center items-center relative h-72 overflow-visible">
        {slides.map((slide, index) => {
          const position = index - activeIndex;
          const isCenter = position === 0;
          const isLeftOrRight = Math.abs(position) === 1;
          const isHidden = Math.abs(position) > 1;

          return (
            <div
              key={slide.id}
              className={clsx(
                "absolute lg:w-1/5 md:w-1/3 w-2/5 h-72 rounded-2xl shadow-md transition-all duration-500 flex items-center justify-center text-xl font-semibold text-white",
                slide.color,
                {
                  "z-30 scale-100 opacity-100": isCenter,
                  "z-20 scale-90 opacity-50": isLeftOrRight,
                  "z-10 scale-75 opacity-0 pointer-events-none": isHidden,
                },
                {
                  "-translate-x-3/4": position === -1,
                  "translate-x-3/4": position === 1,
                  "translate-x-0": isCenter,
                }
              )}
              style={{ transitionTimingFunction: "ease" }}
            >
              {slide.content}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <button onClick={prev} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"><SlArrowRight /></button>
        <button onClick={next} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"><SlArrowLeft /></button>
      </div>
    </section>
  );
}

import React from "react";
import type { ReactNode } from "react";

interface CardContainerProps {
  width: number;
  height: number;
  fromColor: string;
  toColor: string;
  children?: ReactNode;
  className?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
  width,
  height,
  fromColor,
  toColor,
  children,
  className,
}) => {
  const minWidth = `min-w-[${width}rem]`;
  const minHeight = `
    p-[${height - 2}vh] 
    sm:p-[${height - 1}vh] 
    md:p[${height}vh]`;
  const colorGradient = `bg-gradient-to-br from-${fromColor} to-${toColor}`;
  return (
    <div
      className={`
        ${colorGradient}
        rounded-lg
        ${minHeight}
        ${minWidth}
        flex items-stretch justify-center space-y-2
        ${className || ""}
        `}
    >
      {children}
    </div>
  );
};

export default CardContainer;

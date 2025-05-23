import React from "react";
import type { ReactNode } from "react";

interface CardContainerProps {
  width: number;
  height: number;
  children?: ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({
  width,
  height,
  children,
}) => {
  const minWidth = `min-w-[${width}rem]`;
  const minHeight = `p-[${height - 2}vh] sm:p-[${
    height - 1
  }vh] md:p-[${height}vh]`;

  return (
    <div
      className={`
        bg-gradient-to-br from-blue-200 to-blue-500
        rounded-lg
        ${minHeight}
        ${minWidth}
        flex flex-col items-stretch justify-center space-y-2
        `}
    >
      {children}
    </div>
  );
};

export default CardContainer;

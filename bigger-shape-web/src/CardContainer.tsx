import React from "react";
import type { ReactNode } from "react";

interface CardContainerProps {
  width: number;
  height: number;
  children?: ReactNode;
}

/*
            // <div
            // className="
            //     bg-gradient-to-br from-blue-200 to-blue-500
            //     rounded-lg
            //     p-[3vh] sm:p-[4vh] md:p-[5vh]
            //     min-w-[25rem]
            //     flex flex-col items-stretch justify-center space-y-2
            //     "
            // >
*/

const CardContainer: React.FC<CardContainerProps> = ({
  width,
  height,
  children,
}) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-blue-200 to-blue-500
        rounded-lg
        p-[${height - 2}vh] sm:p-[${height - 1}vh] md:p-[${height}vh]
        min-w-[${width}rem]
        flex flex-col items-stretch justify-center space-y-2
        `}
    >
      {children}
    </div>
  );
};

export default CardContainer;

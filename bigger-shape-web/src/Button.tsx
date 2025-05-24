import React from "react";

interface ButtonProps {
  type: "button" | "submit";
  color: string;
  onClick: () => void;
  text: string;
  imagePath?: string;
  altText?: string;
}

const colorMap: Record<string, string> = {
  green: "bg-green-600 hover:bg-green-700",
  blue: "bg-blue-600 hover:bg-blue-700",
};

const Button: React.FC<ButtonProps> = ({
  type,
  color,
  onClick,
  text,
  imagePath,
  altText,
}) => {
  const colorClasses = colorMap[color];
  return (
    <button
      type={type}
      className={`${colorClasses}
            text-white
            font-semibold
            py-2
            px-6
            rounded transition
            duration-300
            flex items-center justify-center space-x-2
            `}
      onClick={onClick}
    >
      {imagePath && <img src={imagePath} alt={altText} className="w-5 h-5" />}
      <span className="text-center">{text}</span>
    </button>
  );
};

export default Button;

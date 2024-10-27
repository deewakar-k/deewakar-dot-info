import { ReactNode } from "react";

export const TechTag = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-sm rounded-md 
      ${className}`}
    >
      {children}
    </span>
  );
};

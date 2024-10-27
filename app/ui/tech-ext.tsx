export const TechTag = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-sm rounded-md 
      ${className}`}
    >
      {children}
    </span>
  );
};

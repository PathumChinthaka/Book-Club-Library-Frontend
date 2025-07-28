interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  backdropBlur?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  backdropBlur = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div
      className={`fixed inset-0 flex items-center z-50 justify-center ${className}`}
    >
      {backdropBlur && (
        <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm" />
      )}
      <div
        className={`relative ${sizeClasses[size]} animate-spin rounded-full border-solid border-blue-500 border-t-transparent`}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

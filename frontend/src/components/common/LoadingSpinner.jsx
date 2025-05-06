const LoadingSpinner = ({ fullPage = false, size = 'medium' }) => {
    const sizeClasses = {
      small: 'w-6 h-6 border-2',
      medium: 'w-8 h-8 border-3',
      large: 'w-12 h-12 border-4'
    };
  
    return (
      <div className={`flex items-center justify-center ${fullPage ? 'fixed inset-0 bg-black bg-opacity-50 z-50' : ''}`}>
        <div
          className={`animate-spin rounded-full border-solid border-t-transparent ${
            sizeClasses[size]
          } border-blue-500`}
        ></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
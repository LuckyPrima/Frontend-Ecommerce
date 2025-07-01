const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="absolute">
        <div className="w-20 h-20 border-primary border-2 rounded-full" />
        <div className="w-20 h-20 border-blue-800 border-t-2 animate-spin rounded-full absolute left-0 top-0" />
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

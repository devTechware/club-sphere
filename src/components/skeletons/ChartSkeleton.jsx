const ChartSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="card-body">
        <div className="h-6 bg-base-300 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-base-300 rounded"></div>
      </div>
    </div>
  );
};

export default ChartSkeleton;

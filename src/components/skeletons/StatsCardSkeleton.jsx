const StatsCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl border-l-4 border-base-300 animate-pulse">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-base-300 rounded w-2/3 mb-3"></div>
            <div className="h-8 bg-base-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-base-300 rounded w-3/4"></div>
          </div>
          <div className="w-16 h-16 bg-base-300 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCardSkeleton;

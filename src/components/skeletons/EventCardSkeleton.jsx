const EventCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl border-2 border-base-200 animate-pulse">
      <div className="card-body p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 bg-base-300 rounded w-1/3"></div>
          <div className="h-5 bg-base-300 rounded w-1/5"></div>
        </div>
        <div className="h-6 bg-base-300 rounded w-4/5 mb-2"></div>
        <div className="h-6 bg-base-300 rounded w-3/5 mb-3"></div>
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-4/5"></div>
        </div>
        <div className="divider my-2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
          <div className="h-4 bg-base-300 rounded w-2/3"></div>
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
        </div>
        <div className="h-10 bg-base-300 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;

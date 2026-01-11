const CardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl border-2 border-base-200 animate-pulse">
      <figure className="h-48 bg-base-300"></figure>
      <div className="card-body p-6">
        <div className="h-4 bg-base-300 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-base-300 rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-5/6"></div>
        </div>
        <div className="divider my-2"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 bg-base-300 rounded w-1/3"></div>
          <div className="h-6 bg-base-300 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-base-300 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;

const Clubs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Clubs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card bg-base-100 shadow-xl">
            <figure className="h-48 bg-base-300"></figure>
            <div className="card-body">
              <h2 className="card-title">Club {i}</h2>
              <p>Description coming soon...</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;

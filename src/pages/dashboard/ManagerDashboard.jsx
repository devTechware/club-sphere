const ManagerDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">My Clubs</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Total Members</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Total Events</div>
          <div className="stat-value">0</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
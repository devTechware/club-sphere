const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Total Clubs</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Pending Clubs</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">$0</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
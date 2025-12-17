const MemberDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Member Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Clubs Joined</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Events Registered</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat bg-base-200 rounded-lg p-6">
          <div className="stat-title">Total Spent</div>
          <div className="stat-value">$0</div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;

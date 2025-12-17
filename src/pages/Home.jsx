const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="hero min-h-[60vh] bg-base-200 rounded-lg">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to ClubSphere</h1>
            <p className="py-6">
              Discover, join, and manage local clubs. Connect with people who
              share your interests.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

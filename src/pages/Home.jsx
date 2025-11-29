import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="user" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Welcome
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Welcome to the TMV system. More details will be added here later.
        </p>
      </main>
    </div>
  );
};

export default Home;

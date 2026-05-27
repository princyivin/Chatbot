import SkeletonCard from "../components/SkeletonCard";

const LoadingDemo = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Loading Skeletons
        </h1>

        <p className="text-gray-400 mt-2">
          Professional loading UI experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />

      </div>

    </div>
  );
};

export default LoadingDemo;
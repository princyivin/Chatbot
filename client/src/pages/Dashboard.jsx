import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-2">
        Nexus Dashboard
      </h1>

      <p className="text-gray-400 mb-8">
        Welcome back 👋
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Total Chats"
          value="128"
        />

        <StatCard
          title="Active Users"
          value="24"
        />

        <StatCard
          title="AI Responses"
          value="1,240"
        />

      </div>

    </div>
  );
}
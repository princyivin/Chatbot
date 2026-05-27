import Sidebar from "../components/Sidebar";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-white flex">

      {/* <Sidebar /> */}

      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Analytics 📊
          </h1>

          <p className="text-white/60 mt-2">
            Monitor your platform performance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white/60 mb-2">
              Total Users
            </h3>

            <p className="text-3xl md:text-4xl font-bold">
              12,450
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white/60 mb-2">
              Messages Sent
            </h3>

            <p className="text-3xl md:text-4xl font-bold">
              85K
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-white/60 mb-2">
              Active Teams
            </h3>

            <p className="text-3xl md:text-4xl font-bold">
              320
            </p>
          </div>

        </div>

        {/* Activity Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>User signed in</span>
              <span className="text-white/50">
                2 mins ago
              </span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>New AI chat created</span>
              <span className="text-white/50">
                10 mins ago
              </span>
            </div>

            <div className="flex justify-between border-b border-white/10 pb-4">
              <span>Password updated</span>
              <span className="text-white/50">
                1 hour ago
              </span>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
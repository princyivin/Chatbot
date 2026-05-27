export default function StatCard({ title, value }) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
        
        <h3 className="text-white/60 mb-2">
          {title}
        </h3>
  
        <p className="text-4xl font-bold">
          {value}
        </p>
  
      </div>
    );
  }
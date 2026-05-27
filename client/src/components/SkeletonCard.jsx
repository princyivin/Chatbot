const SkeletonCard = () => {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 animate-pulse">
  
        {/* IMAGE */}
        <div className="w-16 h-16 rounded-full bg-white/10 mb-5" />
  
        {/* TITLE */}
        <div className="h-5 bg-white/10 rounded-full w-40 mb-4" />
  
        {/* TEXT */}
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded-full w-full" />
          <div className="h-4 bg-white/10 rounded-full w-5/6" />
          <div className="h-4 bg-white/10 rounded-full w-4/6" />
        </div>
  
        {/* BUTTON */}
        <div className="h-12 bg-white/10 rounded-2xl mt-6" />
  
      </div>
    );
  };
  
  export default SkeletonCard;
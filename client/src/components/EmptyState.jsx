const EmptyState = ({
    icon = "📭",
    title = "No Data",
    description = "Nothing found here.",
    buttonText = "Create New",
  }) => {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
  
        {/* ICON */}
        <div className="text-8xl mb-6">
          {icon}
        </div>
  
        {/* TITLE */}
        <h2 className="text-4xl font-bold">
          {title}
        </h2>
  
        {/* DESCRIPTION */}
        <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
          {description}
        </p>
  
        {/* BUTTON */}
        <button className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 rounded-2xl font-semibold hover:scale-105 transition">
          {buttonText}
        </button>
  
      </div>
    );
  };
  
  export default EmptyState;
import EmptyState from "../components/EmptyState";

const EmptyDemo = () => {
  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">

      <EmptyState
        icon="💬"
        title="No Messages Yet"
        description="Start chatting with your team to see conversations here."
        buttonText="Start Chat"
      />

    </div>
  );
};

export default EmptyDemo;
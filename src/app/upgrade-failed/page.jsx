export default function FailedPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <h1 className="text-3xl font-bold mb-2">Payment Failed ❌</h1>
        <p className="text-gray-400">Please try again or contact support.</p>
      </div>
    );
  }

'use client';

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button onClick={reset} className="bg-primary text-white px-6 py-2 rounded-full hover:bg-coral-600">
        Try again
      </button>
    </div>
  );
}

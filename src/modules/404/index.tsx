export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page not found</p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

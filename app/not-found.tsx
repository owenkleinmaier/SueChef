import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-8">Could not find the requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  );
}
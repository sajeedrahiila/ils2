import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            🕌 Sameer Islamic Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A comprehensive Islamic education and community platform with chat, calls, media library, and halal marketplace
          </p>
          
          {!session ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Join Community
              </Link>
              <Link
                href="/auth/login"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Login
              </Link>
            </div>
          ) : (
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Chat System</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with fellow Muslims through private messages and group discussions
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Video Calls</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join Islamic study groups and lectures through audio/video calls
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Islamic Library</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access Quran, Tafsir, and Hadith collections in multiple languages
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Media Center</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share and discover Islamic lectures, e-books, and educational content
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Halal Marketplace</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse certified halal products with verified halal certification
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🌙</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Islamic Themes</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Beautiful themes including Mushaf mode with Quranic fonts and geometric patterns
            </p>
          </div>
        </div>

        {/* Language Support */}
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Multi-Language Support
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Access content in both English and Arabic
          </p>
          <div className="flex justify-center gap-8 text-2xl">
            <span className="font-bold">English</span>
            <span className="font-bold font-arabic">العربية</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            May Allah bless our community and guide us in seeking knowledge
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Sameer Islamic Platform - Built with Next.js, TypeScript, and Islamic values
          </p>
        </div>
      </footer>
    </div>
  );
}

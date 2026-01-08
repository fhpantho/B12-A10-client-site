export default function Privacy() {
  return (
    <main className="bg-base-200 transition-colors duration-300 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-base-content mb-6 text-center">
          Privacy Policy
        </h1>

        {/* Content */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <p className="mb-6 text-base text-base-content/80 leading-relaxed">
            Habit Tracker uses Firebase for authentication and stores minimal user data related
            to habits and progress. User profile data is only used to power the application
            features and is not sold to third parties.
          </p>

          <p className="mb-4 text-base text-base-content/80 leading-relaxed">
            Key files:{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">
              src/firebase/firebase.init.js
            </code>{" "}
            (contains Firebase initialization and configuration). For privacy requests contact{" "}
            <a
              href="mailto:support@habittracker.com"
              className="underline text-purple-600 dark:text-purple-400"
            >
              support@habittracker.com
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}

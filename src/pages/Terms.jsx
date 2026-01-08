export default function Terms() {
  return (
    <main className="bg-base-200 transition-colors duration-300 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-base-content mb-6 text-center">
          Terms & Conditions
        </h1>

        {/* Content */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-8 md:p-10 transition-colors duration-300">
          <p className="mb-6 text-base text-base-content/80 leading-relaxed">
            By using Habit Tracker, you agree to our basic terms: do not abuse the service,
            provide accurate information, and follow applicable laws. This is a lightweight app
            intended for personal habit tracking and community sharing of public habits.
          </p>

          <p className="mb-4 text-base text-base-content/80 leading-relaxed">
            If you need legal details specific to your jurisdiction, contact our support team at{" "}
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

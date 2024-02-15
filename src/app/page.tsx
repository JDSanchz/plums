import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <div className="mt-8 w-full flex flex-col items-center justify-center text-center">
      <Head>
        <title>PLUMS - Personal Learning Management System</title>
        <meta name="description" content="Manage your learning with PLMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center w-full px-20 text-black">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-purple-600">PLMS</span>
        </h1>
        <p className="mt-3 text-2xl">
          Your personal space for{" "}
          <span className="text-purple-600">learning management</span>.
        </p>

        <div className="mt-6">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition duration-200 ease-in-out"
          >
            Discover Features
          </a>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="font-semibold text-lg">Create Topics</h2>
              <p>
                Organize your notes, files, and links into topics for easy
                access.
              </p>
              <img
                src="https://via.placeholder.com/150"
                alt="Create Topics"
                className="mt-2"
              />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="font-semibold text-lg">Add Resources</h2>
              <p>
                Effortlessly add notes, files, images, and links to your topics.
              </p>
              <img
                src="https://via.placeholder.com/150"
                alt="Add Resources"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

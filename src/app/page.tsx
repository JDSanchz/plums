'use client'
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from "react";
import effort from "../app/img/effort.png";
import topics from "../app/img/topics.png";


export default function Home() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  // Redirect to dashboard if a user is found once loading is complete
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);
  if (isLoading) {
    return (
      <div className="mt-8 w-full flex flex-col items-center justify-center text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <p className="mt-3 text-2xl">Loading...</p>
    </div>)
  }

  return (
    <div className="mt-8 w-full flex flex-col items-center justify-center text-center">
      <Head>
        <title>PLUMS - Personal Learning Management System</title>
        <meta name="description" content="Manage your learning with PLMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center w-full px-20 text-black">
          <><h1 className="text-6xl font-bold">
              Welcome to <span className="text-purple-600">PLUMS</span>
            </h1><p className="mt-3 text-2xl">
                Your personal space for{" "}
                <span className="text-purple-600">learning management</span>.
              </p></>
        <div className="mt-6">
        <a
  href="/dashboard"
  className="px-4 py-3 sm:px-6 sm:py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition duration-200 ease-in-out text-xs sm:text-sm"
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
              <Image src={topics} alt="Create Topics" className="mt-2" />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="font-semibold text-lg">Add Resources</h2>
              <p>
                Effortlessly add notes, files, images, and links to your topics.
              </p>
              <Image src={effort} alt="Create Topics" className="mt-2" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

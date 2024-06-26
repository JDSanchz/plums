"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import NewTopicInput from "./NewTopicInput";
import { usePathname } from "next/navigation";
import { lastAccessed } from "./services/recents";
import { useParams } from 'next/navigation';
import Link from "next/link";
const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<Boolean>(false); // Menu visible by default
  const { id:currentTopicId } = useParams();
  const [childrenTopics, setChildrenTopics] = useState<Topic[]>([]);
  const pathname = usePathname();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newInput, setNewInput] = useState<boolean>(false);
  const { user, error, isLoading } = useUser();

  interface Topic {
    id: string;
    title: string;
    parentId: string;
    lastAccessed: string;
    createdAt: string;
    updatedAt: string;
    children: Topic[];
  }

  const fetchTopics = async (userId:any) => {
    try {
      const response = await fetch(`/api/topics?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const sortedData = data.sort((a: { lastAccessed: string | number | Date; }, b: { lastAccessed: string | number | Date; }) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime());
      setTopics(sortedData);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };
  
  useEffect(() => {
    if (user) { // Ensure user is defined
      fetchTopics(user?.sub);
    }
  }, [setTopics, user?.sub,currentTopicId]); // React to changes in user.sub

  useEffect(() => {
    fetchTopics(user?.sub).then(() => {
      setNewInput(false); // Reset newInput after topics are fetched
    });
  }, [newInput]); // Depend on newInput to trigger re-fetching

  // Adjust visibility based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuVisible(true); // Always visible on desktop
      } else {
        setIsMenuVisible(false); // Always hidden on mobile
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to toggle menu visibility for mobile
  const toggleMenuVisibility = () => {
    if (window.innerWidth <= 768) {
      setIsMenuVisible(!isMenuVisible);
    }
  };

  const fetchChildrenTopics = async (currentTopicId: string | string[]) => {
      try {
        const response = await fetch(`/api/topics/children?parentId=${currentTopicId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.children)) {
          setChildrenTopics(data.children);
          console.log(childrenTopics);
        } else {
          console.error("Received `data.children` is not an array:", data.children);
          setChildrenTopics([]);
        }
      } catch (error) {
        console.error(`Failed to fetch children topics for topic ${currentTopicId}:`, error);
        setChildrenTopics([]);
      }
  };

  useEffect(() => {
    const fetchChildrenTopics = async () => {
      if (typeof currentTopicId === "string") {
        try {
          const response = await fetch(`/api/topics/children?parentId=${currentTopicId}`);
          const data = await response.json();
          if (Array.isArray(data.children)) {
            setChildrenTopics(data.children);
          } else {
            throw new Error("Received `data.children` is not an array");
          }
        } catch (error) {
          console.error(`Failed to fetch children topics:`, error);
          setChildrenTopics([]);
        }
      }
    };
    
    fetchChildrenTopics();
  }, [currentTopicId, newInput]);

  useEffect(() => {
    fetchChildrenTopics(currentTopicId);
  }, [currentTopicId, newInput]);

  useEffect(() => {
    if (pathname === '/dashboard' && user?.sub) {
      fetchTopics(user.sub);
    }
  }, [pathname, user?.sub]);
  
  
  const handleTopicClick = async (topicId: any) => {
    // Update the lastAccessed time locally or through your service
    await lastAccessed({ id: topicId, lastAccessed: new Date().toISOString() });
    // Then, fetch or update the topics list directly here if not using `useEffect` to automatically trigger re-fetching
    // This can be a direct state update or a more complex logic depending on your application structure
    fetchTopics(user?.sub); // Assuming this function now directly sorts and sets topics without relying solely on `count`
  };


  return  (
<div
  className={`w-full md:w-[310px] flex flex-col ${pathname === "/" ? "bg-gray-50" : "bg-gray-100"} text-gray-900 ${pathname === "/" ? "hidden" : ""}`}
>
  <div className={`flex items-center ${user ? "bg-purple-600" : "bg-gray-400"} p-4 text-white`}>
  {user ? (
  <a href="/dashboard" className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-600">
    {user.name?.[0]?.toUpperCase()}
  </a>
) : (
  <a href="/api/auth/login" className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-600">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-login">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
      <path d="M21 12h-13l3 -3m0 6l-3 -3"/>
    </svg>
  </a>
)}
    <span>{user ? `${user.name?.split('@')[0].slice(0, 6)}'s space` : "User's space"}</span>
        <button
          onClick={toggleMenuVisibility}
          className="ml-auto cursor-pointer border-none bg-transparent md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-menu-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>
      </div>
      {/* Conditional rendering based on isMenuVisible */}
      {isMenuVisible && (
        <div
          className={`flex flex-col ${isMenuVisible ? "desktop-menu" : "mobile-menu hidden"}`}
        >
          {/* Navbar items */}
          <div className="flex flex-col w-full">
            <a
              href="/dashboard"
              className="flex items-center p-4 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler mr-2 icon-tabler-home"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
              </svg>
              Home
            </a>
            {/* <a href="#" className="p-4 hover:bg-gray-200">
              New Note
            </a> */}
            {/* Expandable Topics section */}
            {user && (
              <div className="p-4">
              <p className="font-semibold"> My Topics</p>
              {topics === undefined && (
                <div role="status" className="max-w-sm animate-pulse mt-6">
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <div className="mt-2 max-h-60 overflow-auto">
                
              {topics?.map((topic, key) => (
        <React.Fragment key={topic.id}>
          <Link href={`/topic/${topic.id}`}>
            <div
              className={`flex gap-2 p-1 pl-2 text-sm hover:bg-purple-100 ${topic.id === currentTopicId ? 'bg-purple-300' : ''}`}
              onClick={() => {handleTopicClick(topic.id), toggleMenuVisibility()}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-library"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                          <path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" />
                          <path d="M11 7h5" />
                          <path d="M11 10h6" />
                          <path d="M11 13h3" />
                        </svg>
                      <p className="truncate">{topic.title}</p>
            </div>
          </Link>
          {topic.id === currentTopicId && childrenTopics.map((childTopic) => (
            <Link key={childTopic.id} href={`/topic/${childTopic.id}`}>
              <div className=" text-sm hover:bg-purple-100 pl-6 flex p-1" onClick={() => handleTopicClick(childTopic.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-note" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 20l7 -7" /><path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" /></svg>
                <p className="truncate pl-2">{childTopic.title} </p>
              </div>
            </Link>
          ))}
        </React.Fragment>
      ))}
              </div>
            </div>
            )}
            
            {user ? (
                          <div className="hidden md:block  py-0 pl-4 mb-2">
                          <NewTopicInput newInput={setNewInput} />
                        </div>
            ) : (
              <></>
            )}
            {user ? (
        <><a href="/api/auth/logout" className="flex items-center p-4 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-user mr-2">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
                Logout
              </a><Link href={`/topic/label/`} className="flex items-center p-4 hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-tags mr-2"
                    width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none"
                      d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592 -3.592a2.41 2.41 0 0 0 0 -3.408l-5.71 -5.71a2 2 0 0 0 -1.414 -.586h-4.172a2 2 0 0 0 -2 2z" />
                    <path d="M18 19l1.592 -1.592a4.82 4.82 0 0 0 0 -6.816l-4.592 -4.592" />
                    <path d="M7 10h-.01" />
                  </svg>
                  Labels
                </Link></>
      ) : (
        <a href="/api/auth/login" className="flex items-center p-4 hover:bg-blue-200 bg-blue-100 text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-user mr-2">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          Login
        </a>
      )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

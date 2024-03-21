'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { lastAccessed } from "@/app/components/services/recents";
import { useParams } from 'next/navigation';



export default function LabelPage() {
    const { id:currentTopicId } = useParams();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [newLabel, setNewLabel] = useState('');
    const [selectedTopicId, setSelectedTopicId] = useState<Topic | null>(null);


    interface Topic {
      id: string;
      title: string;
      parentId: string;
      lastAccessed: string;
      createdAt: string;
      updatedAt: string;
      children: Topic[];
    }
    
    const fetchTopics = async () => {
        try {
          const response = await fetch("/api/topics");
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          const sortedData = data.sort((a: { lastAccessed: string | number | Date; }, b: { lastAccessed: string | number | Date; }) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime());;
          setTopics(sortedData);
        } catch (error) {
          console.error("Failed to fetch topics:", error);
        }
      };
    
      useEffect(() => {
        
        fetchTopics();
      }, [setTopics]);

      const handleTopicClick = async (topicId: any) => {
        // Update the lastAccessed time locally or through your service
        await lastAccessed({ id: topicId, lastAccessed: new Date().toISOString() });
        // Then, fetch or update the topics list directly here if not using `useEffect` to automatically trigger re-fetching
        // This can be a direct state update or a more complex logic depending on your application structure
        fetchTopics(); // Assuming this function now directly sorts and sets topics without relying solely on `count`
        setSelectedTopicId(topicId);
      };

      const createNewLabel = async (newLabel: string) => {
        try {
          const response = await fetch("/api/labels", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: newLabel
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Optionally handle the response data here
          const data = await response.json();
          console.log("New label created:", data);
          
        } catch (error) {
          console.error("Failed to create label:", error);
        }
      }
      


    return (
        <div className="p-4">
            <p className="font-semibold">Labels Page</p>
            {topics === undefined && (
                <div role="status" className="max-w-sm animate-pulse mt-6">
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <div className="mt-2 max-h-60 overflow-auto flex flex-wrap gap-2">
              {topics?.map((topic) => (
        <React.Fragment key={topic.id}>
          <Link href={`/topic/${topic.id}`}>
            <div
              className={`flex gap-2 p-1 pl-2 text-sm border hover:bg-purple-100 ${topic.id === currentTopicId ? 'bg-purple-300' : ''}`}
              onClick={() => handleTopicClick(topic.id)}>
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
        </React.Fragment>
          ))}
        </div>
      <div>
      {/* Section to add labels */}
            <div className="mt-4">
                <p className="font-semibold"> Create new Label </p>
                <input
                placeholder="Enter label name"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setNewLabel(e.target.value)}
                />
                <button className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => createNewLabel(newLabel)}> Add </button>
                <div className="flex items-center">
                </div>
            </div>    
        </div>
    </div>
    )}
    
      
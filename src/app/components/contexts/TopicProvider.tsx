// contexts/TopicContext.tsx
"use client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Topic } from "../../models/Topic";
import { useUser } from "@auth0/nextjs-auth0/client";

interface TopicContextType {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  addTopic: (topicData: { title: string }, userId: string) => Promise<void>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}


const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const useTopics = (): TopicContextType => {
  const { user, error, isLoading } = useUser();
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error("useTopics must be used within a TopicProvider");
    console.log("useTopics must be used within a TopicProvider");
  }
  return context;
};

interface TopicProviderProps {
  children: ReactNode;
}

export const TopicProvider: React.FC<TopicProviderProps> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [count, setCount] = useState(0);

  const { user } = useUser();

  const fetchTopics = async (userid:any) => {
   if (user) {
    try {
      const response = await fetch(`/api/topics?userId=${userid}`);
      if (!response.ok) {
        throw new Error(`Error fetching topics: ${response.status}`);
      }
      const fetchedTopics = await response.json();
   
      setTopics(fetchedTopics);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
   }
  };

  // useEffect to call fetchTopics when the component mounts
  useEffect(() => {
    if(user) {
      fetchTopics(user.sub);
    }
  }, [user]); // Empty dependency array ensures this runs once on mount

// Update the function signature to accept userId
const addTopic = async (
  data: Omit<Topic, "id" | "createdAt" | "updatedAt" | "lastAccessed">,
  userId: string // Add this parameter
) => {
  try {
    // Include userId in the body of the request
    const response = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Extend the data object with userId before sending
      body: JSON.stringify({ ...data, auth0_user_id: userId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Assuming the response includes the newly created topic with its ID and timestamps
    const newTopic: Topic = await response.json();

    // Update the local state with the new topic
    setTopics((currentTopics) => [...currentTopics, newTopic]);
  } catch (error) {
    console.error("Failed to add the topic:", error);
  }
};


  return (
    <TopicContext.Provider
      value={{ topics, setTopics, addTopic, count, setCount }}
    >
      {children}
    </TopicContext.Provider>
  );
};

// contexts/TopicContext.tsx
"use client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { Topic } from "../../models/Topic";

interface TopicContextType {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  addTopic: (topicData: { title: string }) => Promise<void>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export const useTopics = (): TopicContextType => {
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

  const fetchTopics = async () => {
    try {
      const response = await fetch("/api/topics");
      if (!response.ok) {
        throw new Error(`Error fetching topics: ${response.status}`);
      }
      const fetchedTopics = await response.json();
      setTopics(fetchedTopics);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };

  // useEffect to call fetchTopics when the component mounts
  useEffect(() => {
    fetchTopics();
  }, []); // Empty dependency array ensures this runs once on mount


  const addTopic = async (
    data: Omit<Topic, "id" | "createdAt" | "updatedAt" | "lastAccessed">,
  ) => {
    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

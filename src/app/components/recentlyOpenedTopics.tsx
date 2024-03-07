"use client";

import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { useTopics } from "./contexts/TopicProvider";
import { Topic } from "../models/Topic";

const RecentlyOpenedTopics: React.FC = () => {
  const { topics, count, setCount } = useTopics();
  const [recentTopics, setrecentTopics] = useState<Topic[]>([]); // Fix: Provide the correct type for the initial state

  useEffect(() => {
    setrecentTopics(
      topics
        ?.sort((a, b) => new Date(a.lastAccessed).getTime() - new Date(b.lastAccessed).getTime())
        .slice(-3),
    ); // Fix: Use getTime() to compare the dates
  }, [topics, count]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Recent Topics</h1>
      <div className="mt-8 flex flex-grow flex-wrap gap-4">
      {[...recentTopics]?.reverse().map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}

      </div>
    </div>
  );
};

export default RecentlyOpenedTopics;

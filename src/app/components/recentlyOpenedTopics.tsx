"use client";

import { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { useTopics } from "./contexts/TopicProvider";
import { Topic } from "../models/Topic";
import Link from "next/link";

const RecentlyOpenedTopics: React.FC = () => {
  const { topics, count, setCount } = useTopics();
  const [recentTopics, setrecentTopics] = useState<Topic[]>([]); // Fix: Provide the correct type for the initial state
  console.log(topics)
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
      <Link key={topic?.id} href={`/topic/${topic?.id}`} className="flex h-fit flex-grow cursor-pointer gap-3 truncate rounded border  shadow-sm md:w-fit">
            <TopicCard topic={topic} />
      </Link>
      ))}

      </div>
    </div>
  );
};

export default RecentlyOpenedTopics;

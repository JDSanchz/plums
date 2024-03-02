"use client";
import React, { useState } from "react";
import Welcome from "../components/Welcome";
import TopicCard from "../components/TopicCard";
import NewTopicInput from "../components/NewTopicInput";
import RecentlyOpenedTopics from "../components/recentlyOpenedTopics";
import { useTopics } from "../components/contexts/TopicProvider";

export default function page() {
  const { topics, count, setCount } = useTopics();
  console.log(topics)
  return (
    <div>
      
      <div className="block md:hidden">
        <NewTopicInput />
      </div>
      <div className="mt-8 flex flex-grow flex-wrap gap-4">
        <RecentlyOpenedTopics />
        {/* {topics?.map((topic) => <TopicCard key={topic.name} topic={topic} />)} */}
      </div>
      <div className="mt-8">
       {topics?.length === 0 && <Welcome />}
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Welcome from "../components/Welcome";
import TopicCard from "../components/TopicCard";
import topic from "../components/topics.json";
import NewTopicInput from "../components/NewTopicInput";
import RecentlyOpenedTopics from "../components/recentlyOpenedTopics";

export default function page() {
  const [topics, setTopics] = useState(topic);

  return (
    <div>
      <h1 className="text-3xl font-bold">{topic?.title}</h1>
      <div className="block md:hidden">
        <NewTopicInput />
      </div>
      <div className="mt-8 flex flex-grow flex-wrap gap-4">
        <RecentlyOpenedTopics />
        {/* {topics?.map((topic) => <TopicCard key={topic.name} topic={topic} />)} */}
      </div>
      <div className="mt-8">
        <Welcome />
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Welcome from "../components/Welcome";
import TopicCard from "../components/TopicCard";
import topic from "../components/topics.json";

export default function page() {
  const [topics, setTopics] = useState(topic);

  return (
    <div>
      <h1 className="text-2xl font-bold">Recent Topics</h1>
      <div className="mt-8 flex flex-grow flex-wrap gap-4">
        {topics?.map((topic) => <TopicCard key={topic.name} topic={topic} />)}
      </div>

      <div className="mt-8">
        <Welcome />
      </div>
    </div>
  );
}

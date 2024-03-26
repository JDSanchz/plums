"use client";
import React, { useState } from "react";
import Welcome from "../components/Welcome";
import NewTopicInput from "../components/NewTopicInput";
import RecentlyOpenedTopics from "../components/recentlyOpenedTopics";
import { useTopics } from "../components/contexts/TopicProvider";

export default function page() {
  const { topics, setTopics, addTopic, count, setCount } = useTopics();

  return (
    <div>
      
      <div className="block md:hidden">

        <NewTopicInput newInput={setCount} />
      </div>
      <div className="mt-8 flex flex-grow flex-wrap gap-4">
        <RecentlyOpenedTopics />
      </div>
      <div className="mt-8">
       {topics?.length === 0 && <Welcome />}
      </div>
    </div>
  );
}

import React from "react";
import Welcome from "../../components/Welcome";
import TopicCard from "../../components/TopicCard";
import topic from "../../components/topics.json"
import UploadImage from "@/app/components/UploadImage";


import Notes from "@/app/components/Notes";
export default function page() {
  return (
    <div>
      <h1>topic</h1>
      <Notes />
      <UploadImage />
    </div>
  );
}

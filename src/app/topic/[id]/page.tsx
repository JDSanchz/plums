import React from "react";
import Welcome from "../../components/Welcome";
import TopicCard from "../../components/TopicCard";
import topic from "../../components/topics.json";
import NewLinkForm from "@/app/components/links/LinkForm";
import { useState } from "react";
import Notes from "@/app/components/Notes";
import AllTopicLinks from "@/app/components/links/AllTopicLinks";
import ImageForm from "@/app/components/images/ImageForm";
export default function page() {
  return (
    <div>
      <h1>topic</h1>
      <Notes />
      <AllTopicLinks />
      <NewLinkForm/>
      <ImageForm/>
    </div>
  );
}

import React from "react";
import Welcome from "../../components/Welcome";
import TopicCard from "../../components/TopicCard";
import topic from "../../components/topics.json";
import NewLinkForm from "@/app/components/links/LinkForm";
import { useState } from "react";
import Notes from "@/app/components/Notes";
<<<<<<< HEAD
import AllTopicLinks from "@/app/components/links/AllTopicLinks";
=======
import UploadImage from "@/app/components/images/UploadImage";
>>>>>>> cd84c3b0e3361314c3871220e322f7cb090e0ddc
export default function page() {
  return (
    <div>
      <h1>topic</h1>
      <Notes />
      <AllTopicLinks />
      <NewLinkForm/>
      <UploadImage/>
    </div>
  );
}

'use client'
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Welcome from "../../components/Welcome";
import TopicCard from "../../components/TopicCard";
import topic from "../../components/topics.json";
import NewLinkForm from "@/app/components/links/LinkForm";
import Notes from "@/app/components/Notes";
import AllTopicLinks from "@/app/components/links/AllTopicLinks";
import UploadImage from "@/app/components/images/UploadImage";
import { Tabs } from 'flowbite-react';
import { PiNotebookDuotone } from "react-icons/pi";
import { FaLink, FaRegImage } from "react-icons/fa6";


import ImageForm from "@/app/components/images/ImageForm";
export default function page() {
  const params = useParams();
  const [topic, setTopic] = useState(null);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/topics/topic?topicId=${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    fetchNotes();
  }, []);
  console.log(topic)
  return (
    <div>
      <h1 className="text-3xl font-bold">{topic?.title}</h1>
      <div className="mt-6">
        <Tabs aria-label="Full width Tabs" style="fullWidth">
          <Tabs.Item active title="Notes" icon={PiNotebookDuotone} >
            <Notes />
          </Tabs.Item>
          <Tabs.Item active title="Links" icon={FaLink} >
            <AllTopicLinks />
            <NewLinkForm/>
          </Tabs.Item>
          <Tabs.Item active title="Images" icon={FaRegImage} >
            <UploadImage/>
          </Tabs.Item>
        </Tabs>
      </div>
     
      
      
      <h1>topic</h1>
      <Notes />
      <AllTopicLinks />
      <NewLinkForm/>
      <ImageForm/>
    </div>
  );
}

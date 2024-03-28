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
import UploadFile from "@/app/components/fileupload/UploadFile";
import { Tabs, Button} from 'flowbite-react';
import { PiNotebookDuotone } from "react-icons/pi";
import { FaLink, FaRegImage } from "react-icons/fa6";


import ImageForm from "@/app/components/fileupload/FileUploadForm";
import Link from "next/link";
export default function Page() {
  const params = useParams();
  const [topic, setTopic] = useState<any | null>(null);
  const [links, setLinks] = useState([]); // Add state to track links

  useEffect(() => {
    // Initially fetch topic details
    fetchTopic();
    // Fetch links initially
    fetchLinks();
  }, [params.id]);

  const fetchTopic = async () => {
    try {
      const response = await fetch(`/api/topics/topic?topicId=${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setTopic(data);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await fetch(`/api/links?topicId=${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await response.json();
      setLinks(data);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    }
  };

  // Callback to add a new link
  const handleNewLink = (newLink: any) => {
    setLinks((prevLinks):any => [...prevLinks, newLink]);
    // Optionally, you could re-fetch all links instead to ensure sync with the database
    // fetchLinks();
  };

  const updateLinks = () => {
    // Implement the logic to update links here, for example:
    fetchLinks();
  };
  

  return (
<div>
  <div className="flex justify-between">
  <h1 className="text-3xl font-bold">{topic?.title}</h1>
  <Link href={`/topic/settings/${topic?.id}`} passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
          </button>
        </Link></div>
  <div className="mt-6">
    <Tabs aria-label="Full width Tabs" style="fullWidth">
      <Tabs.Item title="Notes" icon={PiNotebookDuotone}>
        <Notes />
      </Tabs.Item>
      <Tabs.Item title="Links" icon={FaLink}>
        {/* Wrap AllTopicLinks and NewLinkForm in a responsive container */}
        <div className="flex flex-col md:flex-row">
  <div className="md:w-1/3 md:pl-4 md:mr-4">
    <NewLinkForm onLinkCreate={handleNewLink} />
  </div>
  <div className="md:w-2/3 md:pr-4">
    <AllTopicLinks links={links} updateLinks={updateLinks} />
  </div>
</div>
      </Tabs.Item>
      <Tabs.Item title="Attachments" icon={FaRegImage}>
        <UploadFile />
      </Tabs.Item>
    </Tabs>
  </div>
</div>
  );
}
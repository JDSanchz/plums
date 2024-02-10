import React from "react";
import {Topic} from "../models/Topic";
import { lastAccessed } from "./services/recents";


type TopicCardProps = {
  topic: Topic;

};

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <div onClick={() => {
      lastAccessed({id: topic.id, lastAccessed: new Date().toISOString()});
    }}
    className="flex h-fit flex-grow cursor-pointer gap-3 truncate rounded border  shadow-sm md:w-fit">
      <div className="bg-violet-100 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-library"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" />
          <path d="M11 7h5" />
          <path d="M11 10h6" />
          <path d="M11 13h3" />
        </svg>
      </div>
      <h1 className="text-md my-auto block pr-4">{topic.title}</h1>
    </div>
  );
};

export default TopicCard;

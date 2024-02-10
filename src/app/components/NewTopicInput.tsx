'use client'
import React, { useEffect, useState } from "react";
import { useTopics } from './contexts/TopicProvider';
import {Topic} from '../models/Topic';
export default function NewTopicInput(){
    const [isInput, setIsInput] = useState<Boolean>(false);
    const [newTopic, setNewTopic] = useState("");
    const { topics, addTopic } = useTopics();
    
    return(
        <div className="p-2">
            {isInput && (
                <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Topic Name"
                    className="w-[150px] rounded border p-1 text-sm"
                    autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTopic(e.target.value)
                    }
                    onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        if(newTopic !== ""){
                            addTopic({title: newTopic});
                            setIsInput(!isInput);
                        } else {
                            window.alert("Please enter a topic name");
                        }
                    }
                    }}
                />
                <div
                    className="cursor-pointer rounded p-1 hover:bg-gray-200"
                    onClick={(event) => {
                        if(newTopic !== ""){
                            addTopic({title: newTopic});
                            setIsInput(!isInput);
                        } else {
                            window.alert("Please enter a topic name");
                        }
                    }}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-check"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l5 5l10 -10" />
                    </svg>
                </div>
                <div
                    className="cursor-pointer rounded p-1 hover:bg-gray-200"
                    onClick={() => setIsInput(!isInput)}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                    </svg>
                </div>
                </div>
            )}
            {!isInput && (
                <a
                href="#"
                className="mt-1 flex gap-2 items-center cursor-pointer text-sm hover:underline"
                onClick={() => setIsInput(!isInput)}
                >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                </span>Create New Topic
                </a>
            )}
        </div>


    )
}
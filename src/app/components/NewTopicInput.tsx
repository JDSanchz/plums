'use client'
import React, { useEffect, useState } from "react";

export default function NewTopicInput(){
    const [isInput, setIsInput] = useState<Boolean>(false);
    const [newTopic, setNewTopic] = useState<string>("");
    return(
        <div>
            {isInput && (
                <div className="flex items-center justify-between p-2">
                <input
                    type="text"
                    placeholder="Topic Name"
                    className="w-10/12 rounded border p-1 text-sm"
                    autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTopic(e.target.value)
                    }
                    onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        // Call your function here
                        setTopics([...topics, { name: newTopic }]);
                        setIsInput(!isInput);
                    }
                    }}
                />
                <div
                    className="cursor-pointer rounded p-1 hover:bg-gray-200"
                    onClick={(event) => {
                    setTopics([...topics, { name: newTopic }]);
                    setIsInput(!isInput);
                    }}
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-check"
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
                    class="icon icon-tabler icon-tabler-x"
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
                className="mt-1 block cursor-pointer p-2 text-sm hover:bg-purple-100"
                onClick={() => setIsInput(!isInput)}
                >
                + Create New Topic
                </a>
            )}
        </div>


    )
}

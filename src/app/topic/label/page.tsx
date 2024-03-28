'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from 'next/navigation';



export default function LabelPage() {
    const { id:currentLabelId } = useParams();
    const [Labels, setLabels] = useState<Label[]>([]);
    const [newLabel, setNewLabel] = useState('');
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editLabel, setEditLabel] = useState('');

    interface Label {
      id: string;
      title: string;
      createdAt: Date;
      updatedAt: Date;
      topicId: number;
    }
    


      // Fetch all labels
      const fetchLabels = async () => {
        try {
          const response = await fetch("/api/labels");
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();
          const sortedData = data.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setLabels(sortedData);
        } catch (error) {
          console.error("Failed to fetch labels:", error);
        }
      };

      useEffect(() => {
        fetchLabels();
      }, [setLabels]);

      const handleTopicDelete = async (labelId: any) => {
        //Delete the topic when the delete button is clicked
        try {
          const response = await fetch(`/api/labels/${labelId}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          fetchLabels();
        } catch (error) {
          console.error("Failed to delete topic:", error);
        }
      };

      const updateLabelTitle = async (id:string) => {
        try {
          const response = await fetch(`/api/labels/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: editLabel }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          setEditMode(null);
          setEditLabel('');
          const updatedLabels = Labels.map((label) => {
            if (label.id === id) {
              return { ...label, title: editLabel };
            }
            return label;
          });
          setLabels(updatedLabels);
        } catch (error) {
          console.error("Failed to update label:", error);
        }
      }



      const createNewLabel = async (newLabel: string) => {
        try {
          const response = await fetch("/api/labels", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: newLabel
            })
          });
          fetchLabels();
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // Optionally handle the response data here
          const data = await response.json();
          console.log("New label created:", data);
          
        } catch (error) {
          console.error("Failed to create label:", error);
        }
      }
      


    return (
        <div className="p-4">
            <p className="font-semibold">Labels currently logged</p>
            {Labels === undefined && (
                <div role="status" className="max-w-sm animate-pulse mt-6">
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <div className="mt-2 max-h-60 overflow-auto flex flex-wrap gap-2">
              {Labels?.map((Label) => (
        <React.Fragment key={Label.id}>
          <Link href={`/topic/label`}>
            <div className="flex gap-1 border rounded p-1 pl-2 text-sm">
            <div
              className={`flex gap-2 p-1 pl-2 text-sm border hover:bg-purple-100 ${Label.id === currentLabelId ? 'bg-purple-300' : ''}`}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-library"
                width="18"
                height="18"
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
              {editMode === Label.id ? (
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                />
              ) : (
              <p className="truncate">{Label.title}</p>
              )}

            </div> 
            <button 
            className="ml-4 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" 
            onClick={() => handleTopicDelete(Label.id)}
            >
            <svg  
              xmlns="http://www.w3.org/2000/svg"  
              width="24"  
              height="24"  
              viewBox="0 0 24 24"  
              fill="none"  
              stroke="currentColor"  
              stroke-width="1.25"  
              stroke-linecap="round"  
              stroke-linejoin="round"  
              className="icon icon-tabler icons-tabler-outline icon-tabler-backspace"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
                <path d="M12 10l4 4m0 -4l-4 4" />
                </svg>
                </button>
                {editMode === Label.id ? (
                  <button className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={()=> updateLabelTitle(Label.id)}>Update Label</button>)
                :(
                  <button className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => {setEditMode(Label.id); }}> Edit Label </button>
                )}
            {/* {editMode !== Label.id ? (
              
            <button 
            className="ml-4 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" 
            onClick={() => handleTopicDelete(Label.id)}
            >
            <svg  
              xmlns="http://www.w3.org/2000/svg"  
              width="24"  
              height="24"  
              viewBox="0 0 24 24"  
              fill="none"  
              stroke="currentColor"  
              stroke-width="1.25"  
              stroke-linecap="round"  
              stroke-linejoin="round"  
              className="icon icon-tabler icons-tabler-outline icon-tabler-backspace"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" />
                <path d="M12 10l4 4m0 -4l-4 4" />
                </svg>
                </button>
            ) ? (
            <button className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => updateLabelTitle(Label.id) }> Edit Label </button> 
            ) : " " :""} */}

            </div>
            </Link>
        </React.Fragment>
          ))}
        </div>
      <div>
      {/* Section to add labels */}
            <div className="mt-4">
                <p className="font-semibold"> Create new Label </p>
                <input
                placeholder="Enter label name"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setNewLabel(e.target.value)}
                type="text"
                required
                />
                <button className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => createNewLabel(newLabel)}> Add </button>
                <div className="flex items-center">
                </div>
            </div>    
        </div>
    </div>
    )}
    

'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';



const AddLabel = () => {
    const { id } = useParams();
    const [labels, setLabels] = useState<any>([]);
    const [newLabel, setNewLabel] = useState([]);
    const [topic, setTopic] = useState<any | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


  const params = useParams();
// useEffect(() => {
//     fetchTopic(id);
//     fetchLabel(id);
// }, [id,Label]);

  useEffect(()=> {
    fetchLabels()
    fetchTopic(params.id)
  },[])
  console.log(topic)
  console.log(labels)


const fetchTopic = async (topicId: any) => {
    try {
      const response = await fetch(`/api/topics/topic?topicId=${topicId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      setTopic(data);
    } catch (error) {
      console.error("Could not fetch the topic: ", error);
    }
  };

  const fetchLabels = async () => {
    try {
      const response = await fetch("/api/labels/", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const labels = await response.json();
      if(response.ok) {
        setLabels(labels)
      }
    } catch(error) {
      console.log(error)
    }
  };



  const handleAddLabel = async (labelId: any, topicId: any) => {
       try {
            const response = await fetch(`/api/topics/addlabel`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                topicId: topicId, 
                labelId: labelId, 
            }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTopic(data)
            console.log(data);
            fetchLabels();
       } catch (error) {
            console.error("Could not fetch the topic: ", error);
       }
  };

  const handleRemoveLabel = async (labelId: any, topicId: any) => {
    if (!window.confirm('Are you sure you want to remove this label?')) {
      return;
    }
    console.log(labelId, topicId)
    try {
      const response = await fetch(`/api/topics/removelabel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          labelId: labelId, 
          topicId: topicId, 
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      // fetchLabel(topicId);
  } catch (error) {
    console.error("Could not fetch the topic: ", error);
  }

};

  
return (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Label for {topic?.title || 'Loading labels...'}</h2>
    <hr className="mb-4" />
       {/* Label Topic Section */}
       <div className="mb-4">
         
        </div>
        <div className="mb-6">
          <div>
          <div className="flex gap-2">
            <div className='flex items-center bg-gray-50 border w-fit p-2 rounded'>
              <svg  xmlns="http://www.w3.org/2000/svg"  
                width="18"  height="18"  viewBox="0 0 24 24"  
                fill="none"  stroke="currentColor"  stroke-width="2"  
                stroke-linecap="round"  stroke-linejoin="round"  
                className="icon icon-tabler icons-tabler-outline icon-tabler-tag">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
                </svg>
              {labels.find((label:any) => label.id === topic?.labelId) ? <p>{labels.find((label:any) => label.id === topic?.labelId).title}</p> : <p>Label not found.</p>}
            </div>
            <button 
            onClick={()=> handleRemoveLabel(topic?.labelId, params.id)}
            className="bg-red-600 text-white border rounded px-2">
              Remove label
            </button>
          </div>
            
          </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Add Label:</h3>
            <div className='max-h-[250px] overflow-y-scroll p-3 border rounded max-w-[600px]'>
              {labels?.map((label:any)=> {
                return(
                  <div key={label?.id} 
                  className="flex justify-between mb-1

                  hover:bg-gray-50 cursor-pointer p-2">
                    <div className='flex gap-1 items-center'>
                      <svg  xmlns="http://www.w3.org/2000/svg"  
                      width="18"  height="18"  viewBox="0 0 24 24"  
                      fill="none"  stroke="currentColor"  stroke-width="2"  
                      stroke-linecap="round"  stroke-linejoin="round"  
                      className="icon icon-tabler icons-tabler-outline icon-tabler-tag">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
                      </svg>
                      <p>{label?.title}</p>
                    </div>
                    <button
                      onClick={() => handleAddLabel(label.id, params.id)}
                      className="ml-4 px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Add
                    </button>
                  </div>
                )
              })}
            </div>
            
          </div>
  </div>
);

};

export default AddLabel;
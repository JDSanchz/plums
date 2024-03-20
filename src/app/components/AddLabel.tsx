'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';



const AddLabel = () => {
    const { id } = useParams();
    const [Label, setLabel] = useState([]);
    const [newLabel, setNewLabel] = useState([]);
    const [topic, setTopic] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


useEffect(() => {
    fetchTopic(id);
    fetchLabel(id);
}, [id,Label]);

useEffect(() => { 
    if (searchTerm !== '') {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, [searchTerm])


const fetchTopic = async (topicId) => {
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
      setTopic(data);
    } catch (error) {
      console.error("Could not fetch the topic: ", error);
    }
  };

  const fetchLabel = async (topicId) => {
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
      setNewLabel(data);
    } catch (error) {
      console.error("Could not fetch the topic: ", error);
    }
  };

  const handleSearch = async () => {
    try {
        const response = await fetch(`/api/topics/search?term=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Could not fetch the topic: ", error);
    }
  };

  const handleAddLabel = async (labelId, topicId) => {
       try {
            const response = await fetch(`/api/label/addlabel`, {
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
            fetchLabel(topicId);
       } catch (error) {
            console.error("Could not fetch the topic: ", error);
       }
  };

  const handleRemoveLabel = async (labelId, topicId) => {
    if (!window.confirm('Are you sure you want to remove this label?')) {
      return;
    }
    try {
      const response = await fetch(`/api/label/removelabel`, {
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
      fetchLabel(topicId);
  } catch (error) {
    console.error("Could not fetch the topic: ", error);
  }

};


return (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Labels for {topic?.title || 'Loading labels...'}</h2>
    <hr className="mb-4" />
       {/* Label Topic Section */}
       <div className="mb-4">
          {topic?.labelId? (
            <p className="mb-2 text-lg">
              Topic Label: <Link href={`../${Label?.id}`} className="text-blue-500 hover:underline">{Label?.title}</Link>
            </p>
          ) : (
            <p>This topic does not have any labels.</p>
          )}
        </div>
        <div className="mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Labels: </h3>
            {newLabel.length > 0 ? (
            <ul className='list-disc pl-5'>
              {newLabel.map((label) => (
                <li key={label.id} className="flex justify-between mb-1">
                  {/* Wrap the label title in a Link component */}
                  <Link href={`../${label.id}`} passHref>
                    <p className="text-blue-600 hover:underline">{label.title}</p>
                  </Link>
                  <button
                    onClick={() => handleRemoveLabel(label.id, topic?.id)}
                    className="ml-4 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            ) : (
              <p>No labels yet.</p>
            )}
          </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Add Label:</h3>
            <div className='flex flex-col space-y-4'>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search topics with labels'
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ul className="list-none">
                {searchResults.map((result) => (
                  <li key={result.id} className="flex justify-between mb-1">
                    {/* Wrap the label title in a Link component */}
                    <Link href={`../${result.id}`} passHref>
                      <p className="text-blue-600 hover:underline">{result.title}</p>
                    </Link>
                    <button
                      onClick={() => handleAddLabel(result.id, topic?.id)}
                      className="ml-4 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  </div>
);

};

export default AddLabel;
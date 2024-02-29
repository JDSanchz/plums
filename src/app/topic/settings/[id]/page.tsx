'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const SettingsPage = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchTopic(id);
    fetchChildren(id);
  }, [id,children]);

  useEffect(() => {
    if (searchTerm !== '') {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

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

  const fetchChildren = async (topicId) => {
    try {
      const response = await fetch(`/api/topics/children?parentId=${topicId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setChildren(data.children);
    } catch (error) {
      console.error("Could not fetch child topics: ", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch( `/api/topics/search?term=${encodeURIComponent(searchTerm)}`, {
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
      console.error("Could not search topics: ", error);
    }
  };

  const handleAddChild = async (childId, parentId) => {
    try {
      const response = await fetch(`/api/topics/addChild`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentId: parentId,
          childId: childId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Child added successfully:", data);
      fetchChildren(parentId);
      // Optionally update your state or UI based on the response
    } catch (error) {
      console.error("Could not add child topic: ", error);
    }
  };
  

  return (
<div className="p-4">
  <h2 className="text-2xl font-bold mb-4">Settings for {topic?.title || 'Loading topic...'}</h2>
  <hr className="mb-4" />
  <div className="mb-6">
    <div>
  <h3 className="font-semibold text-lg mb-2">Children Topics:</h3>
  {children.length > 0 ? (
    <ul className="list-disc pl-5">
      {children.map(child => (
        <li key={child.id} className="mb-1">{child.title}</li>
      ))}
    </ul>
  ) : (
    <p>No children topics yet.</p>
  )}
</div>
  </div>
  <div>
    <h3 className="font-semibold text-lg mb-2">Add New Child Topic:</h3>
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search topics"
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <ul className="list-none">
        {searchResults.map(result => (
          <li key={result.id} className="flex justify-between items-center mb-2">
            <span className="mr-2">{result.title}</span>
            <button
              onClick={() => handleAddChild(result.id, topic.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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

export default SettingsPage;
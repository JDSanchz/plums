'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const params = useParams();
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [parent, setParent] = useState(null);
  const [editTitle, setEditTitle] = useState('');
const [isEditing, setIsEditing] = useState(false);
const router = useRouter();



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

  const deleteTopic = async (topicId: any) => {
    console.log("1 Deleting topic: ", topicId);
    if (!confirm("Are you sure you want to delete this topic? This action cannot be undone.")) {
      return;
    }

    try {
      console.log("2 Deleting topic: ", topicId);
      const response = await fetch(`/api/topics/topic/[id]?topicId=${topicId}`, {
        method: 'DELETE', // Make sure to use the 'DELETE' HTTP method
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Topic deleted successfully");
      router.push('/dashboard');
      // Here, you can redirect the user or update the state as needed
      // For example: window.location.href = '/some/other/page';
    } catch (error) {
      console.error("Could not delete the topic: ", error);
    }
  };

  const updateTopicTitle = async (topicId, newTitle) => {
    console.log("1 Updating topic: ", topicId);
    if (!confirm("Are you sure you want to update this topic's title?")) {
      return;
    }
  
    try {
      console.log("2 Updating topic: ", topicId);
      const response = await fetch(`/api/topics/topic/[id]?topicId=${topicId}`, {
        method: 'PUT', // Use the 'PUT' HTTP method for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }), // Send the new title in the request body
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Topic title updated successfully");
      // Here, you can redirect the user or update the UI as needed
      // For example: window.location.href = '/path/to/redirect';
    } catch (error) {
      console.error("Could not update the topic: ", error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditTitle(topic?.title || ''); // Initialize with the current title
  };
  
  const saveTitle = async () => {
    console.log("Saving new title: ", editTitle);
    if (topic) {
      await updateTopicTitle(topic.id, editTitle); // Assuming updateTopicTitle is implemented
      setIsEditing(false); // Exit editing mode after saving
      // Here, you might want to refetch or update the topic data to reflect the change
    }
  };
  
  

  const fetchTopic = async (topicId:any) => {
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
      fetchParent(data.parentId);
    } catch (error) {
      console.error("Could not fetch the topic: ", error);
    }
  };

  const fetchParent = async (topicId) => {
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
      setParent(data);
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

  const shareTopic = async (topicId) => {
    console.log("Sharing topic: ", topicId);
  }

  const handleRemoveChild = async (childId, parentId) => {
    if (!confirm("Are you sure you want to remove this child topic from its parent? This action cannot be undone.")) {
      return;
    }
  
    try {
      const response = await fetch(`/api/topics/removeChild`, {
        method: 'POST', // Use POST instead of DELETE
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
      console.log("Parent relationship removed successfully");
      fetchChildren(parentId); // Refresh the list of children
    } catch (error) {
      console.error("Could not remove parent relationship: ", error);
    }
  };
  
  

  return (
<div className="p-4">
  <h2 className="text-2xl font-bold mb-4">
    {isEditing ? (
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="text-xl font-bold mb-4 p-2 border rounded"
      />
    ) : (
      `Settings for ${topic?.title || 'Loading topic...'}`
    )}
  </h2>
  <div className="flex gap-2">
    {topic && (
      <>
        <button
          onClick={toggleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {isEditing ? 'Cancel' : 'Edit Title'}
        </button>
        {isEditing && (
          <button
            onClick={saveTitle}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        )}
      </>
    )}
    {topic && !isEditing && (
      <button
        onClick={() => deleteTopic(topic.id)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete Topic
      </button>
    )}
        {topic && !isEditing && (
      <button
        onClick={() => shareTopic(topic.id)}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Share
      </button>
    )}
  </div>
  <hr className="mb-4 mt-4" />
   {/* Parent Topic Section */}
   <div className="mb-4">
        {topic?.parentId? (
          <p className="mb-2 text-lg">
            Parent Topic: <Link href={`../${parent?.id}`} className="text-blue-500 hover:underline">{parent?.title}</Link>
          </p>
        ) : (
          <p>This topic does not have a parent.</p>
        )}
      </div>
  <div className="mb-6">
  <div>
  <h3 className="font-semibold text-lg mb-2">Children Topics:</h3>
  {children.length > 0 ? (
  <ul className="list-disc pl-5">
    {children.map((child) => (
      <li key={child.id} className="flex justify-between mb-1">
        {/* Wrap the child title in a Link component */}
        <Link href={`../${child.id}`} passHref>
          <p className="text-blue-600 hover:underline">{child.title}</p>
        </Link>
        <button
          onClick={() => handleRemoveChild(child.id, topic?.id)}
          className="ml-4 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </li>
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

"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
interface NewLinkFormProps {
  onLinkCreate: (newLink: any) => void; // Adjust the type of newLink as needed
}
const NewLinkForm: React.FC<NewLinkFormProps> = ({ onLinkCreate }) => {
  // Component logic remains the same
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');

  const params = useParams();
  
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setError('');


    // Ensure that you have the topicId from the URL parameters
    const topicId = params.id;
    if (!topicId) {
      setError('Topic ID is missing');
      return;
    }

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, url, desc, topicId }),
      });

      if (response.ok) {
        const newLink = await response.json();
        console.log('Link created successfully:', newLink);
      
        // Reset form fields
        setTitle('');
        setUrl('');
        setDesc('');
      
        // Here's the critical part: invoking the callback with the new link
        onLinkCreate(newLink); // Ensure this line is present and correctly called
      
      } else {
        // Handle response errors
        const errorData = await response.json();
        setError(errorData.error || 'Error creating link');
      }
    } catch (error) {
      setError('There was an error submitting the form');
    }
  };

  return (
    <div className="mx-auto p-4 bg-purple-50 shadow-md rounded-lg">
      <h1 className="text-lg font-semibold mb-4 text-gray-900">Create New Link</h1>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-900">URL</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700"
          />
        </div>
        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-900">Description</label>
          <textarea
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-700 focus:border-purple-700"
          />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewLinkForm;
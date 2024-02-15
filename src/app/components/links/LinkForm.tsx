"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const NewLinkForm = () => {
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
        // Reset form or handle the success case
        setTitle('');
        setUrl('');
        setDesc('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error creating link');
      }
    } catch (error) {
      setError('There was an error submitting the form');
    }
  };

  return (
    <div>
      <h1>Create New Link</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewLinkForm;

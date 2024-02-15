import React, { useState } from 'react';

const NewLinkForm = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [topicId, setTopicId] = useState('');

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    // Call the API to create a new link
    try {
      const response = await fetch('/api/links/route', {  // Ensure this matches your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, url, desc, topicId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // Clear the form or handle the success scenario
      } else {
        const error = await response.json();
        console.error('Failed to create link:', error);
        // Handle errors, like showing an error message to the user
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      // Handle errors, like showing an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Topic ID:</label>
        <input
          type="text"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit">Create Link</button>
      </div>
    </form>
  );
};

export default NewLinkForm;

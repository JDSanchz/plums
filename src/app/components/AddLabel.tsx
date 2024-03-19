'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';



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

}

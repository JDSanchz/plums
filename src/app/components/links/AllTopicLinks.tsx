"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Adjust based on your routing library if not using Next.js

interface Link {
  id: string;
  title: string;
  url: string;
  desc: string;
}

const AllTopicLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState('');
  const params = useParams();
  const topicId = params.id; // Adjust according to how you access URL parameters

  useEffect(() => {
    const fetchLinks = async () => {
      if (!topicId) {
        setError('Topic ID is missing');
        return;
      }

      try {
        const response = await fetch(`/api/links?topicId=${topicId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch links');
        }
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        setError('Error fetching links. Please try again.');
      }
    };

    fetchLinks();
  }, [topicId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Links</h2>
      {links.length > 0 ? (
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                {link.title}
              </a>
              <p>{link.desc}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No links available.</p>
      )}
    </div>
  );
};

export default AllTopicLinks;

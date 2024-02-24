// Import React and other necessary libraries
import React from 'react';


// Adjust the interface as necessary
interface Link {
  id: string;
  title: string;
  url: string;
  desc: string;
}

// Add props definition
interface AllTopicLinksProps {
  links: Link[]; // Now links are passed as props
  updateLinks: () => void; // Function to update links from the parent component
}

const AllTopicLinks: React.FC<AllTopicLinksProps> = ({ links, updateLinks }) => {
  const [error, setError] = React.useState('');

  const deleteLink = async (id: string) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete link');
      }
      // Call updateLinks to refresh the list after deletion
      updateLinks();
    } catch (error) {
      console.error('Error deleting link: ', error);
      setError('Error deleting link. Please try again.');
    }
  };

  // Error handling
  if (error) {
    return <div>Error: {error}</div>;
  }
  


  return (
    <div className="links-container my-4 w-80">
      <h2 className="text-xl font-bold mb-3">Links</h2>
      {links.length > 0 ? (
        <ul className="list-disc pl-5">
          {links.map((link) => (
            <li key={link.id} className="mb-4 flex justify-between items-center">
              <div>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-medium no-underline text-lg">
                  {link.title}
                </a>
                <p className="text-gray-600">{link.desc}</p>
                <img src={`https://api.screenshotone.com/take?
	access_key=Id53MuBcmnqVNA
	&url=${link.url}
	&viewport_width=1920
	&viewport_height=1280
	&device_scale_factor=1
	&image_quality=80
	&format=jpg
	&block_ads=true
	&block_cookie_banners=true
	&full_page=false
	&block_trackers=true
	&block_banners_by_heuristics=false
	&delay=0
	&timeout=60`} alt={`Screenshot of ${link.title}`} />
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this link?')) {
                    deleteLink(link.id);
                  }
                }}
                className="text-purple-800 hover:text-red-700"
                aria-label={`Delete ${link.title}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-backspace-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M20 5a2 2 0 0 1 1.995 1.85l.005 .15v10a2 2 0 0 1 -1.85 1.995l-.15 .005h-11a1 1 0 0 1 -.608 -.206l-.1 -.087l-5.037 -5.04c-.809 -.904 -.847 -2.25 -.083 -3.23l.12 -.144l5 -5a1 1 0 0 1 .577 -.284l.131 -.009h11zm-7.489 4.14a1 1 0 0 0 -1.301 1.473l.083 .094l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.403 1.403l.094 -.083l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.403 -1.403l-.094 .083l-1.293 1.292l-1.293 -1.292l-.094 -.083z" strokeWidth="0" fill="currentColor" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No links available.</p>
      )}
    </div>
  );  
}  

export default AllTopicLinks;

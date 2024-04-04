import React, { useState } from 'react';

// Assuming a Link type similar to what you've defined
interface Link {
  id: string;
  title: string;
  url: string;
  desc: string;
}

interface AllTopicLinksProps {
  links: Link[];
  updateLinks: () => void; // You might need to implement this to fetch updated links after editing
}

const AllTopicLinks: React.FC<AllTopicLinksProps> = ({ links, updateLinks }) => {
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [editedLink, setEditedLink] = useState<Link | null>(null);

  const startEditing = (link: Link) => {
    setEditingLinkId(link.id);
    setEditedLink(link); // Initialize editedLink with the link's current data
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Link) => {
    setEditedLink((prev) => prev ? { ...prev, [field]: e.target.value } : null);
  };
  const saveEdit = async (id: string) => {
    if (!editedLink) {
      console.error("No link to save.");
      return;
    }
  
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: 'PUT', // or 'PATCH' if you're partially updating the resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedLink.title,
          url: editedLink.url,
          desc: editedLink.desc,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      // Assuming the response includes the updated link, you could use it to update the UI immediately
      const updatedLink = await response.json();
      console.log('Link updated successfully:', updatedLink);
  
      setEditingLinkId(null); // Exit editing mode
      updateLinks(); // Refresh links list, this should fetch updated links from the server
    } catch (error) {
      console.error("Failed to save the link:", error);
    }
  };
  

  const cancelEdit = () => {
    setEditingLinkId(null);
  };

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

  return (
    <div className="links-container my-4 mx-auto">
      <h2 className="text-xl font-bold mb-3">Links</h2>
      {links.length > 0 ? (
        <ul className=" pl-5">
          {links.map((link) => (
            <React.Fragment key={link.id}>
              {editingLinkId === link.id ? (
                <li className="mb-3 mt-3 p-4 shadow-lg rounded-lg bg-white">
  <input
    type="text"
    value={editedLink?.title}
    onChange={(e) => handleEditChange(e, 'title')}
    placeholder="Title"
    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
  />
  <input
    type="text"
    value={editedLink?.url}
    onChange={(e) => handleEditChange(e, 'url')}
    placeholder="URL"
    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
  />
  <textarea
    value={editedLink?.desc}
    onChange={(e) => handleEditChange(e, 'desc')}
    placeholder="Description"
    className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
    rows={3}
  />
  <div className="flex justify-end space-x-4">
    <button
      onClick={() => saveEdit(link.id)}
      className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      Save
    </button>
    <button
      onClick={cancelEdit}
      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Cancel
    </button>
  </div>
</li>
              ) : (
                <li className="mb-3 mt-3 flex justify-between items-start md:items-center">
                  <div className="flex-1">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-medium no-underline text-lg">
                      {link.title}
                    </a>
                    <p className="text-gray-600">{link.desc}</p>
                  </div>
                  <img src={`https://api.screenshotone.com/take?
	access_key=Id53MuBcmnqVNA
	&url=${link.url}`} alt={`Screenshot of ${link.title}`} className="w-20 h-20 object-cover md:mr-12 md:mb-0 md:w-52 md:h-24" />
                  <div className="flex flex-col ml-3">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => startEditing(link)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg></button>
                    <button className="text-purple-600 hover:text-purple-800 mt-3" onClick={() => deleteLink(link.id)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-backspace-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 5a2 2 0 0 1 1.995 1.85l.005 .15v10a2 2 0 0 1 -1.85 1.995l-.15 .005h-11a1 1 0 0 1 -.608 -.206l-.1 -.087l-5.037 -5.04c-.809 -.904 -.847 -2.25 -.083 -3.23l.12 -.144l5 -5a1 1 0 0 1 .577 -.284l.131 -.009h11zm-7.489 4.14a1 1 0 0 0 -1.301 1.473l.083 .094l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.403 1.403l.094 -.083l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.403 -1.403l-.094 .083l-1.293 1.292l-1.293 -1.292l-.094 -.083l-.102 -.07z" stroke-width="0" fill="currentColor" /></svg></button>
                  </div>
                </li>
              )}
              <hr />
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No links available.</p>
      )}
    </div>
  );
};

export default AllTopicLinks;
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}


'use client';

import React, { Key, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FileUpload } from '../../models/FileUpload';
import UploadFiles from './FileUploadForm';

type UploadFileProps = {
    data: any;
    title: ReactNode;
    id: Key | null | undefined;
    fileUploads: FileUpload[]; // Update the property name
};

const UploadFile = () => {
    const [fileUploads, setFileUploads] = useState<UploadFileProps[]>([]); // Update the state variable name
    const [error, setError] = useState('');
    const params = useParams();
    const topicId = params.id;
    
    useEffect(() => {
        const fetchFiles = async () => { // Update the function name
            if (!topicId) {
                return;
            }
            try {
                const response = await fetch(`/api/files?topicId=${topicId}`); // Update the endpoint to fetch files
                if (!response.ok) {
                    throw new Error('Failed to fetch files');
                }
                const data = await response.json();
                setFileUploads(data); // Update the state variable
            } catch (error) {
                setError(`Error fetching files: ${error}`);
            }
        };
        fetchFiles(); // Call the updated fetch function
    }, [topicId]);

const deleteFile = async (id: string) => {
    try {
        const response = await fetch(`/api/files/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete file');
        }
        // Call fetchFiles to refresh the list after deletion
        fetchFiles();
    } catch (error) {
        console.error('Failed to delete file:', error);
    }
}

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-10">
            <UploadFiles />
            {fileUploads.length > 0 ? (
                <ul>
                    <h2 className='text-2xl font-bold'>Files Uploaded</h2>
                    {fileUploads.map((file) => (
                        <><li className='flex flex-row gap-10' key={file.id as string}>
                            <p>{file.title}</p>
                            {/* Render file preview if it's an image */}
                            {file.data && (
                                <img src={file.data} alt={file.title} style={{ maxWidth: '100px' }} />
                                )}
                                <button className="text-purple-600 hover:text-purple-800 mt-3" onClick={() => deleteFile(file.id as string)}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-backspace-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 5a2 2 0 0 1 1.995 1.85l.005 .15v10a2 2 0 0 1 -1.85 1.995l-.15 .005h-11a1 1 0 0 1 -.608 -.206l-.1 -.087l-5.037 -5.04c-.809 -.904 -.847 -2.25 -.083 -3.23l.12 -.144l5 -5a1 1 0 0 1 .577 -.284l.131 -.009h11zm-7.489 4.14a1 1 0 0 0 -1.301 1.473l.083 .094l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.403 1.403l.094 -.083l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.403 -1.403l-.083 -.094l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.403 -1.403l-.094 .083l-1.293 1.292l-1.293 -1.292l-.094 -.083l-.102 -.07z" strokeWidth="0" fill="currentColor" /></svg></button>
                        </li><hr /></>
                    ))}
                </ul>
            ) : (
                <p>No files available.</p>
            )}
        </div>
    );
}

export default UploadFile;
function fetchFiles() {
    throw new Error('Function not implemented.');
}


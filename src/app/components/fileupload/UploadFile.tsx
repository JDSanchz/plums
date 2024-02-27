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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <UploadFiles />
            <h2>Files Uploaded</h2>
            {fileUploads.length > 0 ? (
                <ul>
                    {fileUploads.map((file) => (
                        <li key={file.id}>
                            <p>{file.title}</p>
                            {/* Render file preview if it's an image */}
                            {file.data && (
                                <img src={file.data} alt={file.title} style={{ maxWidth: '100px' }} />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No files available.</p>
            )}
        </div>
    );
}

export default UploadFile;

'use client';

import React, { Key, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FileUpload } from '../../models/FileUpload';
import UploadFiles from './FileUploadForm';
import Image from 'next/image';

type UploadFileProps = {
    data: any;
    title: ReactNode;
    type: any;
    id: Key | null | undefined;
    fileUploads: FileUpload[]; // Update the property name
};

const UploadFile = () => {
    const [fileUploads, setFileUploads] = useState<UploadFileProps[]>([]); // Update the state variable name
    const [error, setError] = useState('');
    const [refreshFiles, setRefreshFiles] = useState(false);
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
                setFileUploads(data.map(file=>({
                    ...file,
                    imageUrl: file.data ? URL.createObjectURL(new Blob([new Uint8Array(file.data.data)], { type: file.mimeType})) : null
                }))); // Update the state variable
            } catch (error) {
                setError(`Error fetching files: ${error}`);
            }
        };
        fetchFiles(); // Call the updated fetch function
    }, [refreshFiles, topicId]);

const deleteFile = async (id: string) => {
    try {
        const response = await fetch(`/api/files/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete file');
        }
        // Call fetchFiles to refresh the list after deletion
        setRefreshFiles(!refreshFiles);
    } catch (error) {
        console.error('Failed to delete file:', error);
    }
}

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-10">
            <UploadFiles setRefreshFiles={setRefreshFiles} refreshFiles={refreshFiles} />
            {fileUploads.length > 0 ? (
                <ul>
                    <h2 className='text-2xl font-bold'>Files Uploaded</h2>
                    {fileUploads.map((file) => (
                        <><li className='flex flex-row gap-10' key={file.id as string}>
                            <p>{file.title}</p>
                            {file.data && file.mimeType && file.mimeType.startsWith('image/')   ? (
                                <Image src={file.imageUrl} alt={file.title} width={50} height={50} />
                                ) : (
                                <div>
                                    {/* Display a generic icon for non-image file types */}
                                    <svg width="50px" height="50px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 19L17 21L21 17M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H11.5M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V13.4M9 17H11.5M9 13H15M9 9H10" stroke="#000000" stroke-width="0.768" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <div>{file.title}</div>
                                </div>
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


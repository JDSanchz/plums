import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const UploadFiles = () => {
    const [title, setTitle] = useState('');
    const [data, setData] = useState<File | null>(null); // Changed setFile to setData
    const [error, setError] = useState('');

    const params = useParams();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        const topicId = params.id;
        if (!topicId) {
            setError('Topic ID is missing');
            return;
        }

        if (!data) {
            setError('File is missing');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', data);
        formData.append('topicId', topicId.toString());

        try {
            const response = await fetch('/api/files', 
            { 
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newFile = await response.json(); // Assuming the API returns the uploaded file data
                console.log('File uploaded successfully:', newFile);
                setTitle('');
                setData(null); // Changed setFile to setData
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Error uploading file');
            }
        } catch (error) {
            setError('There was an error submitting the form');
        }
    };

    return (
        <div>
            <h1>Upload File</h1>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="data">File</label>
                    <input
                        id="data"
                        type="file"
                        onChange={(e) => setData(e.target.files?.[0] || null)} // Changed to setData
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadFiles;

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {Button, Label, TextInput, FileInput} from 'flowbite-react';

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
        <div className="flex max-w-md flex-col gap-4">
            <h1>Upload File</h1>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title" value="Title"/>
                    <TextInput id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <Label htmlFor='data' value="File"/>
                    <FileInput id="data" onChange={(e) => setData(e.target.files?.[0] || null)}/>
                </div>
                <Button type="submit">Upload</Button>
            </form>
        </div>
    );
};

export default UploadFiles;

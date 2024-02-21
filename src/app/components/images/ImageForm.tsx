'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const ImageForm = () => {
    const [title, setTitle] = useState('');
    const [data, setFile] = useState<File | null>(null);
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

        try {
            const response = await fetch('/api/images', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newImage = await response.json();
                console.log('Image created successfully:', newImage);
                setTitle('');
                setFile(null);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Error creating image');
            }
        } catch (error) {
            setError('There was an error submitting the form');
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
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
                        id="file"
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>
                <button type="submit">
                    Upload
                </button>
            </form>
        </div>
    );
};

export default ImageForm;





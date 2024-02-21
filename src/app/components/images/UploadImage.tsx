'use client';

import React, { Key, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Images } from '../../models/Images';


type UploadImageProps = {
    title: ReactNode;
    id: Key | null | undefined;
    images: Images[];
};


const UploadImage = () => {
    const [images, setImages] = useState<UploadImageProps[]>([]);
    const [error, setError] = useState('');
    const params = useParams();
    const topicId = params.id;
    
    useEffect(() => {
        const fetchImages = async () => {
            if (!topicId) {
                return;
            }
            try {
                const response = await fetch(`/api/images?topicId=${topicId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }
                const data = await response.json();
                setImages(data);
            } catch (error) {
                setError(`Error fetching images: ${error}`);
            }
        };
        fetchImages();
    }, [topicId]);
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <div>
        <h2> Images Uploaded </h2>
        {images.length > 0 ? (
            <ul>
            {images.map((image) => (
                <li key={image.id}>
                <p>{image.title}</p>
                </li>
            ))}
            </ul>
        ) : (
            <p>No images available.</p>
        )}
        </div>
    );

}

export default UploadImage;
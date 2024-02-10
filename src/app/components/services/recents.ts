import {Topic} from '../../models/Topic';


export const lastAccessed = async (data: Topic) => {
    console.log(data)
    try {
    const response = await fetch('/api/topics', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    } catch (error) {
    console.error("Failed to add the topic:", error);
    }
};


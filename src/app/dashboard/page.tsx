import React from 'react'
import Welcome from '../components/Welcome'
import TopicCard from '../components/TopicCard'
import topic from '../components/topics.json'
export default function page() {
return (
    <div>
        <div className='flex gap-4'>
            {topic.map((topic) => (
                <TopicCard title={topic.title} description={topic.description} />
            ))}
        </div>
        <div className='mt-8'>
            <Welcome/>
        </div>
    </div>
)
}

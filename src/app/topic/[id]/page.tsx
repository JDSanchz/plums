import React from 'react'
import Welcome from '../../components/Welcome'
import TopicCard from '../../components/TopicCard'
import topic from '../../components/topics.json'
import Editor from '../../components/texteditor/Editor'
export default function page() {
return (
    <div>
        <h1>topic</h1>
        <Editor />
    </div>
)
}

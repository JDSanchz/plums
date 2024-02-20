'use client'
import { useState } from 'react'
import React from 'react'
import { useParams } from 'next/navigation'

import Editor from './texteditor/Editor'

export default function NewNote(props) {

    const [title, setTitle] = useState('')
    
    const params = useParams();

    const {newnote, setNewNote} = props
    const [contentNote, setContentNote] = useState('')
    console.log(params)
    const postNote = () => {
        
        console.log(contentNote)
        const fetchNotes = async () => {
          try {
            const response = await fetch(`/api/notes/note`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
                body: JSON.stringify({title, contentNote, topicId: params.id})
            });
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            // setNoteData(data);
          } catch (error) {
            console.error("Failed to fetch topics:", error);
          }
        };
        fetchNotes();
    }
    if (contentNote) {
        console.log(contentNote)
    }
    
    return (
    <div>
        <input type="text" placeholder="Title" className='w-full mb-4 rounded border-zinc-200'
        onChange={(e)=>setTitle(e.target.value)}
        />
        <Editor isEditMode={true} setContentNote={setContentNote} />
        <div>
            <button className="btn-primary" onClick={()=>postNote()}>Save Note</button>
            <button className="btn-cancel ml-4" onClick={()=>setNewNote(false)}>Cancel Note</button>
        </div>

    </div>
  )
}

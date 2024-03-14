"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Editor from "./texteditor/Editor";
import NewNote from "./texteditor/NewNote";
import EditorMode from "./texteditor/EditorMode";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState(false);
  const [noteData, setNoteData] = useState<Note>();
  const [noteId, setNoteId] = useState();

  const [refreshNotes, setRefreshNotes] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const params = useParams();

  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/notes?topicId=${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };

    fetchNotes();
  }, [refreshNotes]);

  useEffect(()=>{
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/notes/note?noteId=${noteId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setNoteData(data);
   
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };
    fetchNotes();
  }, [noteId]);

  // console.log(noteData)
  return (
    <div className="flex flex-col flex-wrap md:flex-row gap-8">
  

      <div className="flex flex-wrap flex-col gap-4">
        <div className="max-h-[300px] flex flex-col gap-4 py-3 px-2 overflow-y-auto">
        {notes.map((note:any) => {
          return (
            
            <a  className="cursor-pointer w-[300px] border border-slate-100 rounded">
              <div className="shadow flex justify-between p-4 gap-4 rounded">
                <div className="flex gap-2" onClick={() => {setNoteId(note.id)}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-notes"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                  <path d="M9 7l6 0" />
                  <path d="M9 11l6 0" />
                  <path d="M9 15l4 0" />
                </svg>
                <h1 className="text-sm" key={note.id}>{note.title}</h1>
                </div>
                <span>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-backspace"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z" /><path d="M12 10l4 4m0 -4l-4 4" /></svg>
                </span>
              </div>
            </a>
          );
        })}
        </div>
        <button className="btn-primary" onClick={()=>setNewNote(true)}>New Note</button>
      </div>
      {newNote && <NewNote setNewNote={setNewNote} newNote={newNote} onNoteAdded={() => {setRefreshNotes(prev => !prev); setNewNote(!newNote)}}/>}
      {noteData && 
        !newNote &&
        <div className="px-4">
          <div className="flex items-center gap-4 mb-6">
       
            {/* <span className="cursor-pointer" onClick={()=>setEditMode(!editMode)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
            </span> */}
          </div>
 
          <div>
            
            <EditorMode onNoteAdded={() => {setRefreshNotes(prev => !prev); setEditMode(true)}} key={noteData.id} noteId={noteData.id} title={noteData.title} isEditMode={editMode} content={noteData.content} setContentNote={(note: string) => {console.log(note)}}/>
          </div>
      
        </div>
      }
    </div>
  );
}

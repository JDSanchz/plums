"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Editor from "./texteditor/Editor";
import NewNote from "./NewNote";

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
  }, []);

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
        console.log(noteData)
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    };
    fetchNotes();
  }, [noteId]);

  // console.log(noteData)
  return (
    <div className="flex flex-col md:flex-row gap-8">
  

      <div className="flex flex-wrap flex-col gap-4">
        {notes.map((note) => {
          return (
            
            <a onClick={() => setNoteId(note.id)} className="cursor-pointer w-[300px]">
              <div className="shadow flex p-4 gap-4 rounded">
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
            </a>
          );
        })}
        <button className="btn-primary" onClick={()=>setNewNote(true)}>New Note</button>
      </div>
      {newNote && <NewNote setNewNote={setNewNote} newNote={newNote} />}
      {noteData && 
        !newNote &&
        <div>
          <h1 className="text-3xl font-bold mb-6">{noteData?.title}</h1>
          <Editor content={noteData?.content} isEditMode={false} />
        </div>
      }
    </div>
  );
}

"use client";
import "./styles.css";
import { use, useEffect, useState } from "react";
import data from "./data.json";
import ExampleTheme from "./ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Write something...</div>;
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// When the editor changes, you can get notified via the
// OnChangePlugin!
function MyOnChangePlugin({ onChange }:any) {
  // Access the editor through the LexicalComposerContext
  const [editor] = useLexicalComposerContext();
  // Wrap our listener in useEffect to handle the teardown and avoid stale references.
  useEffect(() => {
    // most listeners return a teardown function that can be called to clean them up.
    return editor.registerUpdateListener(({ editorState }) => {
      // call onChange here to pass the latest state up to the parent.
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}
const initialData = JSON.stringify(data);

interface EditorProps {
  noteId: string;
  title: string;
  isEditMode: boolean;
  content?: string;
  setContentNote?: (note: string) => void;
  onNoteAdded?: any;
}

export default function Editor({noteId, isEditMode, content, title, setContentNote, onNoteAdded }: EditorProps) {
  const [editorState, setEditorState] = useState<string>();
  const [updated, setUpdated] = useState(false);
  let editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error:any) {
      throw error;
    },
    namespace: "editor",
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: content,
    editable: true,
  };
  console.log(noteId)
  async function updateNote(e:any) {
    console.log("update note")
    e.preventDefault();
    try {
      console.log(titleNote)
      const response = await fetch(`/api/notes/note?noteId=${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({noteId:noteId, title:titleNote, content: editorState }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
     

      if (data) {
        onNoteAdded();
      }
   
      setUpdated(true);  
        
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  }

  const [titleNote, setTitleNote] = useState(title);
  function onChange(editorState:any) {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    console.log(content)
    setEditorState(JSON.stringify(editorStateJSON));
    // if(setContentNote) {
    //   setContentNote(JSON.stringify(editorStateJSON))
    // }


  }
   
  useEffect(()=> {
    setTitleNote(title)
  },[])
  

  return (
    <LexicalComposer initialConfig={editorConfig}>
      
      {updated && <div className="bg-blue-50 p-4 mb-4 flex justify-between">Updated Note
        <a className="cursor-pointer" onClick={()=>setUpdated(false)}>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>
        </a>
      </div>}
      <input type="text" className="mb-4" value={titleNote} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTitleNote(e.target.value)}/>
      <div className="editor-container">
        
        <ToolbarPlugin />
        <div className="editor-inner max-h-[500px] overflow-y-auto md:max-w-[800px] md:min-w-[500px]">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyOnChangePlugin onChange={onChange} />
          {/* <TreeViewPlugin /> */}
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>

      </div>
      <button className="bg-purple-100 p-2 rounded mt-4" onClick={(e)=>updateNote(e)}>Update note</button>

    </LexicalComposer>
  );
}

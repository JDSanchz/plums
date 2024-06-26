"use client";
import "./styles.css";
import { useEffect, useState } from "react";
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


import { useParams } from "next/navigation";

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
  setNewNote: any;
  newNote: boolean;
  onNoteAdded: any;
}


export default function Editor({setNewNote, newNote, onNoteAdded}: EditorProps) {
  const [editorState, setEditorState] = useState<string>();
  const [title, setTitle] = useState('');
  const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error:any) {
      throw error;
    },
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
    // editorState: content,
    editable: true,
    namespace: "editor"
  };
  const params = useParams();

  // save note
  async function saveNote(e:any) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/notes/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, content: editorState, topicId: params.id }),
      });

      if (response.ok) {
        onNoteAdded();
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // setNoteData(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  }

  function onChange(editorState:any) {

    


    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    
    setEditorState(JSON.stringify(editorStateJSON));
    // if(setContentNote) {
    //   setContentNote(JSON.stringify(editorStateJSON))
    // }

  }
   
  

  return (
    <div>
      <h2 className="text-xs">Note Title</h2>
      <input type="text" className="border-slate-200 mb-4 rounded text-sm" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}/>
      <LexicalComposer initialConfig={editorConfig}>
    
        <div className="editor-container mt-8">
          <ToolbarPlugin />
          <div className="editor-inner max-h-[600px] overflow-y-auto">
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
      </LexicalComposer>
      <div className="flex gap-4">
        <button className="btn-primary" onClick={(e)=>saveNote(e)}>Save Note</button>
        <button className="btn-cancel" onClick={()=>setNewNote(false)}>Cancel</button>
      </div>
    </div>
  );
}

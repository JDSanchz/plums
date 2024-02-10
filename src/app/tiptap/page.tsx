'use client'
import {
    EditorState,
    $createParagraphNode,
    $createTextNode,
} from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import {
    $toggleBold,
    $toggleItalic,
    $toggleUnderline,
    $toggleCode,
  } from 'lexical';
  
// Define your toolbar component
const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  // Handler functions to toggle styles
  const onBoldClick = () => {
    editor.dispatchCommand($toggleBold, undefined);
  };

  const onItalicClick = () => {
    editor.dispatchCommand($toggleItalic, undefined);
  };

  const onUnderlineClick = () => {
    editor.dispatchCommand($toggleUnderline, undefined);
  };

  const onCodeClick = () => {
    editor.dispatchCommand($toggleCode, undefined);
  };

  return (
    <div>
      <button onClick={onBoldClick}>Bold</button>
      <button onClick={onItalicClick}>Italic</button>
      <button onClick={onUnderlineClick}>Underline</button>
      <button onClick={onCodeClick}>Code</button>
    </div>
  );
};

const MyEditor = () => {
  // Initialize editor state
  const editorConfig = {
    initialState: EditorState.create({
      children: [
        $createParagraphNode().append($createTextNode('Hello world!')),
      ],
    }),
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Toolbar />
      <ContentEditable />
      <HistoryPlugin />
      <RichTextPlugin />
      <OnChangePlugin onChange={(editorState, editor) => {
        // Optionally handle editor state changes
      }} />
    </LexicalComposer>
  );
};

export default MyEditor;

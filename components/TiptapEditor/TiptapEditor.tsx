'use client';

// import ImageResize from 'tiptap-extension-resize-image';

import { ToolBar } from '@/components/ToolBar';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
// import Highlight from '@tiptap/extension-highlight';
// import Image from '@tiptap/extension-image';
import OrderedList from '@tiptap/extension-ordered-list';
// import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      //   TextAlign.configure({
      //     types: ['heading', 'paragraph'],
      //   }),
      Heading.configure({
        levels: [4, 5, 6],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-3',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[118px]',
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent className="rounded-md border" editor={editor} />
    </div>
  );
};

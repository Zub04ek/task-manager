'use client';

// import ImageResize from 'tiptap-extension-resize-image';

import { ToolBar } from '@/components/ToolBar';
import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';
// import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'm-0',
          },
        },
        bold: {
          HTMLAttributes: {
            class: 'not-prose',
          },
        },
        heading: {
          levels: [2, 3, 4],
          HTMLAttributes: {
            class: 'text-foreground m-0',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal my-2 ml-2',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc my-2 ml-2',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color.configure({
        types: ['textStyle', 'heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-[200px] overflow-y-scroll py-2 px-3 rounded-md text-foreground',
      },
    },
    content: content,
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent
        className="h-[200px] resize-none rounded-md border"
        editor={editor}
      />
    </div>
  );
};

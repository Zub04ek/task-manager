'use client';

import {
  //   AlignCenter,
  //   AlignLeft,
  //   AlignRight,
  Bold,
  Code,
  Heading4,
  Heading5,
  Heading6,
  //   Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  //   Upload,
} from 'lucide-react';

import { Toggle } from '@/components/ui';
import { type Editor } from '@tiptap/react';

interface ToolBarProps {
  editor: Editor | null;
}

export const ToolBar = ({ editor }: ToolBarProps) => {
  if (!editor) return null;
  //   const addImage = () => {
  //     const url = window.prompt('URL');
  //     if (url) {
  //       editor.chain().focus().setImage({ src: url }).run();
  //     }
  //   };

  const options = [
    {
      icon: <Heading4 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      preesed: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading5 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      preesed: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading6 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      preesed: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive('bold'),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive('strike'),
    },
    // {
    //   icon: <AlignLeft className="size-4" />,
    //   onClick: () => editor.chain().focus().setTextAlign('left').run(),
    //   preesed: editor.isActive({ textAlign: 'left' }),
    // },
    // {
    //   icon: <AlignCenter className="size-4" />,
    //   onClick: () => editor.chain().focus().setTextAlign('center').run(),
    //   preesed: editor.isActive({ textAlign: 'center' }),
    // },
    // {
    //   icon: <AlignRight className="size-4" />,
    //   onClick: () => editor.chain().focus().setTextAlign('right').run(),
    //   preesed: editor.isActive({ textAlign: 'right' }),
    // },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive('orderedList'),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive('code'),
    },
    // {
    //   icon: <Highlighter className="size-4" />,
    //   onClick: () => editor.chain().focus().toggleHighlight().run(),
    //   preesed: editor.isActive('highlight'),
    // },
    // {
    //   icon: <Upload className="size-4" />,
    //   onClick: () => addImage(),
    //   preesed: editor.isActive('image'),
    // },
  ];

  return (
    <div className="sticky top-10 z-50 mb-1 space-x-1 rounded-md border p-1.5">
      {options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

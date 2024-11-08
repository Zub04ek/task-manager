'use client';

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  Link,
  List,
  ListOrdered,
  Strikethrough,
  //   Upload,
} from 'lucide-react';

import { Input, Toggle } from '@/components/ui';
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
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Heading4 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      preesed: editor.isActive('heading', { level: 4 }),
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
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      preesed: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      preesed: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      preesed: editor.isActive({ textAlign: 'right' }),
    },
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
      icon: <Link className="size-4" />,
      onClick: () => editor.chain().focus().extendMarkRange('link').run(),
      preesed: editor.isActive('link'),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive('code'),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () =>
        editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run(),
      preesed: editor.isActive('highlight', { color: '#b197fc' })
        ? true
        : false,
    },
    // {
    //   icon: <Upload className="size-4" />,
    //   onClick: () => addImage(),
    //   preesed: editor.isActive('image'),
    // },
  ];

  return (
    <div className="mb-1 flex flex-wrap gap-1 rounded-md border p-1.5">
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
      {/* <Toggle size="sm"> */}
      <input
        className="size-8 rounded"
        type="color"
        onChange={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes('textStyle').color}
        data-testid="setColor"
      />
      {/* </Toggle> */}
    </div>
  );
};

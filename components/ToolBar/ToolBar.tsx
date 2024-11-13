'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Link,
  List,
  ListOrdered,
  Strikethrough,
  //   Upload,
} from 'lucide-react';

import { EditorLinkPopover } from '@/components/EditorLinkPopover';
import { ToolbarButton } from '@/components/ToolbarButton';
// import { Toggle } from '@/components/ui';
import { HSLToHex } from '@/utils';
import { type Editor } from '@tiptap/react';

interface ToolBarProps {
  editor: Editor;
}

export const ToolBar = ({ editor }: ToolBarProps) => {
  //   const addImage = () => {
  //     const url = window.prompt('URL');
  //     if (url) {
  //       editor.chain().focus().setImage({ src: url }).run();
  //     }
  //   };

  const options = [
    {
      label: 'Heading (level 2)',
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive('heading', { level: 2 }),
    },
    {
      label: 'Heading (level 3)',
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive('heading', { level: 3 }),
    },
    {
      label: 'Heading (level 4)',
      icon: <Heading4 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      preesed: editor.isActive('heading', { level: 4 }),
    },
    {
      label: 'Bold',
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive('italic'),
    },
    {
      label: 'Strikethrough',
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive('strike'),
    },
    {
      label: 'Align left',
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      preesed: editor.isActive({ textAlign: 'left' }),
    },
    {
      label: 'Align center',
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      preesed: editor.isActive({ textAlign: 'center' }),
    },
    {
      label: 'Align right',
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      preesed: editor.isActive({ textAlign: 'right' }),
    },
    {
      label: 'Bullet list',
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive('bulletList'),
    },
    {
      label: 'Numbered list',
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive('orderedList'),
    },
    {
      label: 'Link',
      icon: <Link className="size-4" />,
      onClick: () => editor.chain().focus().extendMarkRange('link').run(),
      preesed: editor.isActive('link'),
    },
    {
      label: 'Code',
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive('codeBlock'),
    },
    // {
    //   icon: <Upload className="size-4" />,
    //   onClick: () => addImage(),
    //   preesed: editor.isActive('image'),
    // },
  ];

  const foregroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--foreground');

  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    const hslArray = foregroundColor.split(' ').map((part) => parseFloat(part));

    const [h, s, l] = hslArray;
    const textColor = { h, s, l };
    const color =
      editor.getAttributes('textStyle')?.color || HSLToHex(textColor);
    setSelectedColor(color);
  }, [foregroundColor]);

  const handleColorChange = useCallback(
    (value: string) => {
      setSelectedColor(value);
      editor.chain().setColor(value).run();
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div className="mb-1 flex flex-wrap items-center justify-between rounded-md border p-1.5">
      {options.map((option, i) => (
        // <Toggle
        //   key={i}
        //   size="sm"
        //   pressed={option.preesed}
        //   onPressedChange={() => option.onClick()}
        // >
        //   {option.icon}
        // </Toggle>
        <ToolbarButton
          key={i}
          onClick={option.onClick}
          isActive={option.preesed}
          tooltip={option.label}
          aria-label={option.label}
        >
          {option.icon}
        </ToolbarButton>
      ))}
      {/* <EditorLinkPopover editor={editor} /> */}
      <ToolbarButton tooltip="Text color">
        <input
          className="size-8 cursor-pointer rounded"
          type="color"
          value={selectedColor}
          onChange={(event) => handleColorChange(event.target.value)}
          data-testid="setColor"
        />
      </ToolbarButton>
    </div>
  );
};

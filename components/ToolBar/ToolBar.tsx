'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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

import { Toggle } from '@/components/ui';
import { type Editor } from '@tiptap/react';

interface ToolBarProps {
  editor: Editor | null;
}

export const ToolBar = ({ editor }: ToolBarProps) => {
  // if (!editor) return null;
  //   const addImage = () => {
  //     const url = window.prompt('URL');
  //     if (url) {
  //       editor.chain().focus().setImage({ src: url }).run();
  //     }
  //   };

  const options = [
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor?.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor?.isActive('heading', { level: 3 }),
    },
    {
      icon: <Heading4 className="size-4" />,
      onClick: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
      preesed: editor?.isActive('heading', { level: 4 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      preesed: editor?.isActive('bold'),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      preesed: editor?.isActive('italic'),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor?.chain().focus().toggleStrike().run(),
      preesed: editor?.isActive('strike'),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor?.chain().focus().setTextAlign('left').run(),
      preesed: editor?.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor?.chain().focus().setTextAlign('center').run(),
      preesed: editor?.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor?.chain().focus().setTextAlign('right').run(),
      preesed: editor?.isActive({ textAlign: 'right' }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      preesed: editor?.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      preesed: editor?.isActive('orderedList'),
    },
    {
      icon: <Link className="size-4" />,
      onClick: () => editor?.chain().focus().extendMarkRange('link').run(),
      preesed: editor?.isActive('link'),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
      preesed: editor?.isActive('code'),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () =>
        editor?.chain().focus().toggleHighlight({ color: '#b197fc' }).run(),
      preesed: editor?.isActive('highlight', { color: '#b197fc' })
        ? true
        : false,
    },
    // {
    //   icon: <Upload className="size-4" />,
    //   onClick: () => addImage(),
    //   preesed: editor.isActive('image'),
    // },
  ];

  const HSLToHex = (hsl: { h: number; s: number; l: number }): string => {
    const { h, s, l } = hsl;

    const hDecimal = l / 100;
    const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };
  const foregroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--foreground');

  const [selectedColor, setSelectedColor] = useState<string>('');

  useMemo(() => {
    // console.log('foregroundColor :>> ', foregroundColor);
    const hslArray = foregroundColor.split(' ').map((part) => parseFloat(part));

    const [h, s, l] = hslArray;
    const textColor = { h, s, l };
    const color =
      editor?.getAttributes('textStyle')?.color || HSLToHex(textColor);
    setSelectedColor(color);
  }, [foregroundColor]);

  const handleColorChange = useCallback(
    (value: string) => {
      setSelectedColor(value);
      editor?.chain().setColor(value).run();
    },
    [editor]
  );

  // useEffect(() => {
  //   setSelectedColor(color);
  // }, [color]);

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
        value={selectedColor}
        onChange={(event) => handleColorChange(event.target.value)}
        data-testid="setColor"
      />
      {/* </Toggle> */}
    </div>
  );
};

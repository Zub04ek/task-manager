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
  List,
  ListOrdered,
  Strikethrough,
  //   Upload,
} from 'lucide-react';

import { type Editor } from '@tiptap/react';

export const toolOptions = (editor: Editor) => [
  {
    label: 'Heading (level 2)',
    icon: <Heading2 className="size-4" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    pressed: editor.isActive('heading', { level: 2 }),
  },
  {
    label: 'Heading (level 3)',
    icon: <Heading3 className="size-4" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    pressed: editor.isActive('heading', { level: 3 }),
  },
  {
    label: 'Heading (level 4)',
    icon: <Heading4 className="size-4" />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    pressed: editor.isActive('heading', { level: 4 }),
  },
  {
    label: 'Bold',
    icon: <Bold className="size-4" />,
    onClick: () => editor.chain().focus().toggleBold().run(),
    pressed: editor.isActive('bold'),
  },
  {
    label: 'Italic',
    icon: <Italic className="size-4" />,
    onClick: () => editor.chain().focus().toggleItalic().run(),
    pressed: editor.isActive('italic'),
  },
  {
    label: 'Strikethrough',
    icon: <Strikethrough className="size-4" />,
    onClick: () => editor.chain().focus().toggleStrike().run(),
    pressed: editor.isActive('strike'),
  },
  {
    label: 'Align left',
    icon: <AlignLeft className="size-4" />,
    onClick: () => editor.chain().focus().setTextAlign('left').run(),
    pressed: editor.isActive({ textAlign: 'left' }),
  },
  {
    label: 'Align center',
    icon: <AlignCenter className="size-4" />,
    onClick: () => editor.chain().focus().setTextAlign('center').run(),
    pressed: editor.isActive({ textAlign: 'center' }),
  },
  {
    label: 'Align right',
    icon: <AlignRight className="size-4" />,
    onClick: () => editor.chain().focus().setTextAlign('right').run(),
    pressed: editor.isActive({ textAlign: 'right' }),
  },
  {
    label: 'Bullet list',
    icon: <List className="size-4" />,
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    pressed: editor.isActive('bulletList'),
  },
  {
    label: 'Numbered list',
    icon: <ListOrdered className="size-4" />,
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    pressed: editor.isActive('orderedList'),
  },
  {
    label: 'Code',
    icon: <Code className="size-4" />,
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    pressed: editor.isActive('codeBlock'),
  },
  // {
  //   icon: <Upload className="size-4" />,
  //   onClick: () => addImage(),
  //   pressed: editor.isActive('image'),
  // },
];

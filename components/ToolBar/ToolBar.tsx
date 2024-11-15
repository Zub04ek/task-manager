'use client';

import { useCallback, useEffect, useState } from 'react';

import { EditorImageBlock } from '@/components/EditorImageBlock';
import { EditorLinkPopover } from '@/components/EditorLinkPopover';
import { ToolbarButton } from '@/components/ToolbarButton';
import { HSLToHex, RGBToHex, toolOptions } from '@/utils';
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

  const foregroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--foreground');

  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    const hslArray = foregroundColor.split(' ').map((part) => parseFloat(part));
    const [h, s, l] = hslArray;
    const textColor = { h, s, l };

    const editorTextColor = editor.getAttributes('textStyle')?.color;

    const color = editorTextColor
      ? RGBToHex(editorTextColor)
      : HSLToHex(textColor);

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
    <div className="mb-1 flex flex-wrap items-center gap-1 rounded-md border p-1.5">
      {toolOptions(editor).map((option, i) => (
        <ToolbarButton
          key={i}
          onClick={option.onClick}
          isActive={option.pressed}
          tooltip={option.label}
          aria-label={option.label}
        >
          {option.icon}
        </ToolbarButton>
      ))}
      <EditorLinkPopover editor={editor} />
      <ToolbarButton tooltip="Text color">
        <input
          className="size-8 cursor-pointer rounded"
          type="color"
          value={selectedColor}
          onChange={(event) => handleColorChange(event.target.value)}
          data-testid="setColor"
        />
      </ToolbarButton>
      <EditorImageBlock editor={editor} />
    </div>
  );
};

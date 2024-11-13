import { ChangeEvent, FC, useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';

import { ToolbarButton } from '@/components/ToolbarButton';
import { fileToBase64 } from '@/utils';
import type { Editor } from '@tiptap/react';

interface EditorImageBlockProps {
  editor: Editor;
}

export const EditorImageBlock: FC<EditorImageBlockProps> = ({ editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const insertImages = async () => {
        const contentBucket = [];
        const filesArray = Array.from(files);

        for (const file of filesArray) {
          contentBucket.push({ src: await fileToBase64(file) });
        }

        contentBucket.map((content) => editor.commands.setImage(content));
      };

      await insertImages();
    },
    [editor]
  );

  return (
    <div className="space-y-6">
      <ToolbarButton
        onClick={handleClick}
        isActive={editor.isActive('image')}
        tooltip="Image"
        aria-label="Image"
      >
        <Upload className="size-4" />
      </ToolbarButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
};

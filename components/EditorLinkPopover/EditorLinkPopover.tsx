import { useCallback, useState } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { Link } from 'lucide-react';

import { EditorLinkBlock } from '@/components/EditorLinkBlock';
import { ToolbarButton } from '@/components/ToolbarButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { toggleVariants } from '@/components/ui/toggle';
import type { Editor } from '@tiptap/react';

interface EditorLinkPopoverProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export const EditorLinkPopover = ({ editor }: EditorLinkPopoverProps) => {
  const [open, setOpen] = useState(false);

  const onSetLink = useCallback(
    (url: string) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
                target: '_blank',
              },
            },
          ],
        })
        .setLink({ href: url })
        .run();

      editor.commands.enter();
    },
    [editor]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ToolbarButton
          isActive={editor.isActive('link')}
          tooltip="Link"
          aria-label="Insert link"
          disabled={editor.isActive('codeBlock')}
        >
          <Link className="size-4" />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-80" align="end" side="bottom">
        <EditorLinkBlock onSave={onSetLink} />
      </PopoverContent>
    </Popover>
  );
};

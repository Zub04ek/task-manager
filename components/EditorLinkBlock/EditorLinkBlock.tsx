import {
  FormEvent,
  forwardRef,
  HTMLAttributes,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Button, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface LinkEditorProps extends HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  onSave: (url: string) => void;
}

export const EditorLinkBlock = forwardRef<HTMLDivElement, LinkEditorProps>(
  ({ onSave, defaultUrl, className }, ref) => {
    const formRef = useRef<HTMLDivElement>(null);
    const [url, setUrl] = useState(defaultUrl || '');
    // const [text, setText] = React.useState(defaultText || '');
    // const [isNewTab, setIsNewTab] = React.useState(defaultIsNewTab || false);

    const handleSave = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
          const isValid = Array.from(
            formRef.current.querySelectorAll('input')
          ).every((input) => input.checkValidity());

          if (isValid) {
            onSave(url);
          } else {
            formRef.current.querySelectorAll('input').forEach((input) => {
              if (!input.checkValidity()) {
                input.reportValidity();
              }
            });
          }
        }
      },
      [onSave, url]
    );

    useImperativeHandle(ref, () => formRef.current as HTMLDivElement);

    return (
      <div ref={formRef}>
        <div className={cn('space-y-4', className)}>
          <div className="space-y-1">
            <Label>URL</Label>
            <Input
              type="url"
              required
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

EditorLinkBlock.displayName = 'EditorLinkBlock';

export default EditorLinkBlock;

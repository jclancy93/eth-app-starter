import { DocumentDuplicateIcon } from '@heroicons/react/outline';
import { ReactNode, useRef, useState } from 'react';

export function CopyButton({ copyText }: { copyText: string }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef<any>(null);

  function copyToClipboard(e: { target: any }) {
    // @ts-ignore
    const code = textAreaRef.current.innerHTML;
    textAreaRef.current.value = code;
    textAreaRef?.current.select();
    document.execCommand('copy');
    navigator.clipboard.writeText(code);
    e.target.focus();
    setCopySuccess(true);
    const timeout = setTimeout(() => setCopySuccess(false), 300);

    return () => clearTimeout(timeout);
  }

  return (
    <span
      className="cursor-pointer text-gray-500 text-xs inline-flex items-center hover:text-gray-400"
      onClick={(e) => copyToClipboard(e)}
    >
      <DocumentDuplicateIcon className="inline h-4 w-4 mr-1" />{' '}
      {copySuccess ? 'Copied' : 'Copy'}
      <form className="hidden">
        <textarea ref={textAreaRef} value={copyText} readOnly />
      </form>
    </span>
  );
}

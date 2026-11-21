import { useRef, useState } from 'react';

interface PromptBoxProps {
  title: string;
  buttonLabel?: string;
  content: string;
  wide?: boolean;
  className?: string;
}

function renderMarkedText(raw: string) {
  const parts = raw.split(/(\u0001[^\u0002]*\u0002)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('\u0001') && part.endsWith('\u0002')) {
      return <mark key={idx}>{part.slice(1, -1)}</mark>;
    }
    return part;
  });
}

export function PromptBox({
  title,
  buttonLabel = 'Salin',
  content,
  wide = false,
  className = '',
}: PromptBoxProps) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'fallback'>('idle');
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const plain = content.replace(/[\u0001\u0002]/g, '');
    const showOk = () => {
      setStatus('ok');
      setTimeout(() => setStatus('idle'), 1600);
    };
    const showFallback = () => {
      if (preRef.current) {
        const range = document.createRange();
        range.selectNodeContents(preRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setStatus('fallback');
      setTimeout(() => setStatus('idle'), 2500);
    };

    try {
      await navigator.clipboard.writeText(plain);
      showOk();
    } catch {
      showFallback();
    }
  };

  const label =
    status === 'ok' ? 'Tersalin' : status === 'fallback' ? 'Tekan Ctrl+C' : buttonLabel;

  return (
    <div className={`prompt ${className}`}>
      <div className="prompt-bar">
        <span>{title}</span>
        <button
          type="button"
          className={`copy ${status === 'ok' ? 'ok' : ''}`}
          onClick={handleCopy}
        >
          {label}
        </button>
      </div>
      <pre ref={preRef} className={`code ${wide ? 'wide' : ''}`}>
        {wide ? content : renderMarkedText(content)}
      </pre>
    </div>
  );
}

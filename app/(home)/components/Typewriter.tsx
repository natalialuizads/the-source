'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 30, delay = 0, className = '', onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const lines = Array.isArray(text) ? text : [text];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const newLines = [...prev];
            if (!newLines[currentLineIndex]) newLines[currentLineIndex] = '';
            newLines[currentLineIndex] += currentLine[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      } else {
        // Line finished, move to next line
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, speed * 5); // Pause between lines

        return () => clearTimeout(timeout);
      }
    } else {
      // All lines finished
    }
  }, [hasStarted, currentLineIndex, currentCharIndex, lines, speed]);

  // Handle completion separately to avoid infinite loops with onComplete dependency
  useEffect(() => {
    if (hasStarted && currentLineIndex >= lines.length && onComplete) {
      onComplete();
    }
  }, [hasStarted, currentLineIndex, lines.length]);

  return (
    <div className={className}>
      {displayedText.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line.split(/(\[OK\])/g).map((part, i) =>
            part === '[OK]' ? (
              <span key={i} className="text-neon-green">{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </div>
      ))}
    </div>
  );
}

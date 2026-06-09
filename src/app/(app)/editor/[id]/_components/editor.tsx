"use client";

import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    },
  });

  // aktualizacja formularza po wpisaniu tekstu
  useEffect(() => {
    if (!quill) return;

    const handler = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill, onChange]);

  // aktualizacja edytora gdy zmienia się value
  useEffect(() => {
    if (!quill) return;

    const current = quill.root.innerHTML;

    if (current !== value) {
      quill.clipboard.dangerouslyPasteHTML(value || "");
    }
  }, [quill, value]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
}
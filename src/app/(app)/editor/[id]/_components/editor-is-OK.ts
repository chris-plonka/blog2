"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "../Editor.module.css";
import "../style.css";

const ReactQuill = dynamic(
  () => import("react-quill"),
  { ssr: false }
);

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export default function Editor({ onChange, value }: EditorProps) {
  const modules = {
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
      [{ font: [] }],
    ],
  };

  return (
    <div className={styles.quillWrapper}>
      <ReactQuill
        modules={modules}
        value={value}
        onChange={onChange}
        className="custom-editor"
      />
    </div>
  );
}
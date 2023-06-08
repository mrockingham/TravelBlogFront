import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor() {
  const [text, setText] = useState('');

  const handleChange = (value: React.SetStateAction<string>) => {
    setText(value);
  };

  return (
    <div>
      <ReactQuill value={text} onChange={handleChange} />
    </div>
  );
}

export default TextEditor;

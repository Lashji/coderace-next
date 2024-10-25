import React, { useState } from "react";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        className="flex-grow rounded-l border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-r bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 focus:outline-none"
      >
        <Plus size={20} />
      </button>
    </form>
  );
}

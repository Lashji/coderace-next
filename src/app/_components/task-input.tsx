import React, { useState } from "react";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
      >
        <Plus size={16} />
        <span>Add a task</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a title for this task..."
        className="w-full resize-none rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-3 py-1.5 text-white transition-colors hover:bg-blue-600"
        >
          Add task
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="rounded-md px-3 py-1.5 text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

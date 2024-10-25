import React, { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import type { Task as TaskType } from "../../types";

interface TaskProps {
  task: TaskType;
  boardId: string;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, text: string) => void;
}

export function Task({ task, boardId, onDelete, onEdit }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        taskId: task.id,
        boardId,
      }),
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const handleEditSubmit = () => {
    if (editText.trim() !== "") {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="rounded-lg bg-white p-3 shadow-sm">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
          className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group cursor-move rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="flex-grow text-gray-700">{task.text}</p>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => setIsEditing(true)}
            className="rounded p-1 text-gray-400 transition-colors hover:text-blue-500"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded p-1 text-gray-400 transition-colors hover:text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

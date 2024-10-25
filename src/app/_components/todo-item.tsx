import React from "react";
import { Check, Trash2, Edit2 } from "lucide-react";
import type { Task } from "../../types";

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
        todo.completed ? "bg-gray-50" : "bg-white"
      } hover:shadow-md`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
          todo.completed
            ? "border-green-500 bg-green-500"
            : "border-gray-300 hover:border-green-500"
        }`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>

      <span
        className={`flex-grow text-gray-700 ${todo.completed ? "text-gray-400 line-through" : ""}`}
      >
        {todo.text}
      </span>

      <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(todo.id, todo.text)}
          className="p-1 text-gray-400 transition-colors hover:text-blue-500"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1 text-gray-400 transition-colors hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

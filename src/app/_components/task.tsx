import React, { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import type { Task as TaskType } from "../../types";

interface TaskProps {
  boardId: string;
  task: TaskType;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, updatedTask: Partial<TaskType>) => void;
  onComplete: (taskId: string, completed: boolean) => void;
}

export function Task({
  boardId,
  task,
  onDelete,
  onEdit,
  onComplete,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ boardId, taskId: task.id }),
    );
  };

  const handleEdit = () => {
    onEdit(task.id, { title: editedTitle });
    setIsEditing(false);
  };

  const handleComplete = () => {
    onComplete(task.id, !task.completed);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="rounded-md bg-white p-3 shadow-sm"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleComplete}
          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={(e) => e.key === "Enter" && handleEdit()}
            className="flex-grow rounded border border-gray-300 px-2 py-1 text-black focus:border-blue-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow ${task.completed ? "text-gray-500 line-through" : "text-black"}`}
          >
            {task.title}
          </span>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

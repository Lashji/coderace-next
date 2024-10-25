import React from "react";
import { Task } from "./task";
import { TaskInput } from "./task-input";
import type { Board as BoardType, Task as TaskType } from "../../types";
import { MoreVertical } from "lucide-react";

interface BoardProps {
  board: BoardType;
  onAddTask: (boardId: string, text: string) => void;
  onDeleteTask: (boardId: string, taskId: string) => void;
  onEditTask: (boardId: string, taskId: string, text: string) => void;
  onMoveTask: (fromBoardId: string, toBoardId: string, taskId: string) => void;
}

export function Board({
  board,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onMoveTask,
}: BoardProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(
      e.dataTransfer.getData("text/plain"),
    ) as unknown as {
      boardId: string;
      taskId: string;
    };
    if (data.boardId !== board.id) {
      onMoveTask(data.boardId, board.id, data.taskId);
    }
  };

  return (
    <div
      className="flex h-full w-80 flex-shrink-0 flex-col rounded-lg bg-gray-100 p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">{board.title}</h2>
        <button className="rounded-md p-1 transition-colors hover:bg-gray-200">
          <MoreVertical size={16} className="text-gray-500" />
        </button>
      </div>

      <TaskInput onAdd={(text) => onAddTask(board.id, text)} />

      <div className="mt-4 flex-grow space-y-2 overflow-y-auto">
        {board.tasks.map((task: TaskType) => (
          <Task
            key={task.id}
            task={task}
            boardId={board.id}
            onDelete={(taskId) => onDeleteTask(board.id, taskId)}
            onEdit={(taskId, text) => onEditTask(board.id, taskId, text)}
          />
        ))}
      </div>
    </div>
  );
}

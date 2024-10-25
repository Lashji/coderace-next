import React from "react";
import { Task } from "./task";
import { TaskInput } from "./task-input";
import type { Task as TaskType } from "../../types";
import { MoreVertical } from "lucide-react";

interface BoardProps {
  title: string;
  tasks: TaskType[];
  onAddTask: (title: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, updatedTask: Partial<TaskType>) => void;
  onMoveTask: (taskId: string) => void;
  onCompleteTask: (taskId: string, completed: boolean) => void;
}

export function Board({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onMoveTask,
  onCompleteTask,
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
    if (data.boardId !== title) {
      onMoveTask(data.taskId);
    }
  };

  return (
    <div
      className="flex h-full w-80 flex-shrink-0 flex-col rounded-lg bg-gray-200 p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">{title}</h2>
        <button className="rounded-md p-1 transition-colors hover:bg-gray-200">
          <MoreVertical size={16} className="text-gray-500" />
        </button>
      </div>

      <TaskInput onAdd={(text) => onAddTask(text)} />

      <div className="mt-4 flex-grow space-y-2 overflow-y-auto">
        {tasks.map((task: TaskType) => (
          <Task
            key={task.id}
            boardId={title}
            task={task}
            onDelete={(taskId) => onDeleteTask(taskId)}
            onEdit={(taskId, updatedTask) =>
              onEditTask(taskId, updatedTask as Partial<TaskType>)
            }
            onComplete={(taskId, completed) =>
              onCompleteTask(taskId, completed)
            }
          />
        ))}
      </div>
    </div>
  );
}

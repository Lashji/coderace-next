"use client";
import { Board } from "./board";
import type { Board as BoardType, Task } from "../../types";
import { useEffect, useState } from "react";

export default function BoardContainer() {
  const defaultBoards: BoardType[] = [
    { id: "1", title: "To Do", tasks: [] },
    { id: "2", title: "In Progress", tasks: [] },
    { id: "3", title: "Done", tasks: [] },
  ];

  const [boards, setBoards] = useState<BoardType[]>(() => {
    const saved = localStorage.getItem("boards");
    return saved
      ? (JSON.parse(saved) as unknown as BoardType[])
      : defaultBoards;
  });

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const handleAddTask = (boardId: string, text: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: [
              ...board.tasks,
              { id: Date.now().toString(), text, completed: false },
            ],
          };
        }
        return board;
      }),
    );
  };

  const handleDeleteTask = (boardId: string, taskId: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        }
        return board;
      }),
    );
  };

  const handleEditTask = (boardId: string, taskId: string, text: string) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) =>
              task.id === taskId ? { ...task, text } : task,
            ),
          };
        }
        return board;
      }),
    );
  };

  const handleMoveTask = (
    fromBoardId: string,
    toBoardId: string,
    taskId: string,
  ) => {
    const task = boards
      .find((b) => b.id === fromBoardId)
      ?.tasks.find((t) => t.id === taskId);
    if (!task) return;

    setBoards(
      boards.map((board) => {
        if (board.id === fromBoardId) {
          return {
            ...board,
            tasks: board.tasks.filter((t) => t.id !== taskId),
          };
        }
        if (board.id === toBoardId) {
          return {
            ...board,
            tasks: [...board.tasks, task],
          };
        }
        return board;
      }),
    );
  };
  return (
    <>
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onMoveTask={handleMoveTask}
        />
      ))}
    </>
  );
}
"use client";
import { Board } from "./board";
import type { Board as BoardType, Task } from "../../types";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function BoardContainer() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUser`, {
        method: "GET",
      });
      return (await res.json()) as unknown as string;
    };

    getUser()
      .then((user) => {
        if (user) {
          setUserName(user);
        } else {
          redirect("/login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const defaultBoards: BoardType[] = [
    {
      id: "1",
      title: "To Do",
      description: "",
      difficulty: 0,
      start_datetime: "",
      end_datetime: "",
    },
    {
      id: "2",
      title: "In Progress",
      description: "",
      difficulty: 0,
      start_datetime: "",
      end_datetime: "",
    },
    {
      id: "3",
      title: "Done",
      description: "",
      difficulty: 0,
      start_datetime: "",
      end_datetime: "",
    },
  ];

  const getBoards = async () => {
    const taskRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getTasks?user_id=${userName}`,
    );
    const taskData = (await taskRes.json()) as unknown as Task[];

    const boardRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getBoards?user_id=${userName}`,
    );
    const boardData = (await boardRes.json()) as unknown as BoardType[];

    return boardData.map((board) => ({
      ...board,
      //   tasks: taskData.filter((task) => task.boardId === board.id),
    }));
  };

  //   const { data: boards } = useQuery({
  //     queryKey: ["get-boards"],
  //     queryFn: () => {
  //       const saved = localStorage.getItem("boards");
  //       return saved
  //         ? (JSON.parse(saved) as unknown as BoardType[])
  //         : defaultBoards;
  //     },
  //   });

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
              //   ...board.tasks,
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
            // tasks: board.tasks.filter((task) => task.id !== taskId),
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
            // tasks: board.tasks.map((task) =>
            //   task.id === taskId ? { ...task, text } : task,
            // ),
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
    // const task = boards
    //   .find((b) => b.id === fromBoardId)
    //   ?.tasks.find((t) => t.id === taskId);
    // if (!task) return;

    setBoards(
      boards.map((board) => {
        if (board.id === fromBoardId) {
          return {
            ...board,
            // tasks: board.tasks.filter((t) => t.id !== taskId),
          };
        }
        if (board.id === toBoardId) {
          return {
            ...board,
            // tasks: [...board.tasks, task],
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

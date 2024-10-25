"use client";
import { Board } from "./board";
import type { Task } from "../../types";
import { useEffect, useState } from "react";
import { env } from "~/env";

export default function BoardContainer({
  userName,
}: {
  userName: string | undefined;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const taskRes = await fetch(
          `${env.NEXT_PUBLIC_BACKEND_URL}/getTasks?user_id=${userName}`,
        );
        const taskData = (await taskRes.json()) as Task[];
        setTasks(taskData);
        console.log("taskData", taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchAllTasks();
  }, [userName]);

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => {
      if (status === "To Do")
        return !task.completed && new Date(task.start_datetime) > new Date();
      if (status === "In Progress")
        return (
          !task.completed &&
          new Date(task.start_datetime) <= new Date() &&
          new Date(task.end_datetime) > new Date()
        );
      if (status === "Done") return task.completed;
      return false;
    });
  };

  const handleAddTask = async (status: string, title: string) => {
    if (!userName) {
      console.error("User ID is not available");
      return;
    }

    const newTask = {
      title: title,
      description: "",
      difficulty: 0,
      start_datetime: new Date().toISOString(),
      end_datetime: new Date(Date.now() + 86400000).toISOString(), // Set end time to 24 hours from now
    };

    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/createTask?user_id=${userName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const addedTask = (await response.json()) as Task;
      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.error("Error adding task:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    // Implement API call to delete the task
    // For now, we'll just remove it from the local state
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = async (taskId: string, updatedTask: Partial<Task>) => {
    // Implement API call to update the task
    // For now, we'll just update it in the local state
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task,
      ),
    );
  };

  const handleMoveTask = async (taskId: string, newStatus: string) => {
    // Implement API call to update the task's status
    // For now, we'll just update it in the local state
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task };
          if (newStatus === "To Do") {
            updatedTask.completed = false;
            updatedTask.start_datetime = new Date(
              Date.now() + 86400000,
            ).toISOString(); // Set start time to tomorrow
          } else if (newStatus === "In Progress") {
            updatedTask.completed = false;
            updatedTask.start_datetime = new Date().toISOString();
          } else if (newStatus === "Done") {
            updatedTask.completed = true;
          }
          return updatedTask;
        }
        return task;
      }),
    );
  };

  const handleCompleteTask = async (taskId: string, completed: boolean) => {
    // Implement API call to update the task's completion status
    // For now, we'll just update it in the local state
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed } : task)),
    );
  };

  const boardStatuses = ["To Do", "In Progress", "Done"];

  return (
    <>
      {boardStatuses.map((status) => (
        <Board
          key={status}
          title={status}
          tasks={getTasksByStatus(status)}
          onAddTask={(title) => handleAddTask(status, title)}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onMoveTask={(taskId) => handleMoveTask(taskId, status)}
          onCompleteTask={handleCompleteTask}
        />
      ))}
    </>
  );
}

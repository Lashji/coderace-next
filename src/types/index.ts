export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Board {
  id: string;
  title: string;
  tasks: Task[];
}

export interface DragItem {
  type: "TASK";
  id: string;
  boardId: string;
  index: number;
}

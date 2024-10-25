export interface Task {
  id: string;
  text: string;
  completed: boolean;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  start_datetime: string;
  end_datetime: string;
}

export interface DragItem {
  type: "TASK";
  id: string;
  boardId: string;
  index: number;
}

export interface Task {
  completed: boolean;
  description: string;
  difficulty: number;
  end_datetime: string;
  id: string;
  notifications_sent: { 10: boolean; 30: boolean; 60: boolean };
  start_datetime: string;
  title: string;
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

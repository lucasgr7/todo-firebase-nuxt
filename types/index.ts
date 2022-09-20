export interface TodoType{
  value: string;
  done: boolean;
}

export interface FireBaseTodoType {
  id: string;
  value: TodoType;
}
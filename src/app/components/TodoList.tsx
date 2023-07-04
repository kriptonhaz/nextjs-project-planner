import { ITask } from "../../../types/tasks";
import React from "react";
import Task from "./Task";

interface TodoListProps {
    tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
      <div className="w-full mt-10">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    );
}

export default TodoList;
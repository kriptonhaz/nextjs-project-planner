import { getAllTodos } from "../../api";
import AddTask from "./components/AddTask";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";

export default async function Home() { 
  const tasks = await getAllTodos();

  return (
    <main className="min-h-screen">
      <NavBar />
      <AddTask />
      <TodoList tasks={tasks} />
    </main>
  )
}

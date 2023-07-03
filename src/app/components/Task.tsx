"use client";

import React, { FormEventHandler, useState } from "react";
import { ITask } from "../../../types/tasks";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editTodo, deleteTodo } from "../../../api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const handleEditTask: FormEventHandler<HTMLFormElement> = 
    async (e) => {
      e.preventDefault();
      await editTodo({
        id: task.id,
        text: taskToEdit
      })
      setTaskToEdit("");
      setOpenModalEdit(false);
      router.refresh();
    };

    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const handleDeleteTask = async (id: string) => {
      await deleteTodo(id);
      setOpenModalDelete(false);
      router.refresh();
    }
    return (
      <tr key={task.id}>
        <td className="w-2/5 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{task.text}</td>
        <td className="w-3/5 px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">New York No. 1 Lake Park</td>
        <td className="px-6 py-4 flex gap-5">
          <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={20} />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleEditTask}>
              <h3 className="font-bold text-lg">Edit Task</h3>
              <div className="modal-action">
                <input 
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text" 
                  placeholder="Type here" 
                  className="input input-bordered w-full" 
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={20} />
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h3 className="text-lg mt-5">Are you sure, you want to delete this task?</h3>
            <div className="modal-action">
              <button 
                onClick={() => handleDeleteTask(task.id)} 
                className="btn">YES
              </button>
            </div>
          </Modal>
        </td>
      </tr>
    );
};

export default Task;
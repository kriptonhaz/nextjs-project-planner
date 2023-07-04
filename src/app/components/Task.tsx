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
        text: taskToEdit,
        description: descToEdit
      })
      setTaskToEdit("");
      setDescToEdit("");
      setOpenModalEdit(false);
      router.refresh();
    };
    const [descToEdit, setDescToEdit] = useState<string>(task.description);

    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const handleDeleteTask = async (id: string) => {
      await deleteTodo(id);
      setOpenModalDelete(false);
      router.refresh();
    }
    return (
      <div className="w-2/4 mx-auto mt-5 card card-side bg-base-100 shadow-xl" key={task.id}>
        {/* <figure><img className="h-36" src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure> */}
          <div className="card-body">
            <h2 className="card-title  text-slate-500">{task.text}</h2>
            <p className=" text-slate-400">{task.description}</p>
              <div className="card-actions justify-end">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={20} />
                  <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <div className='text-center w-full'>
                      <h3 className="font-bold text-lg text-slate-500">Edit Task</h3>
                      <form onSubmit={handleEditTask} action="" className="form mt-6">  
                        <input 
                          value={taskToEdit}
                          onChange={(e) => setTaskToEdit(e.target.value)}
                          type="text" 
                          className="input input-bordered w-full" 
                        />
                        <input 
                          value={descToEdit}
                          onChange={(e) => setDescToEdit(e.target.value)}
                          type="text" 
                          className="input input-bordered w-full mt-2" 
                        />
                        <button type="submit" className="text-slate-500 btn mt-4">
                          SUBMIT
                        </button>
                      </form>
                    </div>
                  </Modal>
                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={20} />
                  <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <div className='text-center w-full'>
                      <h3 className="text-lg mt-5 text-slate-500">Are you sure, you want to delete this task?</h3>
                      <div className="w-full m-auto mt-10">
                        <button 
                          onClick={() => handleDeleteTask(task.id)} 
                          className="btn text-slate-500">YES
                        </button>
                      </div>
                    </div>
                  </Modal>
              </div>
          </div>
      </div>
    );
};

export default Task;
"use client";

import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { addTodo } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("");
    const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = 
    async (e) => {
      e.preventDefault();
      // console.log(newTaskValue);
      await addTodo({
        id: uuidv4(),
        text: newTaskValue
      })
      setNewTaskValue("");
      setModalOpen(false);
      router.refresh();
  };

    return (
        <div className='text-center w-full'>
          <button onClick={() => setModalOpen(true)} className='w-2/4 bg-transparent hover:bg-slate-500 text-slate-500 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded'>
          Add a New Task
          </button>
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleSubmitNewTask}>
              <h3 className="font-bold text-lg">Add new task</h3>
              <div className="modal-action">
                <input 
                  value={newTaskValue}
                  onChange={(e) => setNewTaskValue(e.target.value)}
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
        </div>
    );
}; 

export default AddTask;
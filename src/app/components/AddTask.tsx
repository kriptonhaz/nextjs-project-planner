"use client";

import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { addTodo } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newDescriptionValue, setNewDescriptioValue] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(e.target);
    if (!newTaskValue) return console.log("Don't Have New Task");
    // console.log(newTaskValue);
    if (image !== null) {
      await addTodo({
        id: uuidv4(),
        text: newTaskValue,
        description: newDescriptionValue,
        image: image,
      });
    }
    setNewTaskValue("");
    setNewDescriptioValue("");
    setImage(null);
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div className="text-center w-full">
      <button
        onClick={() => setModalOpen(true)}
        className="w-2/4 bg-transparent hover:bg-slate-500 
            text-slate-500 font-semibold hover:text-white 
            py-2 px-4 border border-slate-500 hover:border-transparent rounded"
      >
        Add a New Task
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <h3 className="font-bold text-lg text-slate-500">Add New Task</h3>
        <form onSubmit={handleSubmitNewTask} action="" className="form mt-6">
          <input
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
            type="text"
            placeholder="New Task"
            className="input input-bordered w-full"
          />
          <input
            value={newDescriptionValue}
            onChange={(e) => setNewDescriptioValue(e.target.value)}
            type="text"
            placeholder="Description"
            className="input input-bordered w-full mt-2"
          />
          <input
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
            type="file"
            name="file"
          />
          <button type="submit" className="text-slate-500 btn mt-4">
            SUBMIT
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;

'use client' // 👈 use it here

import { FormEventHandler, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import Modal from './Modal';
import { addTodo } from '@/api';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue
        })
        setNewTaskValue("");
        setModalOpen(false);
        location.reload();
    };
    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className='btn btn-primary w-full'>
                Add New Task
                <FaPlus className='ml-2' size={18} />
            </button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className='font-bold text-lg'>Add new task</h3>
                    <div className='modal-action'>
                        <input 
                            type='text'
                            value={newTaskValue}
                            onChange={(e) => setNewTaskValue(e.target.value)}
                            placeholder='Type Here...!'
                            className='input input-bordered w-full'
                        />

                        <button type='submit' className='btn'>Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddTask

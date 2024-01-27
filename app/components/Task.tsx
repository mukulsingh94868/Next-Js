'use client' // 👈 use it here

import { ITask } from '@/types/tasks';
import React, { FormEventHandler, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task?.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task?.id,
            text: taskToEdit
        })
        setTaskToEdit("");
        setOpenModalEdit(false);
        location.reload();
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        location.reload();
    };
    return (
        <tr key={task?.id}>
            <td className='w-full'>{(task?.text)}</td>
            <td className='flex gap-5'>
                <MdEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Add new task</h3>
                        <div className='modal-action'>
                            <input
                                type='text'
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                placeholder='Type Here...!'
                                className='input input-bordered w-full'
                            />

                            <button type='submit' className='btn'>Submit</button>
                        </div>
                    </form>
                </Modal>

                <MdDelete onClick={() => setOpenModalDeleted(true)} cursor="pointer" className='text-red-500' size={25} />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className='text-lg'>Are you sure, you want to delete this task?</h3>
                    <div className='modal-action'>
                        <button
                            className='btn'
                            onClick={() => handleDeleteTask(task?.id)}
                        >
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task

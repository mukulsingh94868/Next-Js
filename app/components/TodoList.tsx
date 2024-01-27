import { ITask } from '@/types/tasks';
import React from 'react';
import Task from './Task';

interface TodoListProps {
    tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    console.log('tasks', tasks)
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks?.map((task) => (
                            <Task key={task?.id} task={task} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TodoList

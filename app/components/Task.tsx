'use client';
import { ITask } from '@/types/tasks';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
	task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
	const Router = useRouter();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);
	const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
	const [taskCheck, setTaskCheck] = useState<boolean>(false);

	const handelSubmitEditTodo: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();

		await editTodo({
			id: task.id,
			text: taskToEdit,
			check: false,
		});

		setModalOpen(false);
		Router.refresh();
	};

	const handleDeleteTask = async (id: string) => {
		await deleteTodo(id);
		setModalOpenDeleted(false);
		Router.refresh();
	};

	const handleCheckTodo = async (e: boolean) => {
		await editTodo({
			id: task.id,
			text: taskToEdit,
			check: e,
		});
		Router.refresh();
	};
	return (
		<tr>
			<th>
				<label>
					<input
						onChange={e => handleCheckTodo(e.target.checked)}
						type='checkbox'
						className='checkbox'
					/>
				</label>
			</th>
			{task.check ? (
				<td className='w-full line-through'>{task.text}</td>
			) : (
				<td className='w-full '>{task.text}</td>
			)}

			<td className='flex gap-5'>
				<FiEdit
					onClick={() => setModalOpen(true)}
					cursor='pointer'
					className='text-blue-500'
					size={25}
				/>
				<Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
					<form onSubmit={handelSubmitEditTodo}>
						{' '}
						<h3 className='font-bold text-lg'>Edit task</h3>
						<div className='modal-action'>
							<input
								value={taskToEdit}
								onChange={e => setTaskToEdit(e.target.value)}
								type='text'
								placeholder='Type here'
								className='input input-bordered w-full'
							/>
							<button type='submit' className='btn'>
								Submit
							</button>
						</div>
					</form>
				</Modal>
				<FiTrash2
					onClick={() => setModalOpenDeleted(true)}
					cursor='pointer'
					className='text-red-500'
					size={25}
				/>
				<Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
					<h3 className='text-lg'>
						Are you sure, you want to delete this task?
					</h3>
					<div className='modal-action'>
						<button className='btn' onClick={() => handleDeleteTask(task.id)}>
							yes
						</button>
					</div>
				</Modal>
			</td>
		</tr>
	);
};

export default Task;

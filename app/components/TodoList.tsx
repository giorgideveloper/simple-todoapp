import { ITask } from '@/types/tasks';
import Task from './Task';

interface TodoListProps {
	tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
	return (
		<div className='overflow-x-auto mt-4'>
			<table className='table w-full'>
				{/* head */}
				<thead>
					<tr className='bg-base-200'>
						<th>TASKS</th>
						<th>ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map(task => (
						<Task key={task.id} task={task} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TodoList;

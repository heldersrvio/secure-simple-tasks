import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Styles/UserPage.css';

const UserPage = (props) => {
	const [userInfo, setUserInfo] = useState(null);
	const [isShowingAddTaskSection, setIsShowingAddTaskSection] = useState(false);
	const [newTaskInput, setNewTaskInput] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			setUserInfo(await Firebase.getUser(props.user));
		};
		fetchData();
	}, [props.user]);

	const deleteTask = async (taskIndex) => {
		await Firebase.deleteTask(props.user, taskIndex);
		setUserInfo((previous) => {
			return {
				...previous,
				tasks: previous.tasks.filter((_t, index) => index !== taskIndex),
			};
		});
	};

	const addTask = async () => {
		await Firebase.addTask(props.user, newTaskInput);
		setUserInfo((previous) => {
			return {
				...previous,
				tasks: previous.tasks.concat(newTaskInput),
			};
		});
		setNewTaskInput('');
		setIsShowingAddTaskSection(false);
	};

	const addTaskSection = (
		<div className="add-task-section">
			<input
				type="text"
				className="add-new-task-input"
				value={newTaskInput}
				onChange={(e) => setNewTaskInput(e.target.value)}
			></input>
			<button onClick={addTask}>Adicionar</button>
		</div>
	);

	const tasksSection =
		userInfo !== null ? (
			<div className="tasks-section">
				<h2>Tarefas</h2>
				{userInfo.tasks.map((task, index) => {
					return (
						<div className="task" key={index}>
							<span>{task}</span>
							<button
								className="delete-task-button"
								onClick={(_e) => deleteTask(index)}
							>
								<FontAwesomeIcon icon="trash-alt" color="black" size="lg" />
							</button>
						</div>
					);
				})}
				{isShowingAddTaskSection ? (
					addTaskSection
				) : (
					<button
						className="add-task-button"
						onClick={(_e) => setIsShowingAddTaskSection(true)}
					>
						<FontAwesomeIcon icon="plus-circle" color="white" size="lg" />
					</button>
				)}
			</div>
		) : null;

	return (
		<div className="user-page">
			{userInfo !== null ? (
				<div className="header">
					<h1 className="user-page-header">{userInfo.name}</h1>
					<button className="logout-button" onClick={props.logout}>
						Sair
					</button>
				</div>
			) : null}
			{tasksSection}
		</div>
	);
};

UserPage.propTypes = {
	user: PropTypes.string,
	logout: PropTypes.func,
};

export default UserPage;

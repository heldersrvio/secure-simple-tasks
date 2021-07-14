import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/UserDetailPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserDetailPage = (props) => {
	return (
		<div className="user-detail-page">
			<div className="header">
				<button className="back-button" onClick={props.back}>
					<FontAwesomeIcon icon="arrow-left" />
				</button>
				<h1>{props.userInfo.userName}</h1>
			</div>
			<div className="user-info-section">
				<div className="user-info-name-section">
					<label htmlFor="name">Nome: </label>
					<span>{props.userInfo.name}</span>
				</div>
				<div className="user-info-email-section">
					<label htmlFor="email">E-mail: </label>
					<span>{props.userInfo.email}</span>
				</div>
				<div className="user-info-role-section">
					<label htmlFor="role">Privilégios: </label>
					<span>
						{props.userInfo.role === 'admin' ? 'Administrador' : 'Usuário'}
					</span>
				</div>
				<div className="user-info-tasks-section ">
					<label htmlFor="tasks">Tarefas: </label>
					<ul>
						{props.userInfo.tasks.map((task, index) => {
							return (
								<li className="user-info-task-item" key={index}>
									<span>{task}</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

UserDetailPage.propTypes = {
	userInfo: PropTypes.shape({
		name: PropTypes.string,
		userName: PropTypes.string,
		email: PropTypes.string,
		tasks: PropTypes.arrayOf(PropTypes.string),
		role: PropTypes.string,
	}),
	back: PropTypes.func,
};

export default UserDetailPage;

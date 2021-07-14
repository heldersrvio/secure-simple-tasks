import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Firebase from '../Firebase';
import '../Styles/AdminPage.css';

const AdminPage = (props) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setUsers(await Firebase.getUsers());
		};
		fetchData();
	}, []);

	return (
		<div className="admin-page">
			<div className="header">
				<h1>Admin</h1>
				<button className="logout-button" onClick={props.logout}>
					Sair
				</button>
			</div>
			<h2>Usuários</h2>
			{users.map((user, index) => {
				return (
					<div
						className="admin-user-item"
						onClick={(_e) => props.redirectToUserDetailPage(user)}
						key={index}
					>
						<span>{user.userName}</span>
					</div>
				);
			})}
		</div>
	);
};

AdminPage.propTypes = {
	redirectToUserDetailPage: PropTypes.func,
	logout: PropTypes.func,
};

export default AdminPage;

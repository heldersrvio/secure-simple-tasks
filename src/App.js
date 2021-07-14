import React, { useState } from 'react';
import './App.css';
import AdminPage from './Components/AdminPage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import UserDetailPage from './Components/UserDetailPage';
import UserPage from './Components/UserPage';
import Firebase from './Firebase';

const App = () => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [currentPage, setCurrentPage] = useState('login');
	const [viewingUserDetail, setViewingUserDetail] = useState(null);

	const login = async (username, password) => {
		if (await Firebase.login(username, password)) {
			const userRole = (await Firebase.getUser(username)).role;
			setLoggedInUser(username);
			setCurrentPage(userRole !== 'admin' ? 'user-page' : 'admin-page');
			return true;
		}
		return false;
	};

	const redirectToSignUp = () => {
		setCurrentPage('sign-up');
	};

	const signUp = async (username, name, email, password) => {
		return await Firebase.createUser(username, name, email, password);
	};

	const redirectToLogin = () => {
		setCurrentPage('login');
	};

	const redirectToUserDetailPage = (user) => {
		setViewingUserDetail(user);
		setCurrentPage('user-detail-page');
	};

	const backToAdminPage = () => {
		setCurrentPage('admin-page');
	};

	const logout = () => {
		setCurrentPage('login');
		setLoggedInUser(null);
	};

	return (
		<div className="App">
			{currentPage === 'login' ? (
				<Login login={login} redirectToSignUp={redirectToSignUp} />
			) : currentPage === 'sign-up' ? (
				<SignUp signUp={signUp} redirectToLogin={redirectToLogin} />
			) : currentPage === 'user-page' ? (
				<UserPage user={loggedInUser} logout={logout} />
			) : currentPage === 'admin-page' ? (
				<AdminPage
					redirectToUserDetailPage={redirectToUserDetailPage}
					logout={logout}
				/>
			) : (
				<UserDetailPage userInfo={viewingUserDetail} back={backToAdminPage} />
			)}
		</div>
	);
};

export default App;

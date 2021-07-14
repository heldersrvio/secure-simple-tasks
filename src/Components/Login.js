import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Login.css';

const Login = (props) => {
	const [userNameInput, setUserNameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const validateAndLogin = async () => {
		if (userNameInput.length === 0 || passwordInput.length === 0) {
			setErrorMessage('Dados inválidos');
		} else {
			const isLoginSuccessful = await props.login(userNameInput, passwordInput);
			setErrorMessage(isLoginSuccessful ? '' : 'Dados inválidos');
		}
	};

	return (
		<div className="login">
			<h1>Login</h1>
			<input
				type="text"
				placeholder="Nome de usuário"
				value={userNameInput}
				onChange={(e) => setUserNameInput(e.target.value)}
			></input>
			<input
				type="password"
				placeholder="Senha"
				value={passwordInput}
				onChange={(e) => setPasswordInput(e.target.value)}
			></input>
			<span className="login-error-span">{errorMessage}</span>
			<button onClick={(_e) => validateAndLogin()} className="enter-button">
				Entrar
			</button>
			<button
				onClick={(_e) => props.redirectToSignUp()}
				className="not-a-user-button"
			>
				Ainda não tenho cadastro
			</button>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func,
	redirectToSignUp: PropTypes.func,
};

export default Login;

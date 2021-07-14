import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Login.css';

const Login = (props) => {
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const validateAndLogin = async () => {
		if (emailInput.length === 0 || passwordInput.length === 0) {
			setErrorMessage('Dados inválidos');
		} else {
			const isLoginSuccessful = await props.login(emailInput, passwordInput);
			setErrorMessage(isLoginSuccessful ? '' : 'Dados inválidos');
		}
	};

	return (
		<div className="login">
			<h1>Login</h1>
			<input
				type="email"
				placeholder="Email"
				value={emailInput}
				onChange={(e) => setEmailInput(e.target.value)}
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

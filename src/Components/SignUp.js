import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../Styles/SignUp.css';

const SignUp = (props) => {
	const [nameInput, setNameInput] = useState('');
	const [userNameInput, setUserNameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [passwordAgainInput, setPasswordAgainInput] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isFinished, setIsFinished] = useState(false);

	const verifyAndSignUp = async () => {
		if (
			[
				userNameInput,
				nameInput,
				emailInput,
				passwordInput,
				passwordAgainInput,
			].some((input) => input.length === 0)
		) {
			setErrorMessage('Preencha todos os dados');
		} else if (passwordInput !== passwordAgainInput) {
			setErrorMessage('Senhas não batem');
		} else {
			const wasSuccessful = await props.signUp(
				userNameInput,
				nameInput,
				emailInput,
				passwordInput
			);
			setErrorMessage(wasSuccessful ? '' : 'Usuário já existe');
			setIsFinished(wasSuccessful);
		}
	};

	const finishedScreen = (
		<div className="sign-up">
			<span className="sign-up-successful-span">
				Usuário cadastrado com sucesso
			</span>
			<button onClick={(_e) => props.redirectToLogin()}>Fazer login</button>
		</div>
	);

	const signUpForm = (
		<div className="sign-up">
			<input
				className="name-input"
				type="text"
				placeholder="Nome"
				value={nameInput}
				onChange={(e) => setNameInput(e.target.value)}
			></input>
			<input
				type="text"
				placeholder="Nome de usuário"
				value={userNameInput}
				onChange={(e) => setUserNameInput(e.target.value)}
			></input>
			<input
				type="email"
				placeholder="E-mail"
				value={emailInput}
				onChange={(e) => setEmailInput(e.target.value)}
			></input>
			<input
				type="password"
				placeholder="Senha"
				value={passwordInput}
				onChange={(e) => setPasswordInput(e.target.value)}
			></input>
			<input
				type="password"
				placeholder="Confirme a senha"
				value={passwordAgainInput}
				onChange={(e) => setPasswordAgainInput(e.target.value)}
			></input>
			<span className="sign-up-error-span">{errorMessage}</span>
			<button onClick={verifyAndSignUp}>Cadastrar-se</button>
		</div>
	);

	return isFinished ? finishedScreen : signUpForm;
};

SignUp.propTypes = {
	signUp: PropTypes.func,
	redirectToLogin: PropTypes.func,
};

export default SignUp;

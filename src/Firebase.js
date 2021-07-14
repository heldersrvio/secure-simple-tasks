import firebase from 'firebase/app';
import 'firebase/firestore';

const Firebase = (() => {
	const firebaseConfig = {
		apiKey: 'AIzaSyDPD5b6fyqQh5J-FnZMYYgpp_L-CQubjIo',
		authDomain: 'simple-tasks-734ac.firebaseapp.com',
		projectId: 'simple-tasks-734ac',
		storageBucket: 'simple-tasks-734ac.appspot.com',
		messagingSenderId: '373484943675',
		appId: '1:373484943675:web:b52e1585d6b1d56d3c1f1e',
	};

	firebase.initializeApp(firebaseConfig);
	const database = firebase.firestore();

	const getUsers = async () => {
		return (await database.collection('users').get()).docs.map((doc) => {
			return {
				userName: doc.id,
				...doc.data(),
			};
		});
	};

	const getUser = async (userName) => {
		const userDoc = await database.collection('users').doc(userName).get();
		if (userDoc.exists) {
			return {
				userName: userDoc.id,
				...userDoc.data(),
			};
		}
		throw new Error('Username does not exist');
	};

	const createUser = async (userName, name, email, password) => {
		try {
			await getUser(userName);
			return false;
		} catch (_error) {
			await database
				.collection('users')
				.doc(userName)
				.set({ name, email, password, tasks: [], role: 'user' });
			return true;
		}
	};

	const login = async (userName, password) => {
		try {
			return (await getUser(userName)).password === password;
		} catch (_error) {
			return false;
		}
	};

	const addTask = async (userName, task) => {
		const userTasks = (await getUser(userName)).tasks;
		await database
			.collection('users')
			.doc(userName)
			.set({ tasks: userTasks.concat(task) }, { merge: true });
	};

	const deleteTask = async (userName, index) => {
		const userTasks = (await getUser(userName)).tasks;
		await database
			.collection('users')
			.doc(userName)
			.set(
				{ tasks: userTasks.filter((_t, i) => i !== index) },
				{ merge: true }
			);
	};

	return {
		getUsers,
		getUser,
		createUser,
		login,
		addTask,
		deleteTask,
	};
})();

export default Firebase;

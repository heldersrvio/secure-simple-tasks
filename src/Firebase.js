import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Firebase = (() => {
	const firebaseConfig = {
		apiKey: 'AIzaSyBWkRBU1UeQsmoV2Ef8_ZUa34TIObUMeOE',
		authDomain: 'simple-tasks-5d0fc.firebaseapp.com',
		projectId: 'simple-tasks-5d0fc',
		storageBucket: 'simple-tasks-5d0fc.appspot.com',
		messagingSenderId: '820423957853',
		appId: '1:820423957853:web:37e19e6a8a65999c561cb4',
	};

	firebase.initializeApp(firebaseConfig);
	const database = firebase.firestore();

	const getUsers = async () => {
		return (await database.collection('users').get()).docs.map((doc) => {
			return {
				...doc.data(),
			};
		});
	};

	const getUser = async () => {
		const userUID = firebase.auth().currentUser.uid;
		if (userUID !== null && userUID !== undefined) {
			const userDoc = await database.collection('users').doc(userUID).get();
			if (userDoc.exists) {
				return {
					...userDoc.data(),
				};
			}
		}
		throw new Error('Username does not exist');
	};

	const createUser = async (userName, name, email, password) => {
		try {
			const userCredential = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			await database
				.collection('users')
				.doc(userCredential.user.uid)
				.set({ userName, name, email, tasks: [] });
			return true;
		} catch (_error) {
			return false;
		}
	};

	const login = async (email, password) => {
		try {
			const userCredential = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			return userCredential.user.uid;
		} catch (_error) {
			return false;
		}
	};

	const logout = async () => {
		await firebase.auth().signOut();
	};

	const addTask = async (userUID, task) => {
		const userTasks = (await getUser(userUID)).tasks;
		await database
			.collection('users')
			.doc(userUID)
			.set({ tasks: userTasks.concat(task) }, { merge: true });
	};

	const deleteTask = async (userUID, index) => {
		const userTasks = (await getUser(userUID)).tasks;
		await database
			.collection('users')
			.doc(userUID)
			.set(
				{ tasks: userTasks.filter((_t, i) => i !== index) },
				{ merge: true }
			);
	};

	const getUserRole = async (userUID) => {
		try {
			return (await database.collection('roles').doc('admin').get()).data()
				.user === userUID
				? 'admin'
				: 'user';
		} catch {
			return 'user';
		}
	};

	return {
		getUsers,
		getUser,
		createUser,
		login,
		logout,
		addTask,
		deleteTask,
		getUserRole,
	};
})();

export default Firebase;

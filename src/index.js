import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	fas,
	faPlusCircle,
	faTrashAlt,
	faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

library.add(fas, faPlusCircle, faTrashAlt, faArrowLeft);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

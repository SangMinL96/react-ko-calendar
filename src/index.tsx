import ReactDOM from 'react-dom/client';
import App from './Calendar';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<App
		tileContent={(date) => {
			return <div>test</div>;
		}}
	/>,
);

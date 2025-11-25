// React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Styles
import './index.css'

// Components
import App from './App.jsx'

// Redux
import { Provider } from 'react-redux'
import store from './store/store'

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)

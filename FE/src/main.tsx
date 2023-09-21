import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux"
import persistor, { store } from './app/store.ts'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>

)

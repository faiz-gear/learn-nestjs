import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SWRConfig } from 'swr'
import axios from 'axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)
axios.defaults.baseURL = 'http://localhost:3000'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
)

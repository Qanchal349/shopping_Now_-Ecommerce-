import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './components/redux/store'
import {Provider as ReduxProvider} from "react-redux" 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <ReduxProvider store={store} >
       <App />
    </ReduxProvider>
 
);



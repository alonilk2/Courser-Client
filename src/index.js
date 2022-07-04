import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import SignIn from './Views/SignInView';
import SignUp from './Views/SignUpView';
import {history} from './history';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>  
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/SignIn" component={SignIn} />
                    <Route path="/SignUp" component={SignUp} />                                    
                    <Redirect from="*" to="/404" />
                </Switch>
            </Router>    
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
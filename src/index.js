import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './store/configure_store' 
import ReduxToastr from 'react-redux-toastr'
import { destroySession } from './resources/resources'
////////////////
import './css/style'
import Auth from './components/Auth';
import Register from './components/Register';
import Tasks from './components/Tasks';
import EditTasks from './components/Edit_tasks';
import SignIn from './components/Sign_in';
////////////////
const middleware = routerMiddleware(browserHistory);
const store = configureStore(null, middleware);

const history = syncHistoryWithStore(browserHistory, store);

function requireAuth(component) {
  // if (localStorage.getItem('user_token'))
  //   return component
  // else return SignIn
  return component
}

///////////////
ReactDOM.render(
  <Provider store={store}>
  <div>
    <ReduxToastr
      timeOut={3000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
    {localStorage.getItem('user_token') != '' ?
       <button className='btn btn-info log-out' onClick={() => {
        destroySession({user_token: localStorage.getItem('user_token')})
        localStorage.setItem('user_token', '')
        location.pathname = '/'
      }}>Log Out</button> : null
    }
    <Router history={history}>
      <Route path="/" component={Auth} />
      <Route path="/register" component={Register} />
      <Route path="/tasks" component={requireAuth(Tasks)} />
      <Route path="/edit/:id" component={requireAuth(EditTasks)}/>
      <Route path="/new" component={requireAuth(EditTasks)} />
      <Route path="/sign_in" component={SignIn} />
      <Route path="*" component={Auth} />
    </Router>
  </div>
  </Provider>
, document.getElementById('app'));

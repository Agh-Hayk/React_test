import ToDo from './components/pages/ToDo/ToDo'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About/About'
import Contact from './components/pages/Contact/Contact'
import NotFound from './components/pages/NotFound/NotFound'
import NavMenu from './components/NavMenu/NavMenu'
import SingleTask from './components/pages/SingleTask/SingleTask'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavMenu />
        <Switch>
          <Route 
            path='/'
            component={ToDo}
            exact={true}
          />
          <Route 
            path='/home'
            component={ToDo}
            exact={true}
          />
          <Route 
            path='/about'
            component={About}
            exact={true}
          />
          <Route 
            path='/contact'
            component={Contact}
            exact={true}
          />
          <Route 
            path='/task'
            component={SingleTask}
            exact={true}
          />
          <Route 
            path='/not-found'
            component={NotFound}
            exact={true}
          />
          <Redirect to='not-found'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

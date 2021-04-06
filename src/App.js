import ToDo from './components/pages/ToDo/ToDo'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/About/About'
import Contact from './components/pages/Contact/Contact'
import NotFound from './components/pages/NotFound/NotFound'
import NavMenu from './components/NavMenu/NavMenu'
import SingleTask from './components/pages/SingleTask/SingleTask'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Spinner from './components/Spinner/Spinner'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';

function App({loading, successMassage, errorMassage}) {

  // toast('success')

  useEffect(()=>{
    if(successMassage){
      toast.success(successMassage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    }

    if(errorMassage){
      toast.error(errorMassage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        });
    }

  },[successMassage, errorMassage])
 
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
            path='/task/:taskId'
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
      {loading && <Spinner />} 
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      successMassage:state.successMassage,
      errorMassage:state.errorMassage
  }
}

export default connect(mapStateToProps)(App);

import React, { Component } from 'react';
import Users from './components/users'
import Navbar from './components/navbar';
import { Route, Routes, redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import User from './components/user';
import Not_found from './components/not-found';
import Dashboard from './components/dashboard';
import Logout from './components/logout';

class App extends Component {
    state = {
        user:null
     } 


     componentDidMount(){
        const token = localStorage.getItem('token');
        if(!token){
            this.setState({user:null})
            return;
        }
        // const result = await axios.get('https://reqres.in/api/userbytoken',{token})
        const response = {
            data:{
                user:{
                    first_name :'amir',
                    last_name:'khodabande',
                    email:'aaaa@yahoo.com'
                }
            }
        };
        if(!response.data.user){
            this.setState({user:null});
            return;
        }

       this.setState({user:response.data.user})
     }


    render() { 
        return (
        <>
        <Navbar user={this.state.user} />
        <div className='container mt-3'>
            <Routes>
             <Route path='/users/:id' Component={User} />
             <Route path='/users' Component={Users} />
             <Route path='/login' Component={Login} />
             <Route path='/logout' Component={Logout} />
             <Route path='/not-found' Component={Not_found} />
             <Route path='/register' Component={Register} />
             <Route path='/dashboard' Component={Dashboard} />
             <Route path='/' Component={Home} />
             <Route path='*' 
              element={<Not_found />} />
            </Routes>
           
        </div>
        </>
        );
    }
}
 
export default App;
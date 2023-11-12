import React, { Component } from 'react';
import axios from 'axios';
import LoadingUsers from './loading/loadingUsers';
import { Link } from 'react-router-dom';

class Users extends Component {
    state = {
        users :[],
        isLoading : true,
      } 

async componentDidMount(){
    const response = await axios.get('https://reqres.in/api/users?page=2')
    console.log(response)
    setTimeout(() => {
        this.setState({users : response.data.data, isLoading : false });
    }, 3000);
    }
 
    render(){

        return(
            <>
            <button onClick={this.handleCreate} className="btn btn-lg btn-primary">Create</button>
            <div className="row">
               {
                this.state.isLoading ? (
                    <LoadingUsers />
                ) : ( this.state.users.map((user)=>{
                            return(
                                <div className="col-4 text-center p-5">
                                    <img src={user.avatar} style={{borderRadius:'50%', width:'50%'}} alt="" />
                                    <Link to={`/users/${user.id}`}><h4>{user.first_name}{user.last_name}</h4></Link>
                                    <h5>{user.email}</h5>
                                    <div className="row">
                                        <div className="col-6">
                                            <button onClick={this.handleUpdate} className="btn btn-info btn-sm">Update</button>
                                        </div>
                                        <div className="col-6">
                                            <button onClick={this.handleDelete} className="btn btn-danger btn-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                )
               }
            </div>
            </>
           

        );
    } 

    handleCreate = async () => {
        const newUser = {
            first_name : "Amirmohammad",
            last_name :"khodabande",
            email : "amii_mhmd@yahoo.com",
            avatar : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnordic.ign.com%2Favatar-generations&psig=AOvVaw2GOrsd_IANzJIzHGhBCDZj&ust=1697875427801000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCOjdyIGVhIIDFQAAAAAdAAAAABAD"
   };
     const response = await axios.post('https://reqres.in/api/users?page=2',newUser);
     console.log(response)
     this.setState({users : [...this.state.users,newUser]});
    };

    handleUpdate = async (user) => {
      user.first_name = 'updated';
      const response = await axios.put(`https://reqres.in/api/users?page=2/${user.id}`,user);
      console.log(response)
      const updatedUsers = [...this.state.users];
      const index = updatedUsers.indexOf(user);
      updatedUsers[index] = {...user};
      this.setState({users : updatedUsers}); 
    };

    handleDelete= async(user)=>{
       const response = await axios.delete(`https://reqres.in/api/users?page=2${user.id}`)
       const newUsers = this.state.users.filter(u=> u.id !== user.id);
       this.setState({users:newUsers});
    };
}
        
            
    
export default Users;
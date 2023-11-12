import { useState, useEffect } from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";


const User = () => {
    
const [user, setUser] = useState({});
const {id} = useParams();
const Navigate = useNavigate();
console.log(queryString.parse(useLocation().search))

useEffect(() => {
    const fetchData = async () => {
        
            const response = await axios.get(`https://reqres.in/api/users/${id}`);
            setUser(response.data.data);
         
    };

    fetchData();
}, [id]); 

    return ( 
        <>
    <img src={user.avatar} style={{borderRadius:'50%', width:'10%' ,height:'10%'}} alt="" />
    <h4>{user.first_name}{user.last_name}</h4>
    <h5>{user.email}</h5>
    <button onClick={()=> Navigate('/users')} className="btn btn-info mt-3">users</button>
    </>
     );

}
 
export default User;
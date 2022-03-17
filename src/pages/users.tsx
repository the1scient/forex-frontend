import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Users.css';

var data = require('../settings.json');
let backEndHost = data['backendhost'];

export function Users() {

    
    const [users, setUsers] = useState<any[]>( [] );
  
    useEffect(() => {
      const fetchUsers = async () => {

        const response = await fetch(`${backEndHost}users`);
        const usersData = await response.json();
        setUsers(usersData);
      };
      fetchUsers();
    }, []);
  
  const useDatas = users.map((user)=> {
      return <tr>
          <td className="col-md-4"><Link to={`/user/` + user._id}>{user._id}</Link></td>
                <td className="col-md-6">{user.name}</td>
                 <td className="col-md-4">{user.password}</td>
                <td className="col-md-2">{user.age}</td>

            </tr>
    });
  
    return (
      <div className="container">
       
        <div className="col-xl-12">
            <table>
        <thead>
            <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Password</th>
                <th>Age</th>
            </tr>
        
            </thead>

            <tbody>
            {users && useDatas}
            </tbody>
          
            </table>


        </div>

        

        </div>
    );
}




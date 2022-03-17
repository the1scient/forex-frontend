import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/Users.css';

let backEndHost = 'http://35.198.44.247:9000';

export function Users() {

    
    const [users, setUsers] = useState<any[]>( [] );
  
    useEffect(() => {
      const fetchUsers = async () => {

        const response = await fetch(`${backEndHost}/users`);
        const usersData = await response.json();
        setUsers(usersData);
      };
      fetchUsers();
    }, []);
  
  const useDatas = users.map((user)=> {
      return <tr>
                <td>{user.name}</td>
                <td>{user.age}</td>
            </tr>
           

     
      
  
    })
  
    return (
      <div className="container">
       
        <div className="col-xl-12">
            <table>
        <thead>
            <tr>
                <th>Name</th>
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




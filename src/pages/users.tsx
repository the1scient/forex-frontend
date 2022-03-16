import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';


function Users() {

    
    const [users, setUsers] = useState<any[]>( [] );
  
    useEffect(() => {
      const fetchUsers = async () => {

        const response = await fetch('http://localhost:9000/users');
        const usersData = await response.json();
        setUsers(usersData);
      };
      fetchUsers();
    }, []);
  
  const useDatas = users.map((user)=> {
      return <table>

            <tr>
                <th>Name</th>
                <th>Age</th>
            </tr>
            <tr>
                <td>{user.name}</td>
                <td>{user.age}</td>
            </tr>

             </table>
      
  
    })
  
    return (
      <div>
       
        <div className="container">
            {users && useDatas}
        </div>
        </div>
    );
}



export default Users;
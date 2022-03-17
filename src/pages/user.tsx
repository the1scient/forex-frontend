import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'

var data = require('../settings.json');
let backEndHost = data['backendhost'];

type RoomParams = {
    id: string;
}


export function User() {
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [user, setUser] = useState<any[]>( [] );

    useEffect(() => {
        const fetchUser = async () => {

            const response = await fetch(`${backEndHost}user/${params.id}`);
            const userData = await response.json();
            setUser(userData);
            console.log(userData);
        };
        fetchUser();

    }, []);


const useDatas: any = user;



  return (
      <div className="container">
          <div className="row"> <h6>User ID: {params.id}  </h6>
              <h5>{useDatas.name}</h5>
          </div>

      </div>
  );

}


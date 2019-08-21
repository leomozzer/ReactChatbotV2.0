import React, {useState, useEffect} from 'react';
import api from '../../services/api';

export default function Monitor() {
    const [delay, setDelay] = useState(false);
    useEffect( ()=> {
      console.log('entrou no delay')
      getChats();
      delayFunc();
      // eslint-disable-next-line
    }, [delay])
    async function getChats(){
      const response = await api.get('openChats');
      console.log(response.data)
    }
    function delayFunc(){
      setTimeout(()=> {
        if(delay === true){
          setDelay(false)
        }
        else{
          setDelay(true)
        }
      }, 60000)
    }
    return (
      <div>
        <h1>Monitor</h1>
      </div>
    );
}

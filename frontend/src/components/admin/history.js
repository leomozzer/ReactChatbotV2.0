import React, {useEffect} from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default function History() {
    useEffect( ()=> {
      console.log('entrou no delay History')
      getChats();
      // eslint-disable-next-line
    },[])
    async function getChats(){
      const response = await api.get('history');
      console.log(response.data)
    }
    return (
        <div><h1>History</h1></div>
    );
}

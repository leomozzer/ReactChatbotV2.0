import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { InputGroup, Input, InputGroupAddon, Button} from 'reactstrap'
import io from 'socket.io-client';

export default function ChatSendMessage() {
    const [infoConversation, setInfo] = useState({
        sessionId : '',
        info : {},
    });
    useEffect( ()=> {
        console.log('ola')
        registerToSocket();
        // eslint-disable-next-line
    },[])
    function handleSubmit(e){
        e.preventDefault();
        console.log(infoConversation.sessionId)
        api.post('/chat/message', {
            sessionId : infoConversation.sessionId,
            message: e.currentTarget.input.value,
            info: infoConversation.info
        })
        e.currentTarget.input.value = '';
        return;
    }
    function registerToSocket(){
        const socket = io('http://localhost:8000');
        socket.on('start', response => {
            setInfo({...infoConversation, sessionId : response.sessionId, info : response})
        })
        socket.on('newMessage', response => {
            setInfo({...infoConversation, sessionId : response.sessionId, info : response})
        })
        socket.on('newSessionId', response => {
            // setInfo({...infoConversation, sessionId: response})
            updateConversation('newSessionId', response)
        })
    }
    async function updateConversation(type, data){
        if(type === 'newSessionId'){
            // const response = await api.get('openChats')
            // for(let i = 0; i < response.data.length; i++){
            //     if(response.data[i].sessionId === data){
            //         setInfo({...infoConversation, sessionId : data, info : response.data[i]})
            //     }
            // }
            await setTimeout( async ()=> {
                const response = await api.get('openChats')
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].sessionId === data){
                        setInfo({...infoConversation, sessionId : data, info : response.data[i]})
                    }
                }
            }, 1500);
        }
    }
    return (
        <div className='chatSendMessage'>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <InputGroup>
                    <Input name="input" placeholder="Ex: turn on the lights"/>
                    <InputGroupAddon addonType='append'>
                        <Button>Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </div>
    );
}

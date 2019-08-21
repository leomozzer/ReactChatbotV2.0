import React, {useEffect, useState} from 'react';
import { Alert } from 'reactstrap'
import api from '../../services/api';
import io from 'socket.io-client';

export default function ChatMessages() {
    const [history, setHistory] = useState({
        messages : []
    })
    // scrollBottom();
    useEffect( ()=> {
        registerToSocket();//usar para receber novas mensagens
        startChat();
        // eslint-disable-next-line
    },[])
    async function startChat(){
        const response = await api.get('chat/start');
        console.log(response.data)
        setHistory({...history, messages : response.data.messages})
        api.post('openChats', response.data);
    }

    function registerToSocket(){
        const socket = io('http://localhost:8000')
        socket.on('newMessage', newMessage => {
            console.log(newMessage)
            setHistory({...history, messages : newMessage.messages})
        })
        socket.on('newSessionId', response => {
            updateConversation('newSessionId', response)
        })
    }
    async function updateConversation(type, data){
        console.log(data)
        // if(type === 'newSessionId'){
        //     const response = await api.get('openChats')
        //     for(let i = 0; i < response.data.length; i++){
        //         if(response.data[i].sessionId == data){
        //             setHistory({...history, messages : response.data[i].messages})
        //         }
        //     }
        // }
        if(type === 'newSessionId'){
            await setTimeout( async ()=> {
                const response = await api.get('openChats')
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].sessionId === data){
                        setHistory({...history, messages : response.data[i].messages})
                    }
                }
            }, 1500);
        }
    }
    return (
        <div className='chatMessages'>
            {history.messages.map((msg, i) => (
                <div key={i}>
                    {msg.emissor === "User" && 
                        <div className='user'>
                            <span className='userMessage'>
                                <Alert color="light">
                                    <span className='messageHeader'>User</span>
                                    {/* <span className='userDate'>{msg.dataHoraMensagem.slice(10, 18)}</span> */}
                                    <br/>
                                    {msg.text}
                                </Alert>
                            </span>
                        </div>}
                    {msg.emissor === "Bot" && 
                        <div className='bot'>
                                <span className='botMessage'>
                                    <Alert color="info">
                                        <span className='messageHeader'>Bot</span>
                                        {/* <span className='botDate'>{msg.dataHoraMensagem.slice(10, 18)}</span> */}
                                        <br/>
                                        {msg.text}
                                        {msg.fileName && 
                                            <div>
                                                {msg.path === "images" && <img src={`http://localhost:8000/${msg.path}/${msg.fileName}`} alt=''/> }
                                                {msg.path === "pdf" && <a href={`http://localhost:8000/download/${msg.path}/${msg.fileName}`}>{msg.fileName}</a>}
                                            </div>
                                        }
                                    </Alert>
                                </span>
                        </div>}
                </div>
            ))}
        </div>
    );
}

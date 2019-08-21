import React from 'react';
import './styles.css'
import ChatHeader from './ChatHeader'
import ChatSendMessage from './ChatSendMessage';
import ChatMessages from './ChatMessages';

// import { Container } from './styles';

export default function Chat() {
  return (
    <div className='content'>
        <ChatHeader/>
        <ChatMessages/>
        <ChatSendMessage/>
    </div>
  );
}

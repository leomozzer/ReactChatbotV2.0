import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Chat from '../chat/Chat'
import Monitor from '../admin/monitor'
import History from '../admin/history'
// import { Container } from './styles';

export default function AppRoutes() {
  return (
    <Switch>
        <Route exact path="/" component={Chat}/>
        <Route path="/monitor" component={Monitor}/>
        <Route path="/history" component={History}/>
    </Switch>
  );
}

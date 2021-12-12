import React, { useEffect } from 'react';
import './MessagesPage.css';
import Chat from '../../components/Messages/Chat';
import Contacts from '../../components/Messages/Contacts';
import { useSelector, useDispatch } from 'react-redux';
import { getChats } from '../../redux/actions/chat';

function MessagesPage({ setActiveChat, activeChat, socket }) {
   document.title = `Travelog | Messages`;
   const dispatch = useDispatch();
   const chats = useSelector(state => state.chats);

   useEffect(() => {
      dispatch(getChats());
      // eslint-disable-next-line
   }, [])

   return (
      <div className="messages-page">
         <Contacts setActiveChat={setActiveChat} activeChat={activeChat} chats={chats} />
         <Chat socket={socket} activeChat={activeChat} chats={chats} />
      </div>
   )
}

export default MessagesPage;

import React, { useEffect } from 'react';
import './Messages.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Contacts({ setActiveChat, activeChat, chats }) {
   const auth = useSelector(state => state.auth?.existingUser);
   const history = useHistory();

   const contacts = [];
   for (let chat of chats) {
      for (let user of chat.users) {
         if (user.id !== auth._id) {
            contacts.push({ ...user, chatId: chat._id });
         }
      }
   }

   const { userId } = useParams();
   useEffect(() => {
      if (userId) {
         const contact = contacts.find(contact => contact.id === userId);
         setActiveChat(contact?.chatId);
      }
      // eslint-disable-next-line
   }, [contacts, userId])

   return (
      <div className="contacts">

         {contacts.map(contact => {
            return (
               <div
                  key={contact.id}
                  className={`contact ${activeChat === contact.chatId && 'active-contact'}`}
                  onClick={() => {
                     setActiveChat(contact.chatId);
                     history.push(`/messages/${contact.id}`)
                  }}
               >
                  <img src={contact.profileImg.url} alt="contact" />
                  <div className="contact-info">
                     <h4>{contact.fullName}</h4>
                     <p>@{contact.username}</p>
                  </div>
               </div>
            )
         })}

      </div>
   )
}

export default Contacts;
import React from 'react';
import './Messages.css';
import { useSelector } from 'react-redux';

function Contacts({ setActiveChat, activeChat, chats }) {
   const auth = useSelector(state => state.auth?.existingUser);

   const contacts = [];
   for (let chat of chats) {
      for (let user of chat.users) {
         if (user.id !== auth._id) {
            contacts.push({ ...user, chatId: chat._id });
         }
      }
   }

   return (
      <div className="contacts">

         {contacts.map(contact => {
            return (
               <div
                  key={contact.id}
                  className={`contact ${activeChat === contact.chatId && 'active-contact'}`}
                  onClick={() => setActiveChat(contact.chatId)}
               >
                  <img src={contact.profileImg.url} alt="contact" />
                  <div className="contact-info">
                     <h4>{contact.fullName}</h4>
                     <p>{contact.username}</p>
                  </div>
               </div>
            )
         })}

      </div>
   )
}

export default Contacts;
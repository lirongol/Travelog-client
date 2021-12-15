import React, { useEffect, useState, useRef } from 'react';
import './Messages.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendMsg, receiveMsg } from '../../redux/actions/chat';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import moment from 'moment';

function Chat({ activeChat, chats, socket }) {
   const dispatch = useDispatch();
   const [chat, setChat] = useState(null);
   const [contact, setContact] = useState(null);
   const [message, setMessage] = useState('');
   const [inputFocus, setInputFocus] = useState(false);

   const auth = useSelector(state => state.auth?.existingUser);
   const chatBody = useRef();

   useEffect(() => {
      setChat(chats.find(chat => chat._id === activeChat));
      // eslint-disable-next-line
   }, [activeChat, chats])

   useEffect(() => {
      setContact(chat?.users.find(user => user.id !== auth._id));
      chatBody.current.scrollTo(0, chatBody.current.scrollHeight);
      // eslint-disable-next-line
   }, [chat])

   const handleSendMsg = e => {
      e.preventDefault();
      if (message) {
         setChat({
            ...chat,
            messages: [
               ...chat.messages,
               {
                  confirmed: false,
                  text: message,
                  userId: auth._id,
                  _id: Math.random()
               }
            ]
         })
         dispatch(sendMsg(contact.id, message));
         socket.emit('send-message', contact.id, auth._id, message, chat._id);
         setMessage('');
      }
   }

   socket.off('receive-message').on('receive-message', (message, senderId, chatId) => {
      const newMessage = {
         confirmed: true,
         text: message,
         userId: senderId,
         _id: Math.random(),
         date: new Date()
      }
      dispatch(receiveMsg({ newMessage, chatId }));
   })

   return (
      <div className="chat">

         <div className="chat-header">

            {chat && <Link to={`/${contact?.username}`} className="link">
               <div className="active-chat-info">
                  <img src={contact?.profileImg?.url} alt="contact" />
                  <div className="contact-info-active">
                     <h4>{contact?.fullName}</h4>
                     <p>@{contact?.username}</p>
                  </div>
               </div>
            </Link>}

         </div>

         <div className="chat-body" ref={chatBody}>
            {chat ? <div>
               {
                  chat.messages.map(msg => {
                     if (msg.userId === auth._id) {
                        return (
                           <div key={msg._id} className="chat-message my-message">
                              <div className="message-body my-message-body">
                                 <div>{msg.text}</div>
                                 {msg.confirmed && <div className="msg-details">
                                    {moment(msg.date).format('LT')}
                                    <AiOutlineCheck />
                                 </div>}
                              </div>
                           </div>
                        )
                     } else {
                        return (
                           <div key={msg._id} className="chat-message">
                              <div className="message-body">
                                 <div>{msg.text}</div>
                                 {msg.confirmed && <div className="msg-details">
                                    {moment(msg.date).format('LT')}
                                 </div>}
                              </div>
                           </div>
                        )
                     }
                  })
               }
            </div>
            :
            <div className="default-chat">select a contact to open chat</div>   
            }
         </div>

         {chat && <div className="chat-footer">
            <form onSubmit={handleSendMsg}>
               <div className={`input-container ${inputFocus ? 'chat-input-focus' : 'chat-input-blur'}`}>
                  <input
                     type="text"
                     value={message}
                     placeholder="Text"
                     onChange={e => setMessage(e.target.value)}
                     onFocus={() => setInputFocus(true)}
                     onBlur={() => setInputFocus(false)}
                  />
               </div>
               <button className="btn btn-send-msg" type="submit">
                  <div>
                     <BiSend style={{display: 'flex'}} />
                  </div>
               </button>
            </form>
         </div>}
         
      </div>
   )
}

export default Chat;

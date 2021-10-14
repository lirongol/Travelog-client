import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login, register } from '../../redux/actions/auth';
import './AuthPage.css';
import logo from '../../images/travelog-logo.png';

function AuthPage() {
   const [loginData, setLoginData] = useState({ email: '', password: '' })
   const [registerData, setRegisterData] = useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordVerification: '',
   });
   const [authType, setAuthType] = useState(() => false);

   const dispatch = useDispatch();
   const history = useHistory();

   const handleLogin = e => {
      e.preventDefault();
      dispatch(login(loginData, history));
   }

   const handleRegister = e => {
      e.preventDefault();
      dispatch(register(registerData, history));
   }

   document.title = `Travelog | ${authType ? 'Register' : 'Login'}`;

   return (
      <div className="auth-page">

         <div className="auth-card">

            <div className="card-header">
               <h1 className="card-logo"><img src={logo} alt="logo" />Trave<span>Log.</span></h1>
               <h1>{authType ? 'Register' : 'Login'}</h1>
            </div>

            {!authType && <div className="login-form">
               <form className="login" onSubmit={handleLogin}>
                  <input
                     type="email"
                     placeholder="Email"
                     name="email"
                     value={loginData.email}
                     onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                  />

                  <input
                     type="password"
                     placeholder="Password"
                     name="password"
                     value={loginData.password}
                     onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  />

                  <button className="btn btn-auth" type="submit">Login</button>
               </form>

               <div className="auth-options">
                  <p onClick={() => setAuthType(true)}>Create new account</p>
                  <br/>
                  <p>Forgot password?</p>
               </div>
            </div>}

            {authType && <div className="register-form">
               <form className="register-form" onSubmit={handleRegister}>
                  <div className="full-name">
                     <input
                        required
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={registerData.firstName}
                        onChange={e => setRegisterData({ ...registerData, firstName: e.target.value })}
                     />
                     
                     <input
                        required
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={e => setRegisterData({ ...registerData, lastName: e.target.value })}
                     />
                  </div>

                  <input
                     required
                     type="text"
                     placeholder="Unique Username"
                     name="username"
                     value={registerData.username}
                     onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                  />
                  
                  <input
                     required
                     type="tel"
                     placeholder="Phone Number"
                     name="phoneNumber"
                     value={registerData.phoneNumber}
                     onChange={e => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
                  />

                  <input
                     required
                     type="email"
                     placeholder="Email"
                     name="email"
                     value={registerData.email}
                     onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                  />
                  
                  <input
                     required
                     type="password"
                     placeholder="Password"
                     name="password"
                     value={registerData.password}
                     onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  />
                  
                  <input
                     required
                     type="password"
                     placeholder="Verify Password"
                     name="passwordVerification"
                     value={registerData.passwordVerification}
                     onChange={e => setRegisterData({ ...registerData, passwordVerification: e.target.value })}
                  />
                  
                  <button className="btn btn-auth" type="submit">Register</button>
               </form>

               <div className="auth-options">
                  <p onClick={() => setAuthType(false)}>Have an account? Login</p>
               </div>
            </div>}

         </div>

      </div>
   )
};

export default AuthPage;

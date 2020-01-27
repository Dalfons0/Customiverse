import React from 'react';
import LoginForm from '../components/login-form';

export default function Login() {
  const login = () => localStorage.setItem('token', 'Bearer 73b8d0bf20be022d0c93cab76f2ab846');
  
  return <LoginForm login={login} />;
}

import React from 'react'
import SignInSidebar from './containers/sideBar/SignInSideBar';
import SignUpSidebar from './containers/sideBar/SignUpSideBar';
import HeroImg from './containers/heroImg/HeroImg';
import './auth.css';

function Auth({ type = '' }) {
  return (
    <div className='login-container'>
		<div className='login-wrapper'>
			{type === 'signUp' ? <SignUpSidebar /> : <SignInSidebar />}
			<HeroImg type={type} />
		</div>
	</div>
  )
}

export default Auth
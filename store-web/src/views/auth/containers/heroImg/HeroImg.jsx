import React from 'react'
import './heroImg.css';


function Title({ text1 = '', text2 = '' }) {
    return (
        <div className='heroImg-container'>
		<h1>
			{text1} <br />
			{text2}
		</h1>
	</div>
    )
  }

function HeroImg({ type = '' }) {
    if (type === 'signUp') {
		return <Title text1='Join The' text2='Team' />;
	}
	if (type === 'signIn') {
		return <Title text1='Access' />;
	}
	return <Title text1='Welcome' />;
}

export default HeroImg
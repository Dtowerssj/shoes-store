import React from 'react'
import './input.css';

function Input({ props, type, placeholder, innerRef, id, onChange, value }) {
  return (
    <div className='login-input-container'>
		<input
			className='login-input'
			placeholder={placeholder && placeholder}
			type={type || 'text'}
			id={id}
			ref={innerRef}
			onChange={onChange}
			value={value}
			required
			autoComplete='off'
		/>
	</div>
  )
}

export default Input
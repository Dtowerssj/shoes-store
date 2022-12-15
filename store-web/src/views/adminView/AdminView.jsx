import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Products from '../../components/products/Products'

function AdminView() {
  return (
    <div>
        <Navbar />
        <Products admin={true}/>
    </div>
  )
}

export default AdminView
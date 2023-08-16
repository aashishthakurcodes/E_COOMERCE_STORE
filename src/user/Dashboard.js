import React from 'react'
import Layout from '../Components/Layout/Layout'
import UserMenu from '../Components/Layout/UserMenu'
import { useAuth } from '../Context/auth'


const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"Dashboard E-Commerce"}>
      <div className='container-flui m-3 p-3'></div>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-5'>
            <div className='card w-75 p-3'>
          <h3>Name :-{auth?.user?.name}</h3>
          <h3>E-mail :-{auth?.user?.email}</h3>
          <h3>Phone :-{auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard
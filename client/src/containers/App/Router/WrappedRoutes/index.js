import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Layout from '../../../Layout/index'
import Task from '../../../Task'
// import Account from './Account'

export default () => (
  <div>
    <Layout />
    <div className='container__wrap'>
      <Route path='/tasks/:userId' component={Task} />
      <Redirect from='/tasks' to='/tasks/all' />
      {/* <Route path='/account' component={Account} /> */}
    </div>
  </div>
)

import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { UserList, EditUser } from '../components'
import { editUser } from '../actions'
import { connect } from 'react-redux'

const Users = ({ users, onEditUsers }) => (
  <Switch>
    <Route exact path='/users' render={() => <UserList users={users} />} />
    <Route path='/users/:id/edit' render=
      {
        ({ match: { params } }) =>
        <EditUser
          {...users.find(user => user.id === Number(params.id))}
          onSubmit={onEditUsers}
        />
      }
    />
  </Switch>
);

export default compose(
  withRouter,
  connect(
    ({ users }) => ({
      users
    }),
    (dispatch, { history }) => ({
      onEditUsers (user) {
        dispatch(editUser(user));
        history.push('/users')
      }
    })
  )
)(Users)
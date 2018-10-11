import React, { Component } from 'react';
import { createUser } from "../resources/resources";
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr'

class Register extends React.Component {
  constructor() {
    super()
    this.credentials = {
      email: ' ',
      password: ' ',
      first_name: '',
      last_name: ''
    }
  }

  signUp() {
    console.log(this.credentials)
    createUser({user: this.credentials})
    .then(res => {
      toastr.success(res.data.message)
      this.props.dispatch(push('sign_in'))
    })
    .catch(err => {
      toastr.error(err.response.data.error)
    })
  }

  render() {
    return (
      <form className="login">
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <div className='form-group'>
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required onChange={(e) => {this.credentials.email = e.target.value}}/>
          </div>
          <div className='form-group'>
            <label htmlFor="first_name"><b>First Name</b></label>
            <input type="text" placeholder="Enter your first name" name="first_name" required  onChange={(e) => {this.credentials.first_name = e.target.value}}/>
          </div>
          <div className='form-group'>
            <label htmlFor="last_name"><b>Last Name</b></label>
            <input type="text" placeholder="Enter your last name" name="last_name" required onChange={(e) => {this.credentials.last_name = e.target.value}}/>
          </div>
          <div className='form-group'>
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => {this.credentials.password = e.target.value}}/>
          </div>
          <button type="button" className="registerbtn" onClick={() => {this.signUp()}}>Register</button>
        </div>

        <div className="container signin">
          <p>Already have an account? <a href="sign_in">Sign in</a>.</p>
        </div>
      </form>
    )  
  }
}

export default connect()(Register);
import React, { Component } from 'react';
import {createSession} from '../resources/resources';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';

class SignIn extends React.Component {
  logIn() {
    console.log(this.email)
    console.log(this.password)
    createSession({email: this.email, password: this.password})
    .then(res => { 
      if ( res.status = 200) {
        localStorage.setItem('user_token', res.data.token)
          this.props.dispatch(push('tasks'))
      }
    })
    .catch(err => {
      if (err.response.status = 401) {
        alert('error')
      }
    })
  }

  render () {
    return (
    <form className="sign-in">
      <div className="imgcontainer">
        <center>
          <img src="https://www.mautic.org/media/images/default_avatar.png" alt="Avatar" className="avatar"/>
        </center>
      </div>

      <div className="container">
        <label htmlFor="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" required onChange={(e)=>{this.email=e.target.value}} />
      </div>
      <div className="container">
        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>{this.password=e.target.value}}/>
      </div>
      <div className="container">
        <button type="button" onClick={()=>{this.logIn()}}>Login</button>
      </div>  
      <div className="container create">
        <p>Do not have an account? <a href="login">Create</a>.</p>
      </div>
    </form>
      )
    }
  }
  
  export default connect()(SignIn);
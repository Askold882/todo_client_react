import React, { Component } from 'react';

class Register extends React.Component {
  render() {
    return (
      <form action="/action_page.php" className="login">
        <div className="container">
          <h1>Register</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <div className='form-group'>
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required />
          </div>
          <div className='form-group'>
            <label htmlFor="first_name"><b>First Name</b></label>
            <input type="text" placeholder="Enter your first name" name="first_name" required />
          </div>
          <div className='form-group'>
            <label htmlFor="last_name"><b>Last Name</b></label>
            <input type="text" placeholder="Enter your last name" name="last_name" required />
          </div>
          <div className='form-group'>
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />
          </div>
          <div className='form-group'>
            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="psw-repeat" required />
          </div>
          <button type="submit" className="registerbtn">Register</button>
        </div>

        <div className="container signin">
          <p>Already have an account? <a href="sign_in">Sign in</a>.</p>
        </div>
      </form>
    )  
  }
}

export default Register;
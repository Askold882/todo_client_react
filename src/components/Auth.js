import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkToken } from '../resources/resources'
import { push } from 'react-router-redux'

class Auth extends Component {
  componentDidMount(){
    if (localStorage.getItem('user_token')) {
      checkToken({user_token: localStorage.getItem('user_token')})
      .then(res => {
        if (res.status == 200)
          this.props.dispatch(push('tasks'))
      })
      .catch(err => { this.props.dispatch(push('sign_in')) })
    } else  this.props.dispatch(push('sign_in'))
  }
  render () {
    return (
      <div>
        <center><img src="https://loading.io/spinners/comets/lg.comet-spinner.gif" /></center>
      </div>
    ) 
  }
}

export default connect()(Auth);

//'UEpvKRjiTytMBPx6LqoxKZkh'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTask, updateTask, showTask } from '../resources/resources'
import { push } from 'react-router-redux';
import {toastr} from 'react-redux-toastr'

class EditTasks extends React.Component {
  constructor(){
    super()
    this.state = {
      title: ' ',
      description: ' ',
      priority: 0, 
      duedate: ' ',
      done: false,
      id: 0
    }
  }

  componentDidMount(){
    if(this.props.params.id){
      showTask({user_token: localStorage.getItem('user_token'), id: this.props.params.id})
      .then(res =>{
        this.props.dispatch({type: 'SHOW_TASK', data: res.data.task}) //useless
        this.setState({
          title: res.data.task.title,
          description: res.data.task.description,
          priority: res.data.task.priority,
          duedate: res.data.task.duedate.slice(0, 10),
          done: res.data.task.done,
          id: res.data.task.id
        })
      })
      .catch(err => {
        toastr.error("CAN NOT LOAD THE TASK")
      })
    }
  }

  createTask() {
    createTask({user_token: localStorage.getItem('user_token'), task: this.state})
    .then(res => {
      toastr.success('TASK CREATED')
      this.props.dispatch(push('tasks'))
    })
    .catch(err => {
      toastr.error(err.response.data.error)
    })
  }

  updateTask() {
    updateTask({user_token: localStorage.getItem('user_token'), task: this.state, id: this.state.id})
    .then(res => {
      toastr.success('UPDATED')
      this.props.dispatch(push('/tasks'))
    })
    .catch(err => {
      toastr.error(err.response.data.errors)
    })
  }

  doneTask() {
    
  }

  render() {
    var id = this.props.params.id
    return (
      <div className="bordered edit-task container">
        <form id="task-edit-form" >
          <div className="form-group">
            <label htmlFor='title'>Title</label>
            <input type="text" name="title" id="title" tabIndex="1" className="form-control" placeholder="Title" onChange={(e) => {this.setState({title: e.target.value})}} value={this.state.title}/>
          </div>
          <div className="form-group">
            <label htmlFor='description'>Description</label>
            <input type="text" name="description" id="description" tabIndex="2" className="form-control" placeholder="Description"  onChange={(e) => {this.setState({description: e.target.value})}} value={this.state.description}/>
          </div>
          <div className="form-group">
            <label htmlFor='duedate'>Duedate</label>
            <input type="date" name="duedate" id="duedate" tabIndex="3" className="form-control"  onChange={(e) => {this.setState({duedate: e.target.value})}} value={this.state.duedate}/>
          </div>
          <div className="form-group">
            <label htmlFor='priority'>Priority</label>
            <input type="number" name="priority" id="priority" tabIndex="4" className="form-control"  onChange={(e) => {this.setState({priority: e.target.value})}} value={this.state.priority} />
          </div>
          <div className="form-group">
            <center><label htmlFor='done'>Done?</label>
            <input type="checkbox" name="done" id="done" tabIndex="5" className="form-control"  onChange={(e) => {this.setState({done: e.target.checked})}} checked={this.state.done}/>
            </center>
          </div>
          <div className='form-group'>
            <input type='button' className="btn btn-info" name="task-submit" id="task-submit" onClick={() => {id? this.updateTask() : this.createTask()}}  tabIndex="4" value={id? "Update": "Create"}/>
          </div>
        </form>
      </div>
    )
  }
}
EditTasks.propTypes = {
  tasks: React.PropTypes.array,
}

function mapState(state) {
  return {
    task: state.reducers.task
  }
}
export default connect(mapState)(EditTasks);
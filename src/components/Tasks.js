import React, { Component } from 'react';
import { indexTasks, destroyTasks, updateTask } from '../resources/resources';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import  $  from 'jquery';

class Tasks extends React.Component {
  constructor(){
    super()
    this.checked = []
  }

  componentDidMount(){
    this.getTasks()
  }

  getTasks() {
    indexTasks({user_token: localStorage.getItem('user_token')})
    .then(res => {
      this.props.dispatch({type: 'GET_TASKS', data: res.data.tasks})
    })
    .catch(error => {
      this.props.dispatch(push('sign_in'))
    })
  }

  sortTasks() {
    indexTasks({user_token: localStorage.getItem('user_token'), order: 'asc'})
    .then(res => {
      this.props.dispatch({type: 'GET_TASKS', data: res.data.tasks})
    })
    .catch(error => {})
  }

  deleteTask(id) {
   console.log('DELETING ', id)
   destroyTasks({user_token: localStorage.getItem('user_token'), id: id})
    .then(res => {
      this.props.dispatch({type: 'DELETE_TASK', data: id})
    })
    .catch(error => {
      console.log(error)
    })
  } 
  deleteMarked() {
    console.log('DELETING ', this.checked)
    this.props.dispatch({type: 'DELETE_TASKS', data: this.checked})
    destroyTasks({user_token: localStorage.getItem('user_token'), id: 0, batch: this.checked})
     .then(res => {
      this.checked = []
     })
     .catch(error => {
       console.log(error)
     })
   } 

  AllChecked() {
    $(':checkbox').map ((key, item) => {
      $(item).prop("checked", true)
    })
    var checked = []
    this.props.tasks.map(t => {checked.push(t.id)})
    this.checked = checked
    console.log(this.checked)
  }

  AllUnchecked() {
    $(':checkbox').map ((key, item) => {
      $(item).prop("checked", false)
    })
    this.checked = []
  }

  markTask(task) {
    var done = !task.done
    updateTask({user_token: localStorage.getItem('user_token'), task: {done: done}, id: task.id})
    .then(res => {
      this.getTasks()
    })
    .catch(err => {})
  }
//////////

//////////
  showTasks(done) {
    const tasks = this.props.tasks
    var list = []
    tasks.map((task) => {
      if(task.done == done){
        list.push(
          <li key={task.id}>
            <div className='row tasks-list'>
              <input type='checkbox' className='col-md-1'  onClick={()=> {
                this.checked.includes(task.id)? this.checked.splice(this.checked.indexOf(task.id), 1) : this.checked.push(task.id)
              }}/>
              <a href={'edit/' + task.id} className='col-md-2'>{task.title}</a>
              <div className='col-md-5'>{task.priority}</div>
              <div className='hiden col-md-4'>
                <button className='btn btn-info' onClick={()=> {this.markTask(task)}}>{done? 'Make active' : 'Make done'}</button>
                <a href={'edit/' + task.id}><button className='btn btn-info'>EDIT</button></a>
                <button className='btn btn-danger' onClick={()=> {this.deleteTask(task.id)}}>DELETE</button>
              </div>
            </div>
          </li>
          )
      }
    })
    return list
  }
  
  render(){
    return(
    <div>
      <div className="btn-group"> 
        <button type="button" className="btn btn-primary" onClick={() => {this.AllChecked()}} >Mark all</button>
        <button type="button" className="btn btn-primary" onClick={() => {this.AllUnchecked()}}>Unmark all</button>
        <button type="button" className="btn btn-danger" onClick={() => {this.deleteMarked()}}>Delete marked</button>
        <a> <button type="button" className="btn btn-primary" onClick={() => {this.sortTasks()}}>Sort</button> </a>
        <a  href={'/new'}><button type="button" className="btn btn-success">New</button> </a>
      </div>
  
       <div className="tasks">
       <h2 className="header_list">My To Do List</h2>
       
       {this.props.tasks?
        <div>
          <ul className="myUL" >
            { this.showTasks(false) }
          </ul>
          <hr className='hr-line'></hr>
          <ul className="myUL" >
            { this.showTasks(true) }
          </ul>
        </div>
        :null
      }
      </div> 
    </div>   
    )
  }
  
}

Tasks.propTypes = {
  tasks: React.PropTypes.array,
}

function mapStateToProps(state) {
  return {
    tasks: state.reducers.tasks
  }
}

export default connect(mapStateToProps)(Tasks);
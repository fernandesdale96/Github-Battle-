import React, {Component} from 'react';
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import classnames from 'classnames'


class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  changeHandler = (event) => {
    var value = event.target.value
    //console.log(value);
    this.setState(() => {
      return{
        username: value
      }
    })
  }


  render(){
    return(
      <div className="form-container">
        <form className="column" onSubmit={this.submitHandler}>
          <label className='header' htmlFor='username'>
            {this.props.label}
          </label>
          <input
            id='username'
            className={classnames('form-control')}
            placeholder='github username'
            type='text'
            autoComplete='off'
            value = {this.state.username}
            onChange={this.changeHandler}/>
          <button
            className={classnames('button', 'btn-primary','active')}
            type='submit'
            disabled={!this.state.username}>
                Submit
          </button>
        </form>
      </div>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default PlayerInput;

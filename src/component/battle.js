import React, {Component} from 'react';
import PlayerInput from './player.js'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import classnames from 'classnames'
import { Link } from 'react-router-dom';

let PlayerInfo = (props) => {
  return(
    <div>
      <div className={classnames('column')}>
        <img src={props.image}
          alt={'Avatar for ' + props.username}
          className='avatar'/>
        <h2 className='username'>
            @{props.username}
        </h2>
        <button className={classnames('btn, btn-outline-danger')}
          onClick={props.onReset.bind(null, props.id)}>Reset</button>
      </div>
    </div>
  )
}

PlayerInfo.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

class Battle extends Component {
  constructor(props){
    super(props)
    this.state={
      playerOneName : '',
      playerTwoName : '',
      playerOneImage : null,
      playerTwoImage : null,
    }
  }

  resetHandler = (id) => {
    this.setState(() => {
      let newstate = {}
      newstate[id+'Name'] = '';
      newstate[id+'Image'] = null;
      return newstate;
    })
  }

  onFormSubmit = (id,username) =>{
    this.setState(() => {
      var new_state = {};
      new_state[id + 'Name'] = username;
      new_state[id + 'Image'] = `https://github.com/${username}.png?size=200`;
      return new_state;
    })
  }

  render(){
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;
    return(
      <div>
        <div className='row'>

          {!playerOneName &&
            <PlayerInput
            id = 'playerOne'
            label = 'Player One'
            onSubmit = {this.onFormSubmit}/>
          }

          {playerOneImage !== null &&
          <PlayerInfo
            id = 'playerOne'
            image = {playerOneImage}
            username = {playerOneName}
            onReset = {this.resetHandler}
          />}

          {!playerTwoName &&
            <PlayerInput
              id = 'playerTwo'
              label = 'Player Two'
              onSubmit = {this.onFormSubmit}/>
          }
          {playerTwoImage !== null &&
          <PlayerInfo
            id = 'playerTwo'
            image = {playerTwoImage}
            username = {playerTwoName}
            onReset = {this.resetHandler}
          />}

        </div>
        {playerOneImage && playerTwoImage &&
        <Link
          className={classnames('button','btn','btn-fight')}
          to={{
            pathname: `${match.url}/results`,
            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
          }}>
          Battle
        </Link>}
      </div>
    )
  }
}

export default Battle;

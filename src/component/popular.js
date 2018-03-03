import React, {Component} from 'react';
import PropTypes from 'prop-types';
import fetchPopularRepos from '../utils/api.js';


function SelectLanguage(props){
  var languages = ["All", "JavaScript","Ruby","Java","CSS","Python"];
  return(
    <ul className="languages">
      {languages.map((lang) => {
        return(
          <li
            style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null,lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
  </ul>)
}

function RepoGrid(props){
  return(
    <ul className="popular-list">
      {props.repos.map((repo,index) => {
        return(
          <li key={repo.name} className="popular-item">
            <div className='popular-rank'>#{index + 1 }</div>
            <ul className='space-list-items'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt='avatar'/>
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>
                @{repo.owner.login}
              </li>
              <li>
                {repo.stargazers_count} stars
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )

}


SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}


class Popular extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang){
    this.setState(function(){
      return{
        selectedLanguage: lang
      }
    });

    fetchPopularRepos(lang).then(function(repos) {
      console.log(repos)
      this.setState(function(){
        return{
          repos: repos
        }
      })
    }.bind(this))
  }

  render(){
    return(
      <div className="lang-container">
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}
        />
        {!this.state.repos
          ? <p>Loading...</p>
          : <RepoGrid repos = {this.state.repos}/>}
      </div>
    )

  }
};
export default Popular;

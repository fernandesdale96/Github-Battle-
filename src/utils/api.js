import Axios from 'axios'

function fetchPopularRepos(language){
  var url = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

  return Axios.get(url).then(function(response){
    return response.data.items
  });
}


export default fetchPopularRepos;

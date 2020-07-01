const url = 'https://api.github.com/users?since=1000000>; rel="next"';


function displayResults(responseJson, userHandle) {
  // if there are previous results, remove them
  $('#results').empty();
  console.log(userHandle);
  for (let i = 0; i < responseJson.length; i++) {
    if (userHandle === responseJson[i].login) {
      $('#results').append(
        `<li><h3><a href="${responseJson[i].repos_url}">${responseJson[i].login}</a></h3>
        <p>${responseJson[i].type}</p>
        </li>`
      );
    }
    else {
    }
  } 
  $('#results').removeClass('hidden');
};

function getRepos(userHandle) {
  console.log(userHandle);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, userHandle))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $('#js-search-handle').val();
    console.log(userHandle);
    getRepos(userHandle);
  });
}

$(watchForm);
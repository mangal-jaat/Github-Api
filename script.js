// html selectors define as variable
const form = document.querySelector(".form");
const search = document.querySelector(".search");
const submit = document.querySelector(".submit");
const result = document.querySelector(".git-result");

/// api url 
const endpoint = "https://api.github.com/users/";

// Get Github User 
const fetchGithub = async (query) => {
  try{
      const response = await fetch(endpoint + query)
      const data = await response.json();
      GenerateCard(data);
      GetRepository(query);
      GetFollowers(query);
  } catch(error){if (error.response.status == 404) {errorMsg("No user matches your search. Please check username again")}}
}
/// Get User Repository
const GetRepository = async (query) => {
  try {
  const response = await fetch(endpoint + query + "/repos?sort=created")
  const data = await response.json();
  createRepoElement(data);
 }catch(error){errorMsg("problem loading repositories")}
}
// get followers 
const GetFollowers = async (query) => {
  try{
      const response = await fetch(endpoint + query + "/followers")
      const data = await response.json();
      createFollowersEl(data);
  }catch(error){errorMsg("problem loading repositories")}
}


/// Make Github User Card
const GenerateCard = (data) => {
  // result.innerHTML = JSON.stringify(data)
   result.insertAdjacentHTML("beforeend",`
   <div class="card">

   <div class="row">
      <div class="profile" style="background-image: url(${data.avatar_url});background-size:cover;"><span class="type">${data.type}</span></div>
      <div class="basic-info">
         <h2 class="name">${data.name}</h2>
         <small class="username"><a href="${data.html_url}">@${data.login}</a></small>
         <small class="bio">${data.bio}</small>
       </div>
   </div>

   <div class="row">
   <div class="followers col">
       <span class="followers-count">${data.followers}</span>
       <span>Followers</span>
   </div>
   <div class="following col">
       <span class="following-count">${data.following}</span>
       <span>Following</span>
   </div>
   <div class="gists col">
       <span class="gist-count">${data.public_gists}</span>
       <span>Gists</span>
   </div>
   <div class="repo col">
       <span class="repo-count">${data.public_repos}</span>
       <span>Repo</span>
   </div>
  </div>
  <div class="row">
    <div class="followers-user">
    </div>
  </div>
   
  <div class="row">
    <div class="repository">
    </div>
   </div>

   </div>`)
}

// repository element
const createRepoElement = (repos) => {
	const reposEl = document.querySelector(".row .repository");
	repos.forEach((repo) => {
		reposEl.insertAdjacentHTML("beforeend",
      `<a href="${repo.html_url}">${repo.name}</a>`)
	});
}

const createFollowersEl = (follower) => {
    const followerEl = document.querySelector(".row .followers-user");
    follower.forEach((follow) => {
		followerEl.insertAdjacentHTML("beforeend",
      `<div class="user" data-name="${follow.login}" style="background-image: url(${follow.avatar_url});background-size:cover;"></div>`)
	});
}


// error messages
function errorMsg(message) {
	const errorCard = `
    <div>
        <p>${message}</p>
    </div>`;
	result.innerHTML = errorCard;
}

// Dom Content Loaded Show Item
fetchGithub(search.value)

search.addEventListener("keyup",function(e){
  result.innerHTML = "";
  e.preventDefault();
  const query = search.value;
  if(query){
      fetchGithub(query)
  }
})

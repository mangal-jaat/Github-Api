const form = document.querySelector(".form");
const search = document.querySelector(".search");

const FetchGit = async () => {
    const user = `https://api.github.com/users/${search.value}`;
    const reponse = await fetch(user);
    const data = await reponse.json();
    return data;
}
FetchGit().then(data => {printCard(data);})

const printCard = (data) => {
    var card = document.createElement("div");
    card.className = "card";
    $(card).append(`
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
        <span>Gists</span>
    </div>
   </div>
   `)
   const repo = `https://api.github.com/users/${search.value}/repos`
   $.getJSON(repo, function(json){
    repositories = json;   
    $.each(repositories, function(index) {
    $(card).append(`
    <div class="row">
     <div class="repository">
        <a href="${repositories[index].html_url}">${repositories[index].name}</a>
    </div>
    </div>`)    
    })  
   });
    $('.result').html(card);
}

$('.search').on('keyup', function(e){
    e.preventDefault();
    $(".result").empty();
    FetchGit().then(data => {printCard(data);})
})
/* or form submit
$('.form').on('submit', function(e){
    e.preventDefault();
    $(".result").empty();
    FetchGit().then(data => {printCard(data);})
})

let usersInfo = document.querySelector(".users")
let button = document.querySelector("button");
let serch = document.querySelector("input[type='search']");
let str = ''

function gitRepos(username){
 fetch(`https://api.github.com/users/${username}/repos`).then((data) => {
  console.log(data);
  let myData = data.json();
  if (data.status === 200){
    return myData
  }else{
    throw new Error("Enter Valid Gitub User Name")
  }
 }).then((myData) => {
  console.log(myData) 
  return myData
 }).then((myData) => {
  let reposData = myData[myData.length-1]['full_name']
  console.log(reposData);
  let ul = document.querySelectorAll(".links");
  ul = ul[ul.length-1]
  if(myData.length < 5){
    for(let i = 1;i<=myData.length;i++){
      str += `<li><a href="https://github.com/${username}/${myData[myData.length-i]['name']}">${myData[myData.length-i]['name']}</a></li>`
    }
  }else{
    str = `
    <li><a href="https://github.com/${username}/${myData[myData.length-1]['name']}" target="_blank">${myData[myData.length-1]['name']}</a></li>
    <li><a href="https://github.com/${username}/${myData[myData.length-2]['name']}" target="_blank">${myData[myData.length-2]['name']}</a></li>
    <li><a href="https://github.com/${username}/${myData[myData.length-3]['name']}" target="_blank">${myData[myData.length-3]['name']}</a></li>
    <li><a href="https://github.com/${username}/${myData[myData.length-4]['name']}" target="_blank">${myData[myData.length-4]['name']}</a></li>
    <li><a href="https://github.com/${username}/${myData[myData.length-5]['name']}" target="_blank">${myData[myData.length-5]['name']}</a></li>
    `
  }
  ul.innerHTML = str;
  console.log(ul)
  return str;
 }).catch((err) => {
  console.log(err);
 })
}

function gitInfo(myData){
  console.log(myData)
  let name = document.querySelectorAll(".name"); // get the name
  name = name[name.length-1];
  name.innerHTML = myData['name'];

  let follower = document.querySelectorAll(".fr"); // get the follower
  follower = follower[follower.length-1];
  follower.innerHTML = myData['followers'] + " Follower";

  let following = document.querySelectorAll(".fi"); // get the following
  following = following[following.length-1];
  following.innerHTML = myData['following'] + " Following";

  let bio = document.querySelectorAll(".bio"); // get the bio
  bio = bio[bio.length-1];
  bio.innerHTML = (myData['bio']) ? myData['bio'] :'Null';

  let repos = document.querySelectorAll(".re"); // get the repos
  repos = repos[repos.length-1];
  repos.innerHTML = myData['public_repos'] + " Repos";

  let img = document.querySelectorAll("img"); // get the repos
  img = img[img.length-1];
  img.src = myData['avatar_url'];
}




let inner = 
`
  <img src="" alt="">
  <div class="info">
  <h3 class="name"></h3>
  <p class="bio"></p>
  <div class="g-info"><p class='fr' ></p> <p class='fi'></p> <p class='re'></p></div>
  <div class="repos">
    <ul class="links">
    <li><a href="" target="_blank"></a></li>
    <li><a href="" target="_blank"></a></li>
    <li><a href="" target="_blank"></a></li>
    <li><a href="" target="_blank"></a></li>
    <li><a href="" target="_blank"></a></li> 
    </ul>
  </div>
  </div>
`

// Get the input field

// Execute a function when the user presses a key on the keyboard
serch.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.querySelector("button").click();
  }
});

button.onclick = async function(){
 if(serch.value == ""){
  console.log("kasjkljasd")
 }
 else{
  let element = document.createElement("li");
  usersInfo.appendChild(element)
  fetch(`https://api.github.com/users/${serch.value}`).then((data) => {
    console.log(data)
    let myData = data.json();
    if(data.status === 200){
      element.innerHTML = inner;
      return myData
    }
    else{
      throw new Error("Enter Valid Gitub UserName")
    }
  }).then((myData) => {
    gitInfo(myData);
    gitRepos(serch.value)
  }).catch((err) => {
    element.innerHTML = "Enter Valid Gitub UserName";
    element.style.padding = '10px'
  })
}
}
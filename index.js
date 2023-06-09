//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

btnsubmit.addEventListener("click",()=>{
    if(input.value !== ""){
        getUserData(url + input.value);
    }
});

input.addEventListener("input",()=>{
    noresults.style.display = "none";
})

input.addEventListener("keydown", e =>{
    if(e.key == "Enter"){
        if(input.value !== ""){
            getUserData(url + input.value);
        }
    }
}
// see if false nedded
,false
);

btnmode.addEventListener('click',()=>{
    if(darkMode == false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }


    
})

//functions

function getUserData(gitUrl){
    fetch(gitUrl)
     .then( response => response.json())
     .then( data => {
        updateProfile(data);
     })
     .catch( error =>{
        throw error;
     });
}

function getJoinedDate(doj){
    doj = doj.split("-")
    let dateForm = "Joined " + (doj[2].slice(0,2))+ " " + months[doj[1] - 1] + " " + doj[0];
    return dateForm
}

function updateProfile(data){
    if(data.message !== "Not Found"){
        noresults.style.display = "none";
        function checkNull(param1, param2){
            if(param1 === "" || param1 === null) {
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            }else{
                return true;
            }
        }
        avatar.src = `${data.avatar_url}`
        userName.innerText = data.name === null ? data.login : data.name
        user.innerText = `@${data.login}`
        user.href = `${data.html_url}`
        date.innerText = getJoinedDate(data.created_at);
        bio.innerText = data.bio == null ? "This profile has no bio" : data.bio
        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not available"
        page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
        page.href = checkNull(data.blog, page) ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        searchbar.classList.toggle("active");
    } else{
        noresults.style.display = "block"
    }
}


//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
  }
  
  //SWITCH TO LIGHT MODE - activateLightMode()
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
  }
  
  function init(){

    darkMode = false;

    const value = localStorage.getItem("dark-mode");

    if(value === null){
        localStorage.setItem("dark-item",darkMode);
        lightModeProperties();
    }
    else if (value == "true" ){
        darkModeProperties();
    }
    else if(value == "false"){
        lightModeProperties();
    }

    getUserData(url + "tanmayR18")
  }

  init()
const handleSearch = () => {
  const inputValue = document.getElementById("input-value").value;
  if (inputValue) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.title === "No Definitions Found") {
          alert(data.message);
        } else {
          displayResult(data);
        }
      });
  } else {
    alert("এই পাগল মেয়ে আগে word লিখো তারপর সার্চ করো This crazy girl first write word then search ok Aru pagli");
  }
};

const displayResult = (data) => {
  const parent = document.getElementById("audio-container");
  

  data[0].phonetics.forEach((element) => {
    const audio = document.createElement("audio");
    audio.src = element.audio;

    const button = document.createElement("button");
    button.innerHTML = "Play";
    button.onclick = () => {
    audio.play();
    };
    const container = document.createElement("div");
    container.appendChild(button);
    container.appendChild(audio);
    parent.appendChild(container);

    const inputValue = document.getElementById("input-value");
    inputValue.innerHTML = "";
  });
};


const loadGithubUsers = () => {
  fetch("https://api.github.com/users?per_page=10")
    .then((res) => res.json())
    .then((result) => {
      displayUser(result);
    });
};

const displayUser = (data) => {
  const parent = document.getElementById("user-cotnainer");
 
  

  data.forEach((user) => {
    fetch(user.followers_url)
      .then((res) => res.json())
      .then((data) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <img class="card-img" src=${user.avatar_url} alt="">
          <h4>${user.login}</h4>
          <div>FOllowers:
          <img class="card-imgf" src=${data[0].avatar_url} alt="">
          <img class="card-imgf" src=${data[1].avatar_url} alt="">
          </div>

          `;
        parent.appendChild(div);
      });
  });
};
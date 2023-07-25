const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const Btn = document.querySelector(".Btn");
const Joke = document.querySelector("#joke");

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

document.querySelector(".Btn").onclick = addTask;

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    saveData();
  }

  inputBox.value = "";
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

window.addEventListener("load", showTask);

const getDadJoke = async () => {
  const config = { headers: { Accept: "application/json" } };
  const res = await axios.get("https://icanhazdadjoke.com/", config);
  Joke.innerHTML = res.data.joke;
};

window.addEventListener("load", getDadJoke);
Joke.addEventListener("click", getDadJoke);

import {
  linkedin,
  github,
  email,
  game,
  help,
  aboutme,
  projects,
  aboutmeByYear
} from "./docs-cli.js";

const container = document.querySelector(".container");
const input = document.getElementById("prompt");
let previousCmds = []; // stack ds
let index = 1;
let selectedYear = 2025;

window.addEventListener("keydown", handleEnter);
window.addEventListener("keydown", handleUpArrow);
window.addEventListener("keydown", handleDownArrow);
window.addEventListener("keydown", handleTabCompletion);

function handleEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const userCmd = input.value;
    previousCmds.push(userCmd);
    if (userCmd === "clear") {
      // return early if it is a clear cmd to avoid creating a new div
      previousCmds.push(userCmd);
      command(userCmd, null);
      input.value = "";
      scrollToCurrentInput();
      return;
    }
    const newDiv = document.createElement("div");
    newDiv.classList = "output";
    newDiv.innerHTML = `
            <div class="flexbox">
              <span id="guest">guest</span>
              <span class="light-dark nospace">@</span>
              <span id="hostname">laansdole.github.io</span>
              <span class="light-dark nospace">:</span>
              <span class="light-dark space">$</span>
              <span class="space">${userCmd}</span>
            </div>
            <div class="cmd-line"></div>
          `;
    const newOutput = newDiv.querySelector(".cmd-line");
    command(userCmd, newOutput);
    container.insertBefore(newDiv, container.lastElementChild);
    input.value = "";
    scrollToCurrentInput();
  }
}

function handleUpArrow(event) {
  if (event.key === "ArrowUp" && previousCmds.length !== 0) {
    event.preventDefault();
    input.value = previousCmds[previousCmds.length - index];
    if (!(index + 1 > previousCmds.length)) {
      index++;
    }
  }
}

function handleDownArrow(event) {
  if (event.key === "ArrowDown" && previousCmds.length !== 0) {
    event.preventDefault();
    input.value = previousCmds[previousCmds.length - index];
    if (index - 1 !== 0) {
      index--;
    }
  }
}

function handleTabCompletion(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    const incompleteWord = input.value.toLowerCase();
    const match = commands.filter((command) =>
      command.startsWith(incompleteWord),
    );
    if (match.length > 0) {
      input.value = match[0];
    }
  }
}

function searchCommand(query) {
  similarCommand = commands.filter(command => command.toLowerCase().includes(query.toLowerCase()));
  console.log(similarCommand);
  if (similarCommand.length > 0) {
    let html = similarCommand.map(command => `<li>${command}</li>`).join("");
    return `Did you mean?<br><ul>${html}</ul>`;
  } else {
    return `<p>zsh: command not found: ${query}. For a list of commands, type 'help'.</p>`;
  }
}

function command(cmd, terminal) {
  switch (cmd.toLowerCase()) {
    case "help":
      addLine(help, terminal);
      break;

    case "aboutme":
      const aboutmeText = aboutmeByYear[selectedYear] || aboutme;
      addLine(aboutmeText, terminal);
      break;

    case "projects":
      addLine(projects, terminal);
      break;

    case "linkedin":
      addLine("Opening LinkedIn...", terminal);
      newTab(linkedin);
      break;

    case "github":
      addLine("Opening GitHub...", terminal);
      newTab(github);
      break;

    case "email":
      addLine(
        `Opening mailto: <a href="${email}">dolelongan@gmail.com</a>...`,
        terminal,
      );
      newTab(email);
      break;

    case "game":
      addLine("Starting Game...", terminal);
      newTab(game);
      break;

    case "clear":
      clearContent();
      break;

    case "":
      addLine("", terminal);
      break;

    default:
      addLine(
        searchCommand(cmd),
        terminal,
      );
  }
}

function addLine(text, outputSpace) {
  if (typeof text === "string") {
    outputSpace.innerHTML = text;
    return;
  }
  for (let i = 0; i < text.length; i++) {
    outputSpace.innerHTML += `${text[i]}`;
  }
}

function newTab(link) {
  scrollToCurrentInput();
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}

function clearContent() {
  const contentList = container.querySelectorAll(".output");
  contentList.forEach((element) => {
    console.log(element);
    element.remove();
  });
  scrollToCurrentInput();
}

function scrollToCurrentInput() {
  window.scrollTo(0, document.body.offsetHeight);
  input.focus();
}

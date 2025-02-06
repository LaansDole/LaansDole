const linkedin = "https://www.linkedin.com/in/do-le-long-an/";
const github = "https://github.com/LaansDole";
const email = "mailto:dolelongan@gmail.com";
const game = "https://laansdole.github.io/random-dungeon-game/"

const help = [
  "<li> Press <kbd>tab</kbd> for auto-completion and use up and down arrows for previous commands.</li>",
  "<br>",
  "<li>aboutme        - Get to know me! <i class='fa-solid fa-user'></i></li>",
  "<li>projects       - See the latest projects I've built <i class='fa-solid fa-folder'></i></li>",
  "<li>linkedin       - Check out my LinkedIn <i class='fa-brands fa-linkedin'></i></li>",
  "<li>github         - My GitHub profile <i class='fa-brands fa-github'></i></li>",
  "<li>email          - Shoot me an email <i class='fa-solid fa-envelope'></i></li>",
  "<li>game           - Start a roguelike dungeon game <i class='fa-solid fa-dungeon'></i></li>",
  "<li>clear          - Clear Terminal <i class='fa-solid fa-eraser'></i></li>",
];

const aboutme = [
  "<br>",
  "Welcome to 2025! This year, I'm focusing on building my career as a Software Engineer at ANZ Bank. ",
  "I'm also working on my personal projects and learning new technologies, with the goal of publish my medvoic-app on LinkedIn by April. ",
  "Looking back at 2024, I'm proud of the achievements I've made, especially the National SoICT Hackathon and the people I've met. ",
  "I'm excited for the opportunities and challenges that 2025 will bring. ",
  "Stay tune and join me on this journey! ",
  "</br>",
];


const commands = [
  "help",
  "aboutme",
  "projects",
  "linkedin",
  "github",
  "email",
  "game",
  "clear",
];

const projects = [
  "<br>",
  `<li><a href="" target="_blank"><u></u> <i class="fa-solid "></i></a> - </li>`,
  `<li><a href="" target="_blank"><u></u> <i class="fa-solid "></i></a> - </li>`,
  `<li><a href="" target="_blank"><u></u> <i class="fa-solid "></i></a> - </li>`,
  "<br>",
];

const container = document.querySelector(".container");
const input = document.getElementById("prompt");
let previousCmds = []; // stack ds
let index = 1;

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

// Updated parseYearFromCmd to handle --year and -y arguments
function parseYearFromCmd(cmd) {
  const args = cmd.split(" ");
  if (args.length === 1) {
    return "2025"; // default year
  }
  if ((args[1] === "--year" || args[1] === "-y") && (args[2] === "2024" || args[2] === "2025")) {
    return args[2];
  }
  return "invalid";
}

function getAboutMe(year) {
  if (year === "2024") {
    return [
      "<br>",
      "Welcome to 2024! This year, I'm proud of the achievements I've made, especially the National SoICT Hackathon.",
      "I'm focusing on continuing my growth and exploring new challenges in my software career.",
      "</br>",
    ];
  }
  return [
    "<br>",
    "Welcome to 2025! This year, I'm focusing on building my career as a Software Engineer at ANZ Bank.",
    "I'm also working on my personal projects and learning new technologies, planning to publish my medvoic-app by April.",
    "Looking back at 2024, I'm proud of the achievements I've made, especially the National SoICT Hackathon and the people I've met.",
    "I'm excited for the opportunities and challenges that 2025 will bring.",
    "Stay tune and join me on this journey!",
    "</br>",
  ];
}

// Updated command function to process base command for aboutme
function command(cmd, terminal) {
  const baseCmd = cmd.toLowerCase().split(" ")[0];
  switch (baseCmd) {
    case "help":
      addLine(help, terminal);
      break;
      
    case "aboutme":
      const year = parseYearFromCmd(cmd);
      if (year === "invalid") {
        addLine("Usage: aboutme [--year|-y] [2024|2025]", terminal);
      } else {
        addLine(getAboutMe(year), terminal);
      }
      break;

    // ...existing cases...
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
      addLine(`Opening mailto: <a href="${email}">dolelongan@gmail.com</a>...`, terminal);
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
      addLine(searchCommand(cmd), terminal);
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

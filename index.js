const fs = require('fs');
const axios = require('axios');

// Read the markdown file
let markdownText = fs.readFileSync('./README.md', 'utf8');

// Split the text into an array of lines
let lines = markdownText.split('\n');

// Exclude the last two lines
lines = lines.slice(0, -2);

// Join the lines back into a single string
markdownText = lines.join('\n');

axios.get("https://v2.jokeapi.dev/joke/Programming,Misc,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart&safe-mode")
  .then(response => {
    let question = response.data.setup;
    let punchline = response.data.delivery;

    let text = markdownText;
    text += "\n\n<h3><strong>" + question + "</strong></h3>"
    text += "<h4><i>" + punchline + "</i></h4>"

    fs.writeFile('./README.md', text, 'utf-8', function (err, data) {
      if (err) throw err;
      console.log('Done!');
    });
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });

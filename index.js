const fs = require('fs');
const axios = require('axios');

// Read the markdown file
let markdownText = fs.readFileSync('./docs/daily-jokes.md', 'utf8');

// Split the text into an array of lines
let lines = markdownText.split('\n');

// Find the line with "Laugh of the Day"
let index = lines.findIndex(line => line.includes('<h2><strong>Laugh of the Day</strong></h2>'));

// If "Laugh of the Day" is found, slice the lines after it
if (index !== -1) {
    lines = lines.slice(0, index + 1);
}

// Join the lines back into a string
let modifiedMarkdownText = lines.join('\n');

axios.get("https://v2.jokeapi.dev/joke/Programming,Misc,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart")
  .then(response => {
    let question = response.data.setup;
    let punchline = response.data.delivery;

    let text = modifiedMarkdownText;
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

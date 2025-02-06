
const fs = require('fs');
const axios = require('axios');

const pathToFile = process.argv[2];
const lineToFind = process.argv[3];
const insertionType = process.argv[4];

let markdownText = fs.readFileSync(pathToFile, 'utf8');
let lines = markdownText.split('\n');

let index = lines.findIndex(line => line.includes(lineToFind));
if (index !== -1) {
    lines = lines.slice(0, index + 1);
}

axios.get("https://v2.jokeapi.dev/joke/Programming,Misc,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart")
    .then(response => {
        let question = response.data.setup;
        let punchline = response.data.delivery;

        let text = lines.join('\n');
        if (insertionType === 'CI/CD') {
            text += "\n\n<h3><strong>" + question + "</strong></h3>";
            text += "<h4><i>" + punchline + "</i></h4>";
        } else if (insertionType === 'build') {
            text += "\n\n<blockquote><h3>" + question + "</h3>";
            text += "<h4><i>" + punchline + "</i></h4></blockquote>";
        }
        fs.writeFile(pathToFile, text, 'utf8', err => {
            if (err) throw err;
            console.log('Done!');
        });
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });
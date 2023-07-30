const axios = require('axios');
const fs = require('fs');

axios.get("https://backend-omega-seven.vercel.app/api/getjoke")
  .then(res => {
    const data = res.data;
    const question = data[0].question;
    const punchline = data[0].punchline;

    var text = `
# Daily Dev Joke

`
    text += "\n\n**" + question + "**"
    text += "\n*" + punchline + "*"

    fs.readFile('README.md', 'utf-8', function (err, content) {
      if (err) throw err;

      const startIndex = content.indexOf('<div id="daily-joke">');
      const endIndex = content.indexOf('</div>', startIndex) + 6;
      const updatedContent = content.slice(0, startIndex) + '<div id="daily-joke">' + text + '</div>' + content.slice(endIndex);

      fs.writeFile('README.md', updatedContent, 'utf-8', function (err) {
        if (err) throw err;
        console.log('Done!');
      });
    });
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });

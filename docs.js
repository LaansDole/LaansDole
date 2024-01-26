const fs = require('fs');

fetch("https://v2.jokeapi.dev/joke/Programming,Misc,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart&safe-mode")
    .then(response => response.json())
    .then(item => {
        let question = item.setup;
        let punchline = item.delivery;

        let text = `
<div 
class="sketchfab-embed-wrapper" 
align="center"
style="" 
>
    <img style="" src="https://media.giphy.com/media/Q8xuJjjxQHHJdHn7gJ/giphy.gif" />
    <br />
    <img style="transform: translateY(-50px)" src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=25&pause=1000&center=true&vCenter=true&random=true&width=435&lines=Hello%2C+World!;I+am+Do+Le+Long+An;Full-Stack+Web+Developer;DevOps+Engineer" alt="Typing SVG" />
    <br />
    <div style="transform: translateY(-25px)">
        <a href="https://www.linkedin.com/in/do-le-long-an/">
        <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
        </a>
        <a href="https://www.facebook.com/laansdole/">
        <img src="https://img.shields.io/badge/Facebook-blue?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook Badge"/>
        </a>
        <a href="https://www.facebook.com/laansdole/">
        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Facebook Badge"/>
        </a>
        <p>&nbsp;<img align="center" src="https://readmestats.999857.xyz/api?username=laansdole&show_icons=true&locale=en&theme=tokyonight" alt="laansdole" /></p>
    </div>
</div>

## **💻 Web Development**:
### - Frontend:
![ReactJS](https://img.shields.io/badge/-ReactJS-%2361DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### - Backend:
![Nodejs](https://img.shields.io/badge/Node.js-43853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![◾](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)

### - Database:
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

### - 🧰 Web Tools:
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## **☁️ Cloud Services**:
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

## **♾️ DevOps**:
![Jenkins](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white)
![Shell Script](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Ansible](https://img.shields.io/badge/ansible-%231A1918.svg?style=for-the-badge&logo=ansible&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## **🖥️ Linux distros**:
![CentOS](https://img.shields.io/badge/Cent%20OS-262577?style=for-the-badge&logo=CentOS&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)
![WSL2](https://img.shields.io/badge/WSL-0a97f5?style=for-the-badge&logo=linux&logoColor=white)

## **🛠 IDEs and Tools**:
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![CLion](https://img.shields.io/badge/CLion-000000?style=for-the-badge&logo=clion&logoColor=white)
![Google Colab](https://img.shields.io/badge/Colab-F9AB00?style=for-the-badge&logo=googlecolab&color=525252)
![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![InteliJ](https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
    `;
        text += "\n\n**<h4>" + question + "</h4>**"
        text += "\n*" + punchline + "*"

        fs.writeFile('docs/index.md', text, 'utf-8', function (err, data) {
            if (err) throw err;
            console.log('Done!');
        });
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });

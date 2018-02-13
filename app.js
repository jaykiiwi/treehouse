//PROBLEM: What is simple way to check user badge count and Javascript points in teamtreehouse.com
//SOLUTION: Connect Node.js to Treehouse API and print out the information

// Require https module
const https = require('https')

//print message to console
function printMessage(username, badgeCount, points){
  const message = `${username} has ${badgeCount} total badge(s) and ${points} in javascript`;
  console.log(message);
};

function getProfile(username){
  //connect to API url https://teamtreehouse.com/username.json
  const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      let body = "";

      //read the data
      response.on('data', data => {
        body += data.toString();
      });


      response.on('end', () => {
      //parse the data
        const profile = JSON.parse(body);
      //print the data
        printMessage(username, profile.badges.length, profile.points.JavaScript)
      });

  });
}

const users = process.argv.slice(2);

users.forEach(getProfile);

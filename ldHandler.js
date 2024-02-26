const fs = require('fs');
const url = new URL(window.location.href);
const ID = url.searchParams.get('id');
const NAME = url.searchParams.getAll('user');
const SCORE = url.searchParams.get('score');
const TIME = url.searchParams.getAll('time');
const CHARACTER = url.searchParams.get('character');
const TYPE = url.searchParams.get('gamemode');
const ACTION = url.searchParams.get('action');

const rawData = fs.readFileSync('leaderboard'+TYPE+'.json');
let leaderboardData = JSON.parse(rawData);

function aouu(username, id, highscore, time, character) {
    const userIndex = leaderboardData.leaderboards.findIndex(user => user[1] === id);
    if (userIndex !== -1) {
        leaderboardData.leaderboards[userIndex] = [username, id, highscore, time, character];
    } else {
        leaderboardData.leaderboards.push([username, id, highscore, time, character]);
    }
    fs.writeFileSync('leaderboard'+TYPE+'.json', JSON.stringify(leaderboardData, null, 2));
}

function du(id) {
    leaderboardData.leaderboards = leaderboardData.leaderboards.filter(user => user[1] !== id);
    fs.writeFileSync('leaderboards.json', JSON.stringify(leaderboardData, null, 2));
}
if(ACTION == "aouu"){
  aouu(USERNAME,ID,SCORE,TIME,CHARACTER);
}
if(ACTION == "du"){
  du(ID);
}

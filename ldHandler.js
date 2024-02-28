const url = new URL(window.location.href);
const ID = url.searchParams.get('id');
const NAME = url.searchParams.getAll('user');
const SCORE = url.searchParams.get('score');
const TIME = url.searchParams.getAll('time');
const CHARACTER = url.searchParams.get('character');
const TYPE = url.searchParams.get('gamemode');
const ACTION = url.searchParams.get('action');
const accessToken = url.searchParams.get('token');
const repoOwner = 'LeeechLabStudios';
const repoName = 'era.guessr.database';
const filePath = 'leaderboards'+TYPE+'.json';
async function updateLeaderboard(username, id, highscore, time, character) {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });

    const data = await response.json();
    const currentContent = atob(data.content);
    
    const leaderboardData = JSON.parse(currentContent);
    if (ACTION == "aouu"){
        const userIndex = leaderboardData.leaderboards.findIndex(user => user[1] === id);
        if (userIndex !== -1) {
            leaderboardData.leaderboards[userIndex] = [username, id, highscore, time, character];
        } else {
            leaderboardData.leaderboards.push([username, id, highscore, time, character]);
        }
    }
    if (ACTION == "du"){
        leaderboardData.leaderboards = leaderboardData.leaderboards.filter(user => user[1] !== id);
    }
    const updatedContent = btoa(JSON.stringify(leaderboardData, null, 2));

    await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update leaderboard',
        content: updatedContent,
        sha: data.sha
      })
    });

    console.log('Leaderboard updated successfully!');
}
updateLeaderboard(NAME,ID,SCORE,TIME,CHARACTER);

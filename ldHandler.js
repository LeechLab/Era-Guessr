const url = new URL(window.location.href);
const ID = url.searchParams.get('id');
const NAME = url.searchParams.get('user');
const SCORE = url.searchParams.get('score');
const TIME = url.searchParams.get('time');
const CHARACTER = url.searchParams.get('character');
const ACTION = url.searchParams.get('action');
const accessToken = url.searchParams.get('token');
const repoOwner = 'LeeechLabStudios';
const repoName = 'era.guessr.database';
const filePath = 'leaderboards'+url.searchParams.get('gamemode')+'.json';
async function updateLeaderboard(newArray) {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${accessToken}`
          
      }
    });
    if (!response.ok) {
      console.error(`Failed to fetch current content from GitHub. Status: ${response.status}`, `URL: ${apiUrl}`);
      return;
    }
    const data = await response.json();
    const currentContent = atob(data.content);
    
    const leaderboardData = JSON.parse(currentContent);
    if (ACTION == "aouu"){
        const userIndex = leaderboardData.leaderboards.findIndex(user => user[1] === ID);
        if (userIndex !== -1) {
            leaderboardData.leaderboards[userIndex] = newArray;
        } else {
            leaderboardData.leaderboards.push(newArray);
        }
    }
    if (ACTION == "du"){
        leaderboardData.leaderboards = leaderboardData.leaderboards.filter(user => user[1] !== ID);
    }
    const updatedContent = btoa(JSON.stringify(leaderboardData, null, 2));

    await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: '[AUTOMATED] Client Updated Leaderboards',
        content: updatedContent,
        sha: data.sha
      })
    });

    console.log('Leaderboard updated successfully!');
}
updateLeaderboard([NAME,ID,SCORE,TIME,CHARACTER]);
setTimeout(function () {}, 2000);

class Game {
    constructor(currentLeaderNickname, imageFileName, gameTitle, currentWins, currentLosses, currentKills) {
        this.currentLeaderNickname = currentLeaderNickname;
        this.imageFileName = imageFileName;
        this.gameTitle = gameTitle;
        this.currentWins = currentWins;
        this.currentLosses = currentLosses;
        this.currentKills = currentKills;
    }
}
let gamesArray = [];

// Add all cards
function setAllGameCards() {
    let allCardContainers = document.getElementById("allCards");
    for (let game of gamesArray) {
        if(game.gameTitle === 'Warzone') {
            allCardContainers.innerHTML += '<div class="card"> \
            <img src="images/' + game.imageFileName + '" alt="' + game.gameTitle + '"> \
            <h2> \
                ' + game.gameTitle + ' \
            </h2> \
            <div class="card-text"> \
                <p class="subtitle"> \
                    Leader \
                </p> \
                <p id="ssbuLeader"> \
                    ' + game.currentLeaderNickname + ' \
                </p> \
                <p class="subtitle"> \
                    Stats \
                </p> \
                <p id="ssbuStats"> \
                    ' + game.currentKills + ' Kills, ' + game.currentWins + ' Wins' + '\
                </p> \
            </div> \
        </div>';
        } else {
            allCardContainers.innerHTML += '<div class="card"> \
            <img src="images/' + game.imageFileName + '" alt="' + game.gameTitle + '"> \
            <h2> \
                ' + game.gameTitle + ' \
            </h2> \
            <div class="card-text"> \
                <p class="subtitle"> \
                    Leader \
                </p> \
                <p id="ssbuLeader"> \
                    ' + game.currentLeaderNickname + ' \
                </p> \
                <p class="subtitle"> \
                    Stats \
                </p> \
                <p id="ssbuStats"> \
                    ' + game.currentWins + 'W-' + game.currentLosses + 'L \
                </p> \
            </div> \
        </div>';
        }
        
    console.log(allCardContainers);
    }
}

$.getJSON('data/games.json', function(gamesData) {
    const games = gamesData;
    $.getJSON('data/data.json', function(data) {
        let players = data;
        for(let gameCurrent of games) {
            let currentGame = {'name':gameCurrent.name, 'shorthand':gameCurrent.shorthand, 'mostWins':0, 'leaderLosses':0, 'leaderKills':0, 'leader':'none'};
            for(let player of players) {
                if(player[gameCurrent.shorthand + 'Kills'] > currentGame.leaderKills) {
                    currentGame.leaderKills = player[gameCurrent.shorthand + 'Kills'];
                    currentGame.mostWins = player[gameCurrent.shorthand + 'Wins'];
                    if(player.nickname !== '') {
                        currentGame.leader = player.nickname;
                    } else {
                        currentGame.leader = player.firstName;
                    }
                }
                if(player[gameCurrent.shorthand + 'Wins'] > currentGame.mostWins) {
                    currentGame.mostWins = player[gameCurrent.shorthand + 'Wins'];
                    currentGame.leaderLosses = player[gameCurrent.shorthand + 'Losses'];
                    if(player.nickname !== '') {
                        currentGame.leader = player.nickname;
                    } else {
                        currentGame.leader = player.firstName;
                    }
                }
            }
            console.log(currentGame);
            gamesArray.push(new Game(currentGame.leader
                , currentGame.shorthand + '.jpg', currentGame.name, currentGame.mostWins,
                currentGame.leaderLosses, currentGame.leaderKills));
        }
        setAllGameCards(gamesArray);
    });
});
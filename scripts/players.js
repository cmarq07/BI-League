$.getJSON('data/games.json', function(gamesData) {
    const games = gamesData;
    class Player {
        constructor(firstName, lastName, nickname,
            ssbuWins, ssbuLosses, maddenWins, maddenLosses, nbaWins, nbaLosses,
            fifaWins, fifaLosses, rocketleagueWins, rocketleagueLosses) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.nickname = nickname;
                this.ssbuWins = ssbuWins;
                this.ssbuLosses = ssbuLosses;
                this.maddenWins = maddenWins;
                this.maddenLosses = maddenLosses;
                this.nbaWins = nbaWins;
                this.nbaLosses = nbaLosses;
                this.fifaWins = fifaWins;
                this.fifaLosses = fifaLosses;
                this.rocketleagueWins = rocketleagueWins;
                this.rocketleagueLosses = rocketleagueLosses;
                this.totalWins = totalWins
                this.totalLosses = totalLosses;
            }
    }

    function createGameStats(player, game) {
        let gameName = game.name;
        let playerWinsForGame = player[game.shorthand + 'Wins'];
        let playerLossesForGame = player[game.shorthand + 'Losses'];
        let playerKillsForGame = player[game.shorthand + 'Kills'];
        let newDivElement = document.createElement('div');
        let gameTitle = document.createElement('h2');
        let gameStats = document.createElement('p');
        newDivElement.classList.add('gameStats');
        gameTitle.classList.add('cardSubtitle');
        if(player[game.shorthand + 'Wins'] > 0 ||
        player[game.shorthand + 'Losses'] > 0 ||
        player[game.shorthand + 'Kills'] > 0) {
            newDivElement.appendChild(gameTitle);
            newDivElement.appendChild(gameStats);
        }
        gameTitle.innerHTML = gameName;
        if(gameName === 'Warzone') {
            gameStats.innerHTML = playerKillsForGame + ' Kills - ' + playerWinsForGame + ' Wins';
        } else {
            gameStats.innerHTML = playerWinsForGame + ' Wins - ' + playerLossesForGame + ' Losses';
        }
        return newDivElement;
    }

    function renderPlayerCard(player) {
        // Card div
        let playerCardDiv = document.createElement('div');
        playerCardDiv.classList.add('playerCard');
        // Card nameplate
        let nameplateDiv = document.createElement('div');
        nameplateDiv.classList.add('nameplate');
        let playerNameHeader = document.createElement('h2');
        if(player.nickname !== '') {
            playerNameHeader.innerHTML = '\"' + player.nickname + '\"' + ' ' + player.firstName + ' '+ player.lastName; 
        } else {
            playerNameHeader.innerHTML = player.firstName + ' '+ player.lastName; 
        }
        nameplateDiv.appendChild(playerNameHeader);
        // Card statsplate
        let statsplateDiv = document.createElement('div');
        
            // Leading Games
            let leadingGamesDiv = document.createElement('div');
            leadingGamesDiv.classList.add('leaderIn');
            let leadingGamesSubtitle = document.createElement('h2');
            let leadingGamesText = document.createElement('p');
            leadingGamesSubtitle.innerHTML = 'Leading';
            let playerLeadingBoolean = false;
            for(let i = 0; i < player.leading.length - 1; i++) {
                let game = player.leading[i];
                console.log(game.shorthand + 'Wins' + ': ' + player[game.shorthand + 'Wins']);
                console.log(game.name + ' Most Wins: ' + game.mostWins);
                if(player[game.shorthand + 'Wins'] === game.mostWins && game.mostWins !== 0) {
                    playerLeadingBoolean = true;
                    leadingGamesText.innerHTML += game.name + ', ';
                }
            }
            let leadingLength = player.leading.length;
            let game = player.leading[leadingLength - 1];
            console.log(game);
            if(game !== undefined) {
                if(player[game.shorthand + 'Wins'] === game.mostWins && game.mostWins !== 0) {
                    playerLeadingBoolean = true;
                    leadingGamesText.innerHTML += game.name;
                }
            }
            if(!playerLeadingBoolean) {
                leadingGamesText.innerHTML = 'None';
            }
            leadingGamesSubtitle.classList.add('cardSubtitle');
            leadingGamesDiv.appendChild(leadingGamesSubtitle);
            leadingGamesDiv.appendChild(leadingGamesText);

            // Totals
            let totalsDiv = document.createElement('div');
            totalsDiv.classList.add('totals');
            let totalsSubtitle = document.createElement('h2');
            let totalsText = document.createElement('p');
            let winTotal = player.ssbuWins + player.maddenWins + player.nbaWins + player.fifaWins + player.rocketleagueWins;
            let lossTotal = player.ssbuLosses + player.maddenLosses + player.nbaLosses + player.fifaLosses + player.rocketleagueLosses;
            totalsText.innerHTML = winTotal + ' Wins - ' + lossTotal + ' Losses';
            totalsSubtitle.innerHTML = 'Totals';
            totalsSubtitle.classList.add('cardSubtitle');
            totalsDiv.appendChild(totalsSubtitle);
            totalsDiv.appendChild(totalsText);

        // Append other divs
        statsplateDiv.appendChild(leadingGamesDiv);
        statsplateDiv.appendChild(totalsDiv);
            // Games
            for(let game of games) {
                let currentGameDiv = createGameStats(player, game);
                statsplateDiv.appendChild(currentGameDiv);
            }
        playerCardDiv.appendChild(nameplateDiv);
        playerCardDiv.appendChild(statsplateDiv);
        return playerCardDiv;
    }

    $.getJSON('data/data.json', function (playerData) {
        function appendPlayerCard(playerCard) {
            console.log(playerCard);
            let allCardsContainer = document.getElementById('playerCards');
            allCardsContainer.appendChild(playerCard);
        }
        let players = playerData;
        for(let player of players) {
            for(let game of games) {
                if(player[game.shorthand + 'Wins'] > game.mostWins) {
                    game.mostWins = player[game.shorthand + 'Wins'];
                    player.leading.push(game);
                }
            }
        }
        
        for(let player of players) {
            console.log(player.firstName);
            let currentPlayerDiv = renderPlayerCard(player);
            appendPlayerCard(currentPlayerDiv);
        }
    });
});

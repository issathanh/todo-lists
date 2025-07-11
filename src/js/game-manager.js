const GameManager = (function () {
    let gameState = {
        player: {
            hp: 30,
            maxHp: 30,
            energy: 3,
            maxEnergy: 3,
            gold: 0,
            shield: 0
        },
        boss: {
            hp: 50,
            maxHp: 50,
            damage: 5
        },
        currentTurn: 'player',
        playerHand: []
    };

    // Function to expose
    return {
        getGameState: () => gameState,
        logGameState: function () {
            console.log('=== GAME STATE ===');
            console.log('Player Hp:', gameState.player.hp);
            console.log('Player Energy:', gameState.player.energy);
            console.log('Player Gold:', gameState.player.gold);
            console.log('Player Shield:', gameState.player.shield)
            console.log('Boss Hp:', gameState.boss.hp);
            console.log('Current Turn:', gameState.currentTurn);

        },
        giveGoldReward: function (priority) {
            let goldAmount = 0
            switch (priority) {
                case 'high': goldAmount = 50; break;
                case 'medium': goldAmount = 30; break;
                case 'low': goldAmount = 10; break;
            }

            gameState.player.gold += goldAmount;
            console.log(`🪙 Earned ${goldAmount} gold! Total: ${gameState.player.gold}`);
            console.log(this.logGameState())
            return goldAmount;
        },

        playCard: function(card)
        {
            
            if (card.type ==='attack')
            {
                console.log('boss has been damage')
                gameState.boss.hp -= card.attack
                gameState.player.energy -= card.cost
                this.logGameState()
            }

            else if(card.type ==='defense')
            {
                console.log('You have shield')
                gameState.player.shield += card.defense
                gameState.player.energy -= card.cost
                this.logGameState()
            }
        }
    }
})();  
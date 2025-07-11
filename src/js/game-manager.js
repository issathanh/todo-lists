const GameManager = (function () {
    let gameState = {
        player: {
            hp: 30,
            maxHp: 30,
            energy: 3,
            maxEnergy: 3,
            gold: 0
        },
        boss: {
            hp: 50,
            maxHp: 50,
            damage: 5
        },
        currentTurn: 'player',
        inCombat: false,
        playerHand: [],
        availableCards: [
            { id: 1, name: 'Strike', cost: 1, damage: 6, type: 'attack' },
            { id: 2, name: 'Block', cost: 1, block: 5, type: 'defense' }
        ]
    };

    // Function to expose
    return {
        getGameState: () => gameState,
        logGameState: function () {
            console.log('=== GAME STATE ===');
            console.log('Player Hp:', gameState.player.hp);
            console.log('Player Energy:', gameState.player.energy);
            console.log('Player Gold:', gameState.player.gold);
            console.log('Boss Hp:', gameState.boss.hp);
            console.log('Current Turn:', gameState.currentTurn);
            console.log('In Combat:', gameState.inCombat);
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
            return goldAmount;
        }

    }
})();  
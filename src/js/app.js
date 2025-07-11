document.addEventListener('DOMContentLoaded', function(){
    initializeForm(); 

    //test gamestate 
    console.log('Game initialized!')
    GameManager.logGameState()
    
    const attackCard = createAttackCard(5,1)
    const defenseCard = createDefenseCard(5,1)

    console.log('playing attack card')
    GameManager.playCard(attackCard)
    console.log('playing defense card')
    GameManager.playCard(defenseCard)
    
})
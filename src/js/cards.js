function createAttackCard(damage, cost){
    return {
        type: 'attack', 
        attack: damage, 
        cost: cost
    };
}

function createDefenseCard(block, cost){
    return {
        type: 'defense',
        defense: block,
        cost: cost
    }; 
}
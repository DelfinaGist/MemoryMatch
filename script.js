const cards = document.querySelectorAll('.card'); 
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0; 
const startButton = document.getElementById("Start-Button") 
let scoreDisplay = document.getElementById("score")

function flipCard(e){ 
    let clickedCard = e.target; 
//getting user clicked card

    if(clickedCard !== cardOne && !disableDeck){ 
        clickedCard.classList.add('flip');

        if(!cardOne){
            return cardOne = clickedCard; 
//return the cardOne value to clickedCard
        }
        cardTwo = clickedCard;

        disableDeck = true;

        let cardOneImg = cardOne.querySelector('img').src, 
        cardTwoImg = cardTwo.querySelector('img').src; 
        matchCards(cardOneImg, cardTwoImg);
    }
}
let time = 60
scoreDisplay.innerHTML = `${time}s`
disableDeck=true
function startTimer(){
    disableDeck=false
    shuffleCard();

    const timer = setInterval(() => {
    if (matchedCard === 8) {
        clearInterval(timer)
        time = 60
        scoreDisplay.innerHTML = "Game Won!"  
        return disableDeck = true;
    }
    
    time-- 
    scoreDisplay.innerHTML = `${time}s`
    if (time === 0) {
        if(matchedCard !=8) {
            clearInterval(timer) 
            time = 60
            scoreDisplay.innerHTML = "Game Lost!"  
            return disableDeck = true;
        } else {
            clearInterval(timer)
            scoreDisplay.innerHTML = "Game Won!" 
            time = 60 
            return disableDeck = true;
        }
    }
   
   
}, 1000); 
}
startButton.addEventListener('click', () =>{
    console.log ("buttonWorks")
     startTimer()})
function matchCards(img1, img2){ 

    if(img1 === img2){ 
// if two cards img matched
        
        matchedCard++; 
// increment matched value by one


        if(matchedCard == 8){ 
// if matched value is 8 that means user has matched all the cards

            setTimeout(() => { 
                return shuffleCard();
            }, 1200); 
//calling shuffleCard function after 1s
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';//7.4
        return disableDeck = false;
    }
    else{
        setTimeout(() => { 
// if two card not matched

            cardOne.classList.add('shake');
// adding shake class to both card after 400ms

            cardTwo.classList.add('shake');
        }, 400);

        setTimeout(() => { 
// removing both shake and flip classes from the both card after 1.2s

            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';
//set both card value to blank

            disableDeck = false;

        }, 1200);
    }
}

function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = "";

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; 
//create array of 16 items and each item is repeated twice

    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
//sorting array item randomly

    cards.forEach((card, index) => { 
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);

        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.png`;
    });
}
// shuffleCard();

cards.forEach(card => { 
// adding click event to all cards

    card.addEventListener('click', flipCard); 
});


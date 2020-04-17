//domcontent loaded fires when initial html document has completely loaded and parsed without
//waiting for stylesheets, iamges and subframes to finish loading - MDN docs

document.addEventListener('DOMContentLoaded',()=>{
  
    
   //create a timer
   function timer(){
       var sec = 25
       var timer = setInterval(()=>{
        document.getElementById('time').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            timeOut()
        }
       },1000)
   }

  

     
  //create card array  
  const cardArray =[
      {
          name: 'dog',
          src: 'images/dog.png'
      },
      {
        name: 'dog',
        src: 'images/dog.png'
    },
    {
        name: 'elephant',
        src: 'images/elephant.png'
    },
    {
        name: 'elephant',
        src: 'images/elephant.png'
    },
    {
        name: 'fox',
        src: 'images/fox.png'
    },
    {
        name: 'fox',
        src: 'images/fox.png'
    },
    {
        name: 'giraffe',
        src: 'images/giraffe.png'
    },
    {
        name: 'giraffe',
        src: 'images/giraffe.png'
    },
    {
        name: 'panda',
        src: 'images/panda.png'
    },
    {
        name: 'panda',
        src: 'images/panda.png'
    },
    {
        name: 'turtle',
        src: 'images/turtle.png'
    },
    {
        name: 'turtle',
        src: 'images/turtle.png'
    },

  ]

  //create game board
  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  var cardChosen = []
  var cardChosenID = []
  var cardsWon = []
   

 
  cardArray.sort(() => Math.random() - 0.5);

  function createBoard(){

      for(let i =0;i<cardArray.length;i++){
        var card = document.createElement('img')
        card.setAttribute('src','images/blank.png') //Element.setAttribute(name, value);
        card.setAttribute('card-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card) //add to the grid using append child
    }
  }
 
  createBoard()

  //check for match
  function checkForMatch(){
      var cards = document.querySelectorAll('img')//get all the img card element
      optionOneID = cardChosenID[0]
      optionTwoID = cardChosenID[1]
      console.log(optionOneID)
      console.log(optionTwoID)
      if((cardChosen[0] === cardChosen[1])&&(optionOneID!==optionTwoID) ){
          //match found.
          cards[optionOneID].setAttribute('src', 'images/white.png')
          cards[optionTwoID].setAttribute('src', 'images/white.png')         
          cardsWon.push(cardChosen)
          console.log(cardsWon)
      }
      else{
        cards[optionOneID].setAttribute('src', 'images/blank.png')
        cards[optionTwoID].setAttribute('src', 'images/blank.png')
      }
      cardChosen=[]
      cardChosenID=[]
      resultDisplay.textContent = cardsWon.length
      if(cardsWon.length === cardArray.length/2){
          resultDisplay.textContent='Congratulations! you won'
          reset()
      }  
  }


  //flip the card
  function flipCard(){
        var cardID = this.getAttribute('card-id')
        cardChosen.push(cardArray[cardID].name)
        cardChosenID.push(cardID)
        this.setAttribute('src',cardArray[cardID].src)
        if(cardChosen.length === 2){
            setTimeout(checkForMatch, 200);
        }
  }

  timer()
  //timeout
   function timeOut(){
       resultDisplay.textContent = 'Time Out!! Try again :)' 
        reset()
   }

   function reset(){
    cardChosen=[]
    cardChosenID=[]
    cardsWon=[] 
    var cards = document.querySelectorAll('img')//get all the img card element
    setTimeout(()=>{
        for(let i =0; i<cards.length;i++){
            cards[i].setAttribute('src','images/blank.png')
        }
        timer()
        resultDisplay.textContent = '0'
    },1000)
   }
})
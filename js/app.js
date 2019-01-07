/*Sanity Test*/
console.log("The page is loading!");


/*----- classes -----*/
class Pet {
  constructor(petName, petAge, hunger, sleepiness, boredom, live){
    this.petName = petName;
    this.petAge = petAge;
    this.hunger = hunger;
    this.sleepiness = sleepiness;
    this.boredom = boredom;
    this.live = live;
  }
}



/*----- constants -----*/
let tamagotchi = new Pet('Dino', 1, 5, 5, 5, true);
console.log(tamagotchi);

//inserting the pet image at the end of the div screen
$('.screen').prepend('<img src="images/dinosaur.gif" alt="Dinossaur">');

//inserting the Give Food button
$('.buttons').append('<button  id="feedButton" type="button" name="Feed">Food</button>');

//inserting the Play with the Pet button
$('.buttons').append('<button id="petButton" type="button" name="Pet">Play</button>');

//inserting the Turn the Lights (On/Off) buttons
$('.buttons').append('<button id="lightButton" type="button" name="Lights">Lights</button>');

// $('.commands').append('');




/*----- app's state (variables) -----*/
//defining tamagotchi's attributes

//insert the Pet Age at the begining of the Pet Info Div.
$('.petInfo').prepend(`<div id="age"><p>Age = ${tamagotchi.petAge} year</p></div>`);

//rendering sleepinessValue
$('.atributes').append(`<li id="hungerValue">Hunger  = ${tamagotchi.hunger}<div id="hungerBar"></div></li>`);

// rendering sleepinessValue
$('.atributes').append(`<li id="sleepinessValue">Sleepines  = ${tamagotchi.sleepiness}<div id="sleepinessBar"></div></li>`);

// rendering boredomValue
$('.atributes').append(`<li id="boredomValue">Boredom  = ${tamagotchi.boredom}<div id="boredomBar"></div></li>`);

//light status variable
let lightToggle = 1;


/*----- cached element references -----*/



/*----- event listeners -----*/
$('#lightButton').on('click', function(){
  lightToggle *= -1;
  render();
});




$('#feedButton').on('click', () => {
  console.log('feed clicked');
  tamagotchi.hunger --;
  if(tamagotchi.hunger < 0) {
    tamagotchi.hunger = 0
  }
  render();
})
//Click Event at the Pet/Play Button -
// Makes the boredom decrease according the player pets the tamagotchi
$('#petButton').on('click', () => {
  console.log('Pet clicked');
  tamagotchi.boredom --;
  if(tamagotchi.boredom < 0) {
    tamagotchi.boredom = 0;
  }
  render();
})

// Click Event at the Rename Pet button
$('#nameButton').on('click', () => {
  console.log('name clicked');
  tamagotchi.petName = prompt("Type your Pet's name...");
  $('.screen').prepend(`<div id="nameValue"><p>${tamagotchi.petName}</p></div>`);
  console.log(tamagotchi);
  render();
});

/*----- functions -----*/
function init () {
  setInterval(render, 50);
  var sleepTimer = setInterval(menageSleep, 15000);
  var hungerTimer = setInterval(menageHunger, 10000);
  var boredomTimer = setInterval(menageBoredom, 20000);
  var ageInterval = setInterval(increaseAge, 20000);
}


function menageSleep () {
  if (lightToggle === 1) {
    tamagotchi.sleepiness ++;
  }else if (lightToggle === -1) {
    tamagotchi.sleepiness --;
  }
  if(tamagotchi.sleepiness > 10){
    killTamagotchi();
  }
  if(tamagotchi.sleepiness <0){
    tamagotchi.sleepiness = 0;
  }
}

function menageHunger () {
  tamagotchi.hunger ++;
  if (tamagotchi.hunger > 10) {
    killTamagotchi();
  }
}

function menageBoredom () {
  tamagotchi.boredom ++;
  if (tamagotchi.boredom > 10) {
    killTamagotchi();
  }
}

function increaseAge (){
  tamagotchi.petAge ++;
  console.log(`Tamagotchi age is ${tamagotchi.petAge}`);
  render();
}

function killTamagotchi(){
  tamagotchi.live = false
  $('.screen').html('<img src="images/dinosaur_dead.png" alt="Dinossaur">');
  setTimeout(function () {
    if (tamagotchi.live === false) {
      if(confirm(`${tamagotchi.petName} is Dead! Restart?`)){
        location.reload();
      }else {
        window.close();
      }
    }
  }, 100);
}


function render () {
  //rendering the Age
  $('#age').html(`<p>Age = ${tamagotchi.petAge} years</p>`);


  //rendering the hunger value and status bar
  $('#hungerValue').html(`<li id="hungerValue">Hunger= ${tamagotchi.hunger}<div id="hungerBar"></div></li>`);
  //rendering the boredom value and status bar
  $('#boredomValue').html(`<li id="boredomValue">Boredom = ${tamagotchi.boredom}<div id="boredomBar"></div></li>`);
  //rendering sleepiness value and status bar
  $('#sleepinessValue').html(`<li id="sleepinessValue">Sleepines = ${tamagotchi.sleepiness}<div id="sleepinessBar"></div></li>`);


  //rendering hungerBar
  $('#hungerBar').css("width", `${tamagotchi.hunger*10}%`);

  //rendering sleepinessBar
  $('#sleepinessBar').css("width", `${tamagotchi.sleepiness*10}%`);

  //rendering boredomBar
  $('#boredomBar').css("width", `${tamagotchi.boredom*10}%`);

  //rendering screen
  if (lightToggle === 1) {
    $('.screen').css('background-color', '#AD9AA8');
  }else if (lightToggle === -1) {
    $('.screen').css('background-color', '#7F7F7F');
  }
}

render();
init();

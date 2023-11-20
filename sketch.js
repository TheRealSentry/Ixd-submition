let morseCode = {
  'A': '.-',   'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 
  'J': '.---', 'K': '-.-',  'L': '.-..', 'M': '--',   'N': '-.', 'O': '---',  'P': '.--.', 'Q': '--.-', 'R': '.-.', 
  'S': '...',  'T': '-',    'U': '..-',  'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': ' '  // Space
};

let dotDuration = 70; 
let dashDuration = 3 * dotDuration; 
let spaceDuration = 3 * dotDuration; 

function setup() {
  createCanvas(400, 200);
  let inputText = "ANANT UNIVERSITY IS GREAT";
  let morseText = convertToMorse(inputText);
  playMorseAudio(morseText);
}

function convertToMorse(text) {
  let upperCaseText = text.toUpperCase();
  let morseText = "";

  for (let i = 0; i < upperCaseText.length; i++) {
    let character = upperCaseText.charAt(i);
    if (morseCode.hasOwnProperty(character)) {
      morseText += morseCode[character] + " ";
    }
  }
  
  return morseText;
}

function playMorseAudio(morseText) {
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.connect(audioContext.destination);
  oscillator.start();

  let tokens = morseText.split('');
  let currentTime = audioContext.currentTime;

  tokens.forEach(token => {
    switch (token) {
      case '.':
        oscillator.frequency.setValueAtTime(1000, currentTime);
        currentTime += dotDuration / 1000;
        oscillator.frequency.setValueAtTime(0, currentTime);
        currentTime += dotDuration / 1000;
        break;
      case '-':
        oscillator.frequency.setValueAtTime(1000, currentTime);
        currentTime += dashDuration / 1000;
        oscillator.frequency.setValueAtTime(0, currentTime);
        currentTime += dotDuration / 1000;
        break;
      case ' ':
        currentTime += spaceDuration / 1000;
        break;
    }
  });

  oscillator.stop(currentTime);
}

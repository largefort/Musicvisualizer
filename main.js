// main.js

// Set up Web Audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Load audio file
var audioElement = new Audio('y2mate.com - KORDHELL MEMPHIS DOOM.mp3');
var audioSource = audioContext.createMediaElementSource(audioElement);

// Connect audio source to audio context destination
audioSource.connect(audioContext.destination);

// Create Visualizer-micro instance
var visualizer = new Visualizer(audioContext, audioElement, {
    type: 'waveform',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    width: 800,
    height: 400
});

// Start visualization
visualizer.start();

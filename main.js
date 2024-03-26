// main.js

// Set up Web Audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Load audio file
var audioElement = new Audio('y2mate.com - KORDHELL  MEMPHIS DOOM.mp3');
var audioSource = audioContext.createMediaElementSource(audioElement);

// Create Tuna.js filter
var tuna = new Tuna(audioContext);
var filter = new tuna.Filter();

// Connect audio source to filter
audioSource.connect(filter.input);

// Connect filter to audio context destination
filter.connect(audioContext.destination);

// Analyze audio data
var analyser = audioContext.createAnalyser();
audioSource.connect(analyser);
analyser.fftSize = 256;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

// Get canvas element for visualization
var canvas = document.getElementById('visualizerCanvas');
var canvasCtx = canvas.getContext('2d');

// Visualization loop
function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Visualize audio data
    var barWidth = (canvas.width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,canvas.height-barHeight/2,barWidth,barHeight);

        x += barWidth + 1;
    }
}

// Start visualization
audioElement.play();
draw();

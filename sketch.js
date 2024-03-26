let audioFile;
let fft;
let amplitude;

function preload() {
    // Load the audio file when the page loads
    audioFile = loadSound('', loaded);
}

function loaded() {
    // Once the audio is loaded, play it and create FFT and Amplitude objects
    audioFile.play();
    fft = new p5.FFT();
    amplitude = new p5.Amplitude();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Connect FFT to the audio file
    fft.setInput(audioFile);
}

function draw() {
    background(0);
    // Analyze the audio
    let spectrum = fft.analyze();

    // Visualize the spectrum
    noStroke();
    fill(255);
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / spectrum.length, h);
    }

    // Get the amplitude (volume) of the audio
    let level = amplitude.getLevel();
    // Use the amplitude to change the background color
    let bgColor = map(level, 0, 1, 0, 255);
    background(bgColor);
}

// Function to handle when a file is uploaded
document.getElementById('audioFileInput').onchange = function(event) {
    let files = event.target.files;
    // Check if there is a file
    if (files.length > 0) {
        // Load the new audio file
        audioFile = loadSound(URL.createObjectURL(files[0]), loaded);
    }
};

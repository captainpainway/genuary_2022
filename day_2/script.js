// Bayer dither code modified from https://github.com/meemoo/meemooapp/blob/main/src/nodes/image-monochrome-worker.js

let frames = 30,
    c,
    bg,
    font,
    img,
    time = 0.0;

let bayerMap = [
    [15, 135, 45, 165],
    [195, 75, 225, 105],
    [60, 180, 30, 150],
    [240, 120, 210, 90]
];

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
    img = loadImage('./zoey.jpg');
}

function setup() {
    createCanvas(1280, 1280);
    background("#ffffff");
    c = color("#000000");
    bg = color("#bada55");
}

function luminance(pixel) {
    let r = pixel[0] * 0.299;
    let g = pixel[1] * 0.587;
    let b = pixel[2] * 0.114;
    return floor(r + g + b);
}

function draw() {
    background(bg);
    noFill();

    imageMode(CENTER);
    image(img, width / 2, height / 1.6, img.width * 2, img.height * 2);

    loadPixels();
    let len = pixels.length;
    for (let i = 0; i <= len; i += 4) {
        let pixel = [pixels[i], pixels[i+1], pixels[i+2]];
        let lum = luminance(pixel);

        let x = (i / 4) % width;
        let y = floor((i / 4) / width);
        let amt = map(frameCount, 1, 15, 0.3, 0.8);
        let dither = floor((lum + bayerMap[x % 4][y % 4]) * .55) < 128 ? 0 : 255;

        if (dither === 255) {
            pixels[i] = 186;
            pixels[i+1] = 218;
            pixels[i+2] = 85;
        } else {
            pixels[i] = dither;
            pixels[i+1] = dither;
            pixels[i+2] = dither;
        }
    }
    updatePixels();

    noFill();
    stroke(c);
    strokeWeight(10);
    strokeCap(SQUARE);

    // Border
    line(95, 100, 150, 100); // Top L
    line(575, 100, width - 95, 100); // Top R
    line(100, 95, 100, height - 95); // Left
    line(width - 100, 95, width - 100, height - 95); // Right
    line(95, height - 100, 880, height - 100); // Bottom L
    line(1130, height - 100, width - 95, height - 100); // Bottom R

    noStroke();
    textSize(28);
    textFont(font);
    fill(c);
    text('#Genuary2022, Day 2', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}

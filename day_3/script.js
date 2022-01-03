// Bayer dither code modified from https://github.com/meemoo/meemooapp/blob/main/src/nodes/image-monochrome-worker.js

let frames = 30,
    c,
    bg,
    font,
    img,
    time = 0.0;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    background("#000000");
    c = color(150, 150, 255);
    bg = color("#000000");
}

function draw() {
    background(bg);
    noStroke();

    let angle = 0;
    for (let i = 0; i < 10000; i++) {
        let col = lerpColor(color(255, 255, 150, 50), color(150, 150, 255, 50), map(i, 0, 10000, 0, 1));
        fill(col);
        let x = sin(angle) * random(10, width / 2) + (width / 2);
        let y = cos(angle) * random(10, height / 2) + (height / 2);
        let r = map(noise(y), 0, 1, 1, 3);
        circle(x, y, r);
        angle += TWO_PI / 10000;
    }

    for (let i = 0; i < 10000; i++) {
        let col = lerpColor(color(150, 150, 255, 150), color(255, 255, 200, 150), map(i, 0, 10000, 0, 1));
        fill(col);
        let x = map(i, 0, 10000, 100, width - 100);
        let y = abs(sin(i)) * map(i, 0, 10000, 100, height - 100);
        let r = abs(cos(i)) * map(i, 0, 10000, 2, 5);
        circle(x, y, r);
    }

    push();
    translate(width, height);
    rotate(PI);
    for (let i = 0; i < 10000; i++) {
        let col = lerpColor(color(150, 150, 255, 150), color(255, 255, 200, 150), map(i, 0, 10000, 0, 1));
        fill(col);
        let x = map(i, 0, 10000, 100, width - 100);
        let y = abs(sin(i)) * map(i, 0, 10000, 100, height - 100);
        let r = abs(cos(i)) * map(i, 0, 10000, 1, 5);
        circle(x, y, r);
    }
    pop();

    fill(0, 0, 0, 255);
    rect(0, 0, width, 105);
    rect(0, height - 105, width, 105);
    rect(0, 0, 105, height);
    rect(width - 105, 0, width, height);

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
    text('#Genuary2022, Day 3', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}

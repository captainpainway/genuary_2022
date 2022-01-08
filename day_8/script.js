let c,
    bg,
    lines,
    font;

const scale = 100;
const smooth = 0.1;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#fcbf49";
    lines = color(252, 191, 73, 80);
    bg = color("#3d405b");
    background(bg);
}

function draw() {
    background(bg);
    fill(c);
    noStroke();

    noFill();
    stroke(lines);
    strokeWeight(1);
    let mid = createVector(width / 2, height / 2);
    let max = 1000;
    let offX = 3;
    let offY = 5;
    beginShape();
    for (let i = 0; i < max; i++) {
        let r = 400;
        let x  = sin(i * offX) * r + mid.x;
        let y = cos(i * offY) * r + mid.y;
        curveVertex(x, y);
    }
    endShape();

    noFill();
    stroke(c);
    strokeWeight(10);
    strokeCap(SQUARE);

    // Border
    line(95, 100, 150, 100); // Top L
    line(580, 100, width - 95, 100); // Top R
    line(100, 95, 100, height - 95); // Left
    line(width - 100, 95, width - 100, height - 95); // Right
    line(95, height - 100, 880, height - 100); // Bottom L
    line(1130, height - 100, width - 95, height - 100); // Bottom R

    noStroke();
    textSize(28);
    textFont(font);
    fill(c);
    text('#Genuary2022, Day 8', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}

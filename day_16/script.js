let c,
    bg,
    font,
    square_arr = [];

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#43fff9";
    bg = color("#16093b");
    background(bg);
    for (let x = 105; x < width - 110; x += 97.25) {
        for (let y = 105; y < height - 110; y += 97.25) {
            square_arr.push(createVector(x, y));
        }
    }
}

class GradientSquare {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(col1, col2) {
        strokeWeight(1);
        let lerp_amnt = 0.01;
        for (let i = this.y; i < this.y + 97.25; i++) {
            let col = lerpColor(color(col1), color(col2), lerp_amnt);
            stroke(col);
            line(this.x, i, this.x + 97.25, i);
            lerp_amnt += 0.01;
        }
    }
}

function randomColorGenerator() {
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    return color(r, g, b);
}

function draw() {
    background(bg);

    for (let s of square_arr) {
        let square = new GradientSquare(s.x, s.y);
        square.draw(randomColorGenerator(), randomColorGenerator());
    }

    stroke(c);
    strokeWeight(10);
    strokeCap(SQUARE);

    // Border
    line(95, 100, 150, 100); // Top L
    line(596, 100, width - 95, 100); // Top R
    line(100, 95, 100, height - 95); // Left
    line(width - 100, 95, width - 100, height - 95); // Right
    line(95, height - 100, 880, height - 100); // Bottom L
    line(1130, height - 100, width - 95, height - 100); // Bottom R

    noStroke();
    textSize(28);
    textFont(font);
    fill(c);
    text('#Genuary2022, Day 16', 160, 100);
    text('mary.codes', width - 385, height - 80);

    noLoop();
}

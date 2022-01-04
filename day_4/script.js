let c,
    bg,
    font,
    size = 30,
    max = 550,
    size_desc = size / max,
    colors = [],
    points = [];

const scale = 80;
const smooth = 0.0013;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    background("#000000");
    c = "#ee9b00";
    bg = color("#000000");
    noiseDetail(1);
    angleMode(DEGREES);
    colors = ["#001219","#005f73","#0a9396","#94d2bd","#e9d8a6","#ee9b00","#ca6702","#bb3e03","#ae2012","#9b2226"];

    for (let y = -height * 2; y < height * 2; y += scale) {
        for (let x = -width * 2; x < width * 2; x += scale) {
            let p = createVector(x + random(-10, 10), y + random(-10, 10));
            points.push(p);
        }
    }
}

function draw() {
    noStroke();
    let col = colors[0];
    fill(col);
    size -= size_desc;
    if (frameCount % 50 === 0) {
        colors.shift();
        colors.push(col);
    }

    for (let i = 0 ; i < points.length; i++) {
        let angle = map(noise(points[i].x * smooth, points[i].y * smooth), 0, 1, 0, 720);
        points[i].add(createVector(cos(angle), sin(angle)));
        circle(points[i].x, points[i].y, size);
    }


    if (frameCount > max) {
        console.log("Stopped");

        strokeWeight(0);
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
        text('#Genuary2022, Day 4', 160, 100);
        text('mary.codes', width - 385, height - 80);

        noLoop();
    }
}

let c,
    bg,
    font,
    size = 10,
    max = 200,
    size_desc = size / max,
    colors = [],
    points = [],
    all_points = [];

const scale = 100;
const smooth = 0.1;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#94d2bd";
    bg = color("#142b42");
    background(bg);
    noiseDetail(1);
    angleMode(DEGREES);

    for (let y = 200; y < height - 100; y += scale) {
        let new_points = [];
        for (let x = 300; x < width - 100; x += scale) {
            let p = createVector(x + random(-10, 10), y + random(-10, 10));
            points.push(p);
            new_points.push(createVector(p.x, p.y));
        }
        all_points.push(new_points);
    }

    for (let n = 0; n < max; n++) {
        let new_points = [];
        for (let i = 0 ; i < points.length; i++) {
            let angle = map(noise(points[i].x * smooth, points[i].y * smooth), 0, 1, 0, 720);
            let new_point = points[i].add(createVector(cos(angle), sin(angle)));
            new_points.push(createVector(new_point.x, new_point.y));
        }
        all_points.push(new_points);
    }
}

function draw() {
    noFill();
    strokeWeight(1);
    stroke(148, 210, 189, 50);

    for (let a of all_points) {
        beginShape();
        for (let p of a) {
            curveVertex(p.x, p.y);
        }
        endShape();
    }

    strokeWeight(0);

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
    text('#Genuary2022, Day 5', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}

// Sol LeWitt Wall Drawing #118
// "On a wall surface, any
// continuous stretch of wall,
// using a hard pencil, place
// fifty points at random.
// The points should be evenly
// distributed over the area
// of the wall. All of the
// points should be connected
// by straight lines."

let c,
    bg,
    lines,
    font,
    points = [];

const scale = 100;
const smooth = 0.1;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#2b2d42";
    lines = color(43, 45, 66, 10);
    bg = color("#edf2f4");
    background(bg);

    let grid = 1000;
    for (let y = 0; y < grid; y += 200) {
        for (let x = 0; x < grid; x += 100) {
            let rand = map(noise(x, y), 0, 1, 0, 100);
            let rand2 = map(noise(y, x), 0, 1, 0, 200);
            points.push(createVector(x + rand + 150, y + rand2 + 150));
        }
    }
}

function draw() {
    fill(c);
    noStroke();
    for (let p of points) {
        circle(p.x, p.y, 2);
    }

    noFill();
    stroke(lines);
    strokeWeight(1);
    for (let i of points) {
        for (let j of points) {
            if (i !== j) {
                line(i.x, i.y, j.x, j.y);
            }
        }
    }

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
    text('#Genuary2022, Day 7', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}

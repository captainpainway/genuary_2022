let c,
    bg,
    lines,
    font,
    points = [],
    roofs = [];

const scale = 100;
const smooth = 0.1;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#d7263d";
    lines = color(252, 191, 73, 80);
    bg = color("#f6ede7");
    background(bg);

    for (let y = 200; y < height - 100; y += height / 10) {
        let row = [];
        for (let x = 135; x < width - 150; x += width / 10) {
            row.push(createVector(x, y));
        }
        points.push(row);
    }
    points.reverse(); // Build from the ground up.
    roofs = points.map(_ => floor(random(1, points[0].length)));
}

function draw() {
    background(bg);
    fill(c);
    stroke('#09042d');
    strokeWeight(2);

    for (let r = 0; r < points.length; r++) {
        let row = points[r];
        for (let p = 0; p < row.length; p++) {
            let pt = row[p];
            push();
            translate(pt.x, pt.y);
            if (roofs[p] < r) {
                // No building above the roof!
            } else if (roofs[p] === r) {
                fill('#d7263d');
                triangle(0, 20, 60, -40, 120, 20);
            } else {
                fill('#1b5299');
                rect(0, 0, 120, 20);
                fill('#fca94a');
                rect(0, -10, 20, -90);
                rect(100, -10, 20, -90);
            }
            pop();
        }
    }

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
    text('#Genuary2022, Day 9', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}

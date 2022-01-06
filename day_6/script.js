let c,
    bg,
    font,
    size = 10,
    max = 800,
    palette,
    colors = [],
    points = [],
    lines = {};

const scale = 200;
const smooth = 0.0008;

function setup() {
    createCanvas(1280, 1280);
    c = "#000000";
    bg = color("#ffffff");
    background(bg);
    noiseDetail(1);
    angleMode(DEGREES);

    let num = 0;
    for (let y = 0; y < height; y += scale) {
        for (let x = 0; x < width; x += scale) {
            let p = createVector(x + random(-10, 10), y + random(-10, 10));
            lines[num] = [p];
            points.push(p);
            num++;
        }
    }

    for (let n = 0; n < max; n++) {
        for (let i = 0 ; i < points.length; i++) {
            let angle = map(noise(points[i].x * smooth, points[i].y * smooth), 0, 1, 0, 1080);
            let p = points[i].add(createVector(cos(angle), sin(angle)));
            lines[i].push(createVector(p.x, p.y));
        }
    }
}

function draw() {
    noFill();
    strokeWeight(1);

    for (let o of Object.values(lines)) {
        stroke(c);
        fill(c);
        let str = random(5, 50);
        let on = true;
        let rand = 20;
        for (let i = 0; i < o.length; i++) {
            if (i % rand === 0) {
                rand = floor(random(50, 100));
                on = !on;
                str = random(20, 50);
            }
            if (on) {
                rect(o[i].x, o[i].y, str, 5);
            }
            circle(o[i].x, o[i].y, 10);
        }
    }

    fill(bg);
    noStroke();

    beginShape();
    vertex(0, 0);
    vertex(width, 0);
    vertex(width, height);
    vertex(0, height);

    angleMode(RADIANS);
    beginContour();
    for (let n = 0; n < TWO_PI; n += TWO_PI / 100) {
        let r = 612;
        let x = sin(n) * r;
        let y = cos(n) * r;
        vertex(x + width / 2, y + height / 2);
    }
    endContour();
    endShape(CLOSE);

    noFill();
    stroke(c);
    strokeWeight(20);
    circle(width / 2, height / 2, width - 50, height - 50);

    noLoop();
}

let c,
    bg,
    font,
    circle1,
    circle2,
    circle3,
    speed = 4,
    max = 430,
    end = (max / speed) * 2,
    up = true;

const capturer = new CCapture({
    framerate: 60,
    format: 'gif',
    workersPath: '../common/js/',
    verbose: true
});

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#ffffff";
    bg = color("#000000");
    background(bg);

    circle1 = {x: width / 3, y: height / 3}
    circle2 = {x: width * 2/3, y: height / 3}
    circle3 = {x: width / 2, y: height * 2/3}
}

function draw() {
    if (frameCount === 1) {
        capturer.start();
    }

    background(bg);
    if (frameCount % floor(max / speed) === 0) {
        up = !up;
    }

    noStroke();
    blendMode(SCREEN);
    fill(color(255, 0, 0));
    circle(circle1.x, circle1.y, width / 2);
    if (up) {
        circle1.x += speed;
        circle1.y += speed;
    } else {
        circle1.x -= speed;
        circle1.y -= speed;
    }
    fill(color(0, 255, 0));
    circle(circle2.x, circle2.y, width / 2);
    if (up) {
        circle2.x -= speed;
        circle2.y += speed;
    } else {
        circle2.x += speed;
        circle2.y -= speed;
    }
    fill(color(0, 0, 255));
    circle(circle3.x, circle3.y, width / 2);
    if (up) {
        circle3.y -= speed
    } else {
        circle3.y += speed;
    }

    blendMode(BLEND);
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
    text('#Genuary2022, Day 17', 160, 110);
    text('mary.codes', width - 385, height - 90);
    capturer.capture(document.getElementById('defaultCanvas0'));

    if (frameCount === end) {
        capturer.stop()
        capturer.save();
    }
}

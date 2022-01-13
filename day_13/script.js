let c,
    bg,
    font,
    step = 0,
    frames = 200,
    lines = [],
    palette = ["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#4d908e","#277da1","#5427a1","#9750a6"];

const capturer = new CCapture({
    framerate: 60,
    format: 'gif',
    workersPath: '../common/js/',
    verbose: true
})

const osn = new OpenSimplexNoise();

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#070e01";
    bg = color("#ffffff");
    background('#ffffff');

    let start = 100;
    for (let i = 0; i < 10; i++) {
        let ht = (height - 300) / 10 * i + 200;
        for (let j = 0; j < 10; j++) {
            lines.push(createVector(random(start, start + 200), ht));
            start += 100;
        }
        start = 100;
    }
}

function octaveNoise(iterations, x, y, persistence, freq, low, high) {
    maxAmp = 0;
    amp = 1;
    noise = 0;

    for (i = 0; i < iterations; i++) {
        noise += osn.noise4D(x * freq, y * freq, sin(step), cos(step)) * amp;
        maxAmp += amp;
        amp *= persistence;
        freq *= 2
    }

    noise /= maxAmp;
    noise = noise * (high - low) / 2 + (high + low) / 2;
    return noise;
}

function draw() {
    if (frameCount === 1) {
        capturer.start();
    }

    step += TWO_PI / frames;

    background(bg);

    for (let i = 0; i < 10; i++) {
        fill(c);
        stroke(c);
        strokeWeight(1);
        rectMode(CENTER);
        let ht = (height - 300) / 10 * i + 200;
        rect(width / 2, ht, 800, 80);
    }

    for (let i = 0; i < 100; i++) {
        stroke(palette[i % 10]);
        strokeWeight(30);
        strokeCap(SQUARE);
        noFill();

        let ln = lines[i];
        beginShape();
        for (let x = ln.x; x < ln.x + 50; x++) {
            let y = octaveNoise(4, x, ln.y, 0.1, 0.01, -40, 40) + ln.y;
            if (x >= 1150) {
                ln.x = 100;
            } else {
                vertex(x, y);
            }
            lines[i] = createVector(ln.x + 1000 / frames, ln.y);
        }
        endShape();

    }

    fill(bg);
    noStroke();
    rect(154, 640, 170, 1000);
    rect(1126, 640, 170, 1000);

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
    text('#Genuary2022, Day 13', 160, 110);
    text('mary.codes', width - 385, height - 90);

    capturer.capture(document.getElementById('defaultCanvas0'));

    if (frameCount === frames) {
        noLoop();
        capturer.stop()
        capturer.save();
    }

}

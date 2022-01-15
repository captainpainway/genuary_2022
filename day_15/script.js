let c,
    bg,
    bg2,
    font,
    waves = [];

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1920, 1920);
    frameRate(60);
    bg2 = "#c22ee1";
    bg = "#080b50";
    c = "#ff5926";
    background(bg);
    let wave_height = 1100;
    for (let i = 0; i < 10; i++) {
        waves.push(wave_height);
        wave_height += 100;
    }
}

function draw() {
    for (let y = 0; y < 800; y++) {
        let col = lerpColor(color(bg2), color(bg), (1 / 800) * y);
        stroke(col);
        strokeWeight(1);
        line(0, y, width, y);
    }

    noStroke();
    fill('#ff5926');
    circle(width / 2.6, 270, 200);
    fill('#ff2656');
    circle(width / 1.5, 700, 300);

    noFill();
    for (let i = 0; i < waves.length; i++) {
        strokeWeight(300);
        let col = lerpColor(color('#b6ad90'), color('#582f0e'), 0.1 * i);
        stroke(col);
        beginShape();
        y = 0;
        for (let x = 0; x < width; x++) {
            vertex(x, sin(y + i) * 30 + waves[i]);
            if (i % 2 === 0) {
                y += 0.005;
            } else {
                y -= 0.005;
            }
        }
        endShape();
    }

    stroke(bg);
    strokeWeight(100);
    square(50, 50, width - 100);

    stroke(c);
    strokeWeight(10);
    square(100, 100, width - 200);

    noStroke();
    fill(bg);
    rect(150, 60, 450, 60);
    rect(width - 400, height - 115, 250, 60);

    textSize(28);
    textFont(font);
    fill(c);
    text('#Genuary2022, Day 15', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}
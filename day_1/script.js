let max = 10000,
    c,
    bg,
    font,
    time = 0.0;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1920, 1920);
    background("#ffffff");
    c = color(255, 100, 0, 250);
    bg = color("#271138");
}

function draw() {
    background(bg);
    noFill();

    for (let i = 0; i < max; i++) {
        let col = lerpColor(
            color(255, 100, 0, 75),
            color(100, 0, 255, 75),
            i / max
        )
        strokeWeight(3);
        stroke(col);
        let x = map(i, 0, max, 110, width - 110);
        let y = map(sin(x), 0, 1, 0, 600);
        circle(x, y + (height / 2), 30);
    }

    noFill();
    stroke(c);
    strokeWeight(10);
    square(100, 100, width - 200);

    noStroke();
    fill(bg);
    rect(145, 70, 430, 40);
    rect(width - 400, height - 105, 250, 56);

    noStroke();
    textSize(28);
    textFont(font);
    fill(c);
    text('#Genuary2022, Day 1', 160, 110);
    text('mary.codes', width - 385, height - 90);

    noLoop();
}

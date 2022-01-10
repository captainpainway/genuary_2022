let c,
    bg,
    font,
    model,
    pen,
    path,
    i = 0,
    scale = 5,
    locations = [];

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
    model = ml5.sketchRNN('flamingo', modelReady);
}

function setup() {
    createCanvas(1280, 1280);
    c = "#ef476f";
    bg = color("#f4f1de");
    for (let x = 150; x < width - 150; x += (width - 200) / 10) {
        for (let y = 150; y < height - 150; y += (height - 200) / 10) {
            locations.push(createVector(x, y));
        }
    }
    background(bg);
    startDrawing();
}

function modelReady() {
    startDrawing();
}

function startDrawing() {
    model.reset();
    model.generate(genPath);
}

function genPath(_, s) {
    path = s;
}

function draw() {
    stroke(c);

    if (frameCount === 1) {
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
        text('#Genuary2022, Day 10', 160, 110);
        text('mary.codes', width - 385, height - 90);
    }

    strokeWeight(1);
    if (path) {
        let noises = [];
        for (let j = 1; j < 6; j++) {
            let n = map(noise(frameCount * j, i * j), 0, 1, -3, 3);
            noises.push(n);
        }

        if (locations[i]) {
            if (pen === "down") {
                for (let noise of noises) {
                    line(
                        locations[i].x + noise,
                        locations[i].y + noise,
                        locations[i].x + path.dx / scale + noise,
                        locations[i].y + path.dy / scale + noise
                    );
                }
            }
            locations[i].add(createVector(path.dx / scale, path.dy / scale));
            pen = path.pen;
        }

        if (path.pen !== "end") {
            path = null;
            model.generate(genPath);
        } else {
            i++;
            if (i > locations.length) {
                noLoop();
            }
            startDrawing();
        }
    }
}

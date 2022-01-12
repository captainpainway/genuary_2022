let c,
    bg,
    font,
    stars = [],
    kills = 0;

function preload() {
    font = loadFont('../common/KronaOne-Regular.ttf');
}

function setup() {
    createCanvas(1280, 1280);
    c = "#ffc643";
    bg = color("#0a1128");
    background(bg);
}

class Star {
    constructor(x, y, r, i) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.idx = i;
        this.inner_r = r / 2;
        this.rotation = noise(x, y) * PI;
        this.color = lerpColor(color(c), color('#ffffff'), noise(x, y));
    }

    draw() {
        stroke(this.color);
        fill(this.color);
        strokeWeight(1);
        angleMode(RADIANS);
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        beginShape();
        let angle = 0;
        for (let i = 0; i <= 10; i++) {
            let x, y;
            if (i % 2 === 0) {
                 x = sin(angle) * this.r;
                 y = cos(angle) * this.r;
            } else {
                 x = sin(angle) * this.inner_r;
                 y = cos(angle) * this.inner_r;
            }
            vertex(x, y);
            angle += TWO_PI / 10;
        }
        endShape();
        if (this.idx % 2 === 0) { // "Open" star for ~half the stars.
            fill(bg);
            beginShape();
            angle = 0;
            for (let i = 0; i <= 10; i++) {
                let x, y;
                if (i % 2 === 0) {
                    x = sin(angle) * this.r / 2;
                    y = cos(angle) * this.r / 2;
                } else {
                    x = sin(angle) * this.inner_r / 2;
                    y = cos(angle) * this.inner_r / 2;
                }
                vertex(x, y);
                angle += TWO_PI / 10;
            }
            endShape();
        }
        pop();
    }

    grow() {
        this.r++;
        this.inner_r = this.r / 2;
        this.draw();
    }
}

function calcBorderCollision(star, array) {
    let removes = [];
    if (
        dist(star.x, star.y, width - 110, star.y) < star.r ||
        dist(star.x, star.y, 110, star.y) < star.r ||
        dist(star.x, star.y, star.x, 120) < star.r ||
        dist(star.x, star.y, star.x, height - 120) < star.r
    ) {
        if (star.r < 8) { // Remove any nearby stars that are too tiny.
            removes.push(array.indexOf(star));
            kills++;
        } else {
            return true;
        }
    }
    removes.reverse().forEach(remove => {
        array.splice(remove, 1);
    });
    return false;
}

function calcStarCollision(star, array) {
    let removes = [];
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let distance = dist(star.x, star.y, item.x, item.y);
        if (distance !== 0 && distance < (star.r + item.r)) {
            if (star.r < 8) { // Remove any nearby stars that are too tiny.
                removes.push(array.indexOf(star));
                kills++;
            } else {
                return true;
            }
        }
    }
    removes.reverse().forEach(remove => {
        array.splice(remove, 1);
    });
    return false;
}

function draw() {
    background(bg);

    let star = new Star(random(110, width - 110), random(120, height - 120), 1, frameCount);
    stars.push(star);

    for (let star of stars) {
        star.draw();
        if (calcBorderCollision(star, stars)) {
            // Stop growing
        } else if (calcStarCollision(star, stars)) {
            // Stop growing
        } else {
            star.grow();
        }
    }

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
    text('#Genuary2022, Day 12', 160, 110);
    text('mary.codes', width - 385, height - 90);

    if (kills > width) {
        console.log("stopped");
        noLoop();
    }
}

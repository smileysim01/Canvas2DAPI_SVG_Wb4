/**
 * 04-05-01.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020, February 2021
 *
 */

/**
 * If you want to read up on JavaScript classes, 
 * see the tutorial on the class website:
 * 
 * https://cs559.github.io/559Tutorials/javascript/oop-in-js-1/
 */
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     */
    constructor(x, y, vx = 1, vy = 0) {
        this.s = 0;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.s > 0? "red":"#DFFF00";
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.rotate(Math.atan2(this.vy,this.vx));
        context.beginPath();
        context.lineTo(10,0);
        context.lineTo(-5,5);
        context.lineTo(-5,-5);
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        /*
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the advanced points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        const angle = 2 * Math.PI / 180;
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        let ovx = this.vx;
        let ovy = this.vy;

        this.vx =  ovx * c + ovy * s;
        this.vy = -ovx * s + ovy * c;
		*/
    }
}


/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

 /** @type Array<Boid> */
let boids = [];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
let context = canvas.getContext("2d");

let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    boids.forEach(boid => boid.draw(context));
}

/**
 * Create some initial boids
 * STUDENT: may want to replace this
 */
boids.push(new Boid(100, 100));
boids.push(new Boid(200, 200, -1, 0));
boids.push(new Boid(300, 300, 0, -1));
boids.push(new Boid(400, 400, 0, 1));

/**
 * Handle the buttons
 */
document.getElementById("add").onclick = function () {
    for(let i=0; i<10; i++){
        let add_x = Math.random()*canvas.width;
        let add_y = Math.random()*canvas.height;
        let angle = Math.random()*2*Math.PI;

        boids.push(new Boid(add_x,add_y,Math.cos(angle),Math.sin(angle)));
    }
};
document.getElementById("clear").onclick = function () {
    boids.length = 0;
};

let lastTime; // will be undefined by default
/**
 * The Actual Execution
 */
function loop(timestamp) {
    // time step - convert to 1/60th of a second frames
    // 1000ms / 60fps
    const delta = (lastTime ? timestamp-lastTime : 0) * 1000.0/60.0;

    // change directions
    boids.forEach(boid => boid.steer(boids));

    // move forward
    let speed = Number(speedSlider.value);
    boids.forEach(function (boid) {
        boid.x += boid.vx * speed;
        boid.y += boid.vy * speed;
    });
    // make sure that we stay on the screen
    boids.forEach(function (boid) {
        /**
         * Students should replace this with collision code
         */
        // boid.x = boid.x % canvas.width;
        // boid.y = boid.y % canvas.height;
        // if (boid.x < 0) boid.x += canvas.width;
        // if (boid.y < 0) boid.y += canvas.height;
        boids.forEach(function(boid2){
            if(((Math.pow(boid.x-boid2.x,2)+Math.pow(boid.y-boid2.y,2) <= 144) && (boid.x != boid2.x || boid.y != boid2.y))){
                boid.s = 12;
                if(boid.x != boid2.x){
                    boid2.vx *= -1;
                    boid2.x = 2*boid2.x - boid.x;
                }
                if(boid.y != boid2.y){
                    boid2.y = 2*boid2.y - boid.y;
                    boid2.vy *= -1;
                }
            }
        });
        if(boid.x >= canvas.width){
            boid.vx *= -1;
            boid.s = 12;
            boid.x = (2*canvas.width) - boid.x;
        }
        else if(boid.x <= 0){
            boid.vx *= -1;
            boid.s = 12;
            boid.x *= -1;
        }
        if(boid.y >= canvas.height){
            boid.vy *= -1;
            boid.s = 12;
            boid.y = (2*canvas.height) - boid.y;
        }
        else if(boid.y <= 0){
            boid.vy *= -1;
            boid.s = 12;
            boid.y *= -1;
        }

        boid.s = Math.max(0,boid.s-1);
    });
    // now we can draw
    draw();
    // and loop
    window.requestAnimationFrame(loop);

}
// start the loop with the first iteration
window.requestAnimationFrame(loop);



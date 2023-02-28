/**
 * CS559 Spring 2023 Example Solution
 * Written by CS559 course staff
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { runCanvas } from "../libs/CS559/runCanvas.js";

/* no need for onload - we use defer */

/* note how the draw function takes two arguments: the canvas and the time */
/* note that this is DIFFERENT than what we need for requestAnimationFrame */

/**
 * These parameter specifications are used by the type checker to find bugs!
 * @param {HTMLCanvasElement} canvas 
 * @param {Number} time 
 */

function myDraw(canvas, time) {
    //student should fill this in
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.save();
    context.translate(canvas.width/2, canvas.height/2);
    context.rotate(time*Math.PI*2);
    context.scale(1.5,1.5);
    context.fillStyle = "#FFCE30";
    context.strokeStyle = "blue";
    context.lineWidth = 3;
    context.beginPath();
    context.lineTo(20,40);
    context.lineTo(-20,40);
    context.lineTo(0,0);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();

    context.save();
    context.translate(canvas.width/2, canvas.height/2);
    context.rotate(time*Math.PI*2);
    context.scale(-1.5,-1.5);
    context.fillStyle = "#FFCE30";
    context.strokeStyle = "blue";
    context.lineWidth = 3;
    context.beginPath();
    context.lineTo(20,40);
    context.lineTo(-20,40);
    context.lineTo(0,0);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}

// note - we can pass "runCanvas" either the name of the canvas, or the canvas element
runCanvas("canvas1",myDraw, 2 /* student will want to change the parameters */);

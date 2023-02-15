// @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "../libs/CS559/dragPoints.js";

/**
 * drawing function for box 2
 *
 * Use this UI code!
 **/

/* no need for onload - we use defer */


let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let thePoints = [
    [100, 100],
    [200, 100],
    [200, 200],
    [100, 200]
];

/**
 * the draw function - which the student will fill in - takes a 
 * timestamp parameter, because it will be passed to requestAnimationFrame
 * 
 * However, in most cases, you can ignore the timestamp
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function draw(timestamp) {
    // Begin Example Solution
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineJoin = "round";
    /** @type {number} */ const r0 = 10;
    // Draw a circle for each point
    thePoints.forEach(function (pt) {
        context.save();
        context.translate(pt[0], pt[1]);
        context.beginPath();
        context.arc(0, 0, r0, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    });
    // Draw a line connecting the points
    context.save();
    let n = thePoints.length - 1;
    context.beginPath();
    context.moveTo(thePoints[n][0], thePoints[n][1]);
    context.lineWidth = r0 / 2;
    thePoints.forEach(pt => context.lineTo(pt[0], pt[1]));
    context.stroke();
    context.restore();
    // End Example Solution
}

draggablePoints(canvas, thePoints, draw);

// draw things when everything is ready
window.requestAnimationFrame(draw);


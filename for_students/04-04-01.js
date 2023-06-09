/**
 * 04-04-01.js - a simple JavaScript file that gets loaded with
 * page 4 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as utilities from "./04-04-utilities.js";

/**
 * TwoDots - a function for the student to write
 * Notice that it gets the two points and the context as arguments
 * This function should apply a transformation
 *
 * You must write this function using rotate, translate and scale
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots(context, x1, y1, x2, y2) {
    context.save();
    context.translate(x1, y1);

    let s = Math.pow((Math.pow(x2-x1,2)+Math.pow(y2-y1,2)),0.5)/10;

    context.scale(s, s);
    context.rotate(Math.atan2((y2-y1),(x2-x1)));
}

utilities.setup("canvas1", twoDots, "black");



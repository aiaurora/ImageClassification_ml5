// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
//let img1, img2, img3, d;

// Return the number of milliseconds since 1970/01/01
var start = new Date().getTime();

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  img1 = loadImage('images/bird.jpg');
  img2 = loadImage('images/kitten.jpg');
  img3 = loadImage('images/eagle.jpg');
}

function setup() {
  createCanvas(1500, 500);
  image(img1, 0, 0);
  image(img2, 420, 0);
  image(img3, 830, 0);
  createDiv('First classification request start off as ' + (new Date().getTime() - start) + ' milliseconds').position(10, 480); 
  d = 10; 
  classifier.classify(img1, gotResult);    //#1
  setTimeout(() => {
            d = 430;
            classifier.classify(img2, gotResult);    //#2
        }, 5000);    /* execute =>{code segment} after 5000 milliseconds from this end*/  
  setTimeout(() => {
            d = 840;
            classifier.classify(img3, gotResult);    //#3
        }, 6000);    /* execute =>{code segment} after 7000 milliseconds from this end*/  
  /*the latter classify-response is faster than the first classify-response 'cause of server-call wakeup*/
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  // many results predicted for the image are in order, here show the first only.
  console.log(results);
  createDiv('Label: ' + results[0].label).position(d, 500);
  createDiv('Confidence: ' + nf(results[0].confidence, 0, 2)).position(d, 520); 
  createDiv('Return classification response at '+ (new Date().getTime() - start) + ' milliseconds').position(d, 540); 
}
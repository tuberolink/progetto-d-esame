let font;

function preload() {
  font = loadFont('Minecraft.ttf');
}
var myCapture, // camera
  myVida; // VIDA

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var myVoice = new p5.Speech(); // new P5.Speech object

myRec.continuous = true; // do continuous recognition
//myRec.interimResults = true; // allow partial recognition (faster, less accurate)

/*
  Here we are trying to get access to the camera.
*/
function initCaptureDevice() {
  try {
    myCapture = createCapture(VIDEO);
    myCapture.size(100, 100);
    myCapture.elt.setAttribute("playsinline", "");
    myCapture.hide();
    console.log(
      "[initCaptureDevice] capture ready. Resolution: " +
        myCapture.width +
        " " +
        myCapture.height
    );
  } catch (_err) {
    console.log("[initCaptureDevice] capture error: " + _err);
  }
}

function setup() {
  myRec.onResult = showResult1;
  myRec.start();

  myVoice.speak("please, talk to me");

  pixelDensity(1);
  createCanvas(windowWidth, windowHeight); // we need some space...
  background(245, 232, 188);
  initCaptureDevice(); // and access to the camera

  /*
    VIDA stuff. One parameter - the current sketch - should be passed to the
    class constructor (thanks to this you can use Vida e.g. in the instance
    mode).
  */
  myVida = new Vida(this); // create the object
  /*
    Turn on the progressive background mode.
  */
  myVida.progressiveBackgroundFlag = true;
  /*
    The value of the feedback for the procedure that calculates the background
    image in progressive mode. The value should be in the range from 0.0 to 1.0
    (float). Typical values of this variable are in the range between ~0.9 and
    ~0.98.
  */
  myVida.imageFilterFeedback = 0.92;
  /*
    The value of the threshold for the procedure that calculates the threshold
    image. The value should be in the range from 0.0 to 1.0 (float).
  */
  myVida.imageFilterThreshold = 0.15;
  /*
    You may need a horizontal image flip when working with the video camera.
    If you need a different kind of mirror, here are the possibilities:
      [your vida object].MIRROR_NONE
      [your vida object].MIRROR_VERTICAL
      [your vida object].MIRROR_HORIZONTAL
      [your vida object].MIRROR_BOTH
    The default value is MIRROR_NONE.
  */
  myVida.mirror = myVida.MIRROR_HORIZONTAL;
  /*
    In order for VIDA to handle blob detection (it doesn't by default), we set
    this flag.
  */
  myVida.handleBlobsFlag = true;
  /*
    Normalized values of parameters defining the smallest and highest allowable
    mass of the blob.
  */
  //myVida.normMinBlobMass = 0.0002;  // uncomment if needed
  //myVida.normMaxBlobMass = 0.5;  // uncomment if needed
  /*
    Normalized values of parameters defining the smallest and highest allowable
    area of the blob boiunding box.
  */
  //myVida.normMinBlobArea = 0.0002;  // uncomment if needed
  //myVida.normMaxBlobArea = 0.5;  // uncomment if needed
  /*
    If this flag is set to "true", VIDA will try to maintain permanent
    identifiers of detected blobs that seem to be a continuation of the
    movement of objects detected earlier - this prevents random changes of
    identifiers when changing the number and location of detected blobs.
  */
  myVida.trackBlobsFlag = true;
  /*
    Normalized value of the distance between the tested blobs of the current
    and previous generation, which allows treating the new blob as the
    continuation of the "elder".
  */
  //myVida.trackBlobsMaxNormDist = 0.3; // uncomment if needed
  /*
    VIDA may prefer smaller blobs located inside larger or the opposite: reject
    smaller blobs inside larger ones. The mechanism can also be completely
    disabled. Here are the possibilities:
      [your vida object].REJECT_NONE_BLOBS
      [your vida object].REJECT_INNER_BLOBS
      [your vida object].REJECT_OUTER_BLOBS
    The default value is REJECT_NONE_BLOBS.
  */
  //myVida.rejectBlobsMethod = myVida.REJECT_NONE_BLOBS; // uncomment if needed
  /*
    If this flag is set to "true", VIDA will generate polygons that correspond
    approximately to the shape of the blob. If this flag is set to "false", the
    polygons will not be generated. Default vaulue is false. Note: generating
    polygons can be burdensome for the CPU - turn it off if you do not need it.
  */
  myVida.approximateBlobPolygonsFlag = true;
  /*
    Variable (integer) that stores the value corresponding to the number of
    polygon points describing the shape of the blobs. The minimum value of this
    variable is 3.
  */
  myVida.pointsPerApproximatedBlobPolygon = 8;

  frameRate(30); // set framerate
}

function showResult1() {
  if (myRec.resultValue === true) {
    //myVoice.interrupt = checkbox.elt.checked;
    myVoice.speak(myRec.resultString); // debug printer for voice options
    console.log(myRec.resultString);
  }
}

function showResult2() {
  if (myRec.resultValue === true) {
    //push();
    
     let xoff = 0;
     let yoff = 0;
    
      xoff += 10;
      yoff += 10;
      let rectX = noise(xoff, yoff);
      rectX = map(rectX, 0, 1, 0, width);
      let rectY = noise(yoff);
      rectY = map(rectY, 0, 1, 0, height);
    
    
     var offset_y = 200;   
    text(myRec.resultString, random(width), random(height / 2, height));
    //pop()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  
  let inc1 = 0
  let inc2 = 0
  let inc3 = 0
  
  inc1 += 0.005;
  inc2 += 0.005;
  inc3 += 0.005;
  let redRandom = noise(inc1);
  redRandom = map(redRandom, 0, 1, 35, 200);
  let greenRandom = noise(inc2);
  greenRandom = map(greenRandom, 0, 1, 20, 150);
  let blueRandom = noise(inc3);
  blueRandom = map(blueRandom, 0, 1, 20, 0);
  
  
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  if (myCapture !== null && myCapture !== undefined) {
    // safety first
    /*push();
    fill(100);
    rect(0, 0, windowWidht, 200);
    pop();
    */
    //background(245, 232, 188);
    //push();
    fill(random(0,180),0, 0, random(0,255));
    // instructions:
    textFont(font);
    textStyle(BOLD);
    textWrap(WORD);
    textAlign(CENTER);
    textSize(200);
    
    
    showResult2();
    //pop();
    //clear();
    //textAlign(CENTER);
    //text(myRec.resultString, width / 2, height / 2);
    push();
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(50);    
    text("TALK TO ME",width / 2, height - 300);
    pop();
    //clear();
    /*
      Call VIDA update function, to which we pass the current video frame as a
      parameter. Usually this function is called in the draw loop (once per
      repetition).
    */
    myVida.update(myCapture);
    /*
      Now we can display images: source video (mirrored) and subsequent stages
      of image transformations made by VIDA.
    */
    //image(myVida.currentImage, 0, 0);
    //image(myVida.backgroundImage, 320, 0);
    //image(myVida.differenceImage, 0, 240);
    //image(myVida.thresholdImage, 20, 240);
    // let's also describe the displayed images
    //noStroke(); fill(255, 255, 255);
    //text('camera', 20, 20);
    //text('vida: progressive background image', 340, 20);
    //text('vida: difference image', 20, 260);
    //text('vida: threshold image', 340, 260);
    /*
      VIDA has two built-in versions of the function drawing detected blobs:
        [your vida object].drawBlobs(x, y);
      and
        [your vida object].drawBlobs(x, y, w, h);
      But we want to create our own drawing function, which at the same time
      will be used for the current handling of blobs and reading their
      parameters.
      To manually get to the data describing detected blobs we call the
      [your vida object].getBlobs() function, which returns an array containing
      detected blobs. This function (although it does not make any
      time-consuming calculations) should be called at most once per draw()
      loop, because (if you do not use VIDA in an unusual way, you trickster)
      the parameters of the blobs do not change within one frame.
    */
    var temp_blobs = myVida.getBlobs();
    // define size of the drawing
    var temp_w = width - 95;
    var temp_h = height - 450;
    // offset from the upper left corner
    var offset_x = 50;
    var offset_y = 50;
    // pixel-based blob coords
    var temp_rect_x,
      temp_rect_y,
      temp_rect_w,
      temp_rect_h,
      temp_mass_center_x,
      temp_mass_center_y;
    push(); // store current drawing style and font
    translate(offset_x, offset_y); // translate coords
    // set text style and font
    textFont("Helvetica", 10);
    textAlign(LEFT, BOTTOM);
    textStyle(NORMAL);
    // let's iterate over all detected blobs and draw them
    for (var i = 0; i < temp_blobs.length; i++) {
      /*
        Having access directly to objects that store detected blobs, we can
        read values of the individual parameters. Here is a list of parameters
        to which we have access:
          normRectX, normRectY, normRectW, normRectH - normalized coordinates
        of the rectangle in which the blob is contained (bounding box).;
          normMassCenterX, normMassCenterY, normMass - normalized parameters of
        the blob's "mass"; the "mass" is calculated based on the ratio of the
        number of pixels occupied by the blob to the number of pixels in the
        image being processed; the mass center is calculated based on the
        average position of the pixels that make up the blob;
          approximatedPolygon - an array storing normalized coordinates of the
        approximate polygon "describing" the blob; every cell of the array
        contains one point (format: {normX: float, normY: float}); if detecting
        polygon is disabled, the array will be empty;
          creationTime, creationFrameCount - detection time of the blob
        expressed in milliseconds and frames;
          id - unique identifier (integer) of the blob; if blob tracking is also
        enabled in addition to the detection of blobs, VIDA will try to
        recognize the blobs in subsequent frames and give them the same
        identifiers;
          isNewFlag - the flag whose value will be "true" if the blob is
        considered new (as a result of blob tracking mechanism); otherwise, the
        flag will be set to "false".
      */
      // convert norm coords to pixel-based
      temp_rect_x = Math.floor(temp_blobs[i].normRectX * temp_w);
      temp_rect_y = Math.floor(temp_blobs[i].normRectY * temp_h);
      temp_rect_w = Math.floor(temp_blobs[i].normRectW * temp_w);
      temp_rect_h = Math.floor(temp_blobs[i].normRectH * temp_h);
      temp_mass_center_x = Math.floor(temp_blobs[i].normMassCenterX * temp_w);
      temp_mass_center_y = Math.floor(temp_blobs[i].normMassCenterY * temp_h);
      // draw bounding box
      strokeWeight(5);
      stroke(0, 0, 0);
      noFill();
      rect(temp_rect_x, temp_rect_y, temp_rect_w, temp_rect_h);
      // draw mass center
      //noStroke(); fill(r, g , b); ellipseMode(CENTER);
      //ellipse(temp_mass_center_x, temp_mass_center_y, 3, 3);
      // print id
      //noStroke();
      //fill(117, 0, 0);
      //textSize(30);
      //text(temp_blobs[i].id, temp_rect_x, temp_rect_y - 1);
      // draw approximated polygon (if available)
      strokeWeight(4);
      stroke(245, 232, 188);
      noFill();
      beginShape();
      for (var j = 0; j < temp_blobs[i].approximatedPolygon.length; j++) {
        vertex(
          temp_blobs[i].approximatedPolygon[j].normX * temp_w,
          temp_blobs[i].approximatedPolygon[j].normY * temp_h
        );
      }
      endShape(CLOSE);
    }
    pop(); // restore memorized drawing style and font
  }
}
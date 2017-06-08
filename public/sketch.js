var socket = io(); //connect the socket

var col = { //object with the colour of the drawn line
  r: 255,
  g: 0,
  b: 0
};

function setup() {
  //setup the canvas
  createCanvas(600, 400);
  background(42, 169, 217);

}

function draw() {
  //draw loop for the canvas
  // background
  col.r = random(0, 255); //randomise the rgb colour, doesnt matter if we leave dot points because it rounds the numbers for the colour.
  col.g = random(0,255);
  col.b = random(0, 255);


}

function mouseDragged() {
  //draw a line when the mouse is dragged along the dragged position
  fill(col.r, col.g, col.b, random(0, 100));
  stroke(col.r, col.g, col.b)
  strokeWeight(10);
   line(mouseX, mouseY, pmouseX, pmouseY);

   socket.emit('draw', { //send to server the information about the line
     colour: col,
     x: mouseX,
     px: pmouseX,
     y: mouseY,
     py: pmouseY
   });
   // prevent default
   return false;
}
socket.on('drawLine', function(lin){ //get information about line when another user sends information about that drawn line

  fill(lin.colour.r, lin.colour.g, lin.colour.b, random(0, 100));
  stroke(lin.colour.r, lin.colour.g,lin.colour.b)
  strokeWeight(10);
   line(lin.x, lin.y, lin.px, lin.py);
});

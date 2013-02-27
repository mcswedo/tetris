//Cell.js
//Original by David Turner, edits and additions by Michael Swedo and Deanna Sulli

function Cell(type, x, y) {  
  this.type = type;
  this.x = x;
  this.y = y;
}

Cell.prototype.draw = function(ctx) {
  ctx.drawImage(cellPictures[this.type], this.x * CELL_SIZE, this.y * CELL_SIZE);
};

Cell.prototype.drop = function() {
  ++this.y;
}

Cell.prototype.moveLeft = function() {
  --this.x;
}

Cell.prototype.moveRight = function() {
  ++this.x;
}

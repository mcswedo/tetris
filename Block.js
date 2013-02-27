//Block.js
//Original by David Turner, edits and additions by Michael Swedo and Deanna Sulli

function Block(type, x, y) {
   this.rots = [];
   this.type = type;
   this.cells = [];
   this.r = 0; //rotation 
   this.x = x;
   this.y = y;

   /*Block Type Case Statement.
      Type === 0 = "LINE" Block. Drawn from LOWEST BLOCK.
      Type === 1 = "SQUARE" Block. Drawn from LOWER LEFT CORNER.
      Type === 2 = "Z" Block. Drawn from LOWER MIDDLE BLOCK.
      Type === 3 = "S" Block. Drawn from LOWER MIDDLE BLOCK.
      Type === 4 = "T" Block. Drawn from STEM OF T. LOWER MIDDLE.
      Type === 5 = "L" Block. Drawn from LOWER LEFT CORNER.
      Type === 6 = "J" Block. Drawn from LOWER RIGHT CORNER.

   LL = lower left, UL = upper left, LR = lower right, UR = upper right, UM = upper middle, LM = lower middle
   */
   if (this.type === 0) {
      this.rots = [
		    [[0,0],[0,-1],[0,1], [0,2]],
		    [[0,0],[-1,0],[-2,0], [1,0]],
  		  [[0,0],[0,-1],[0,1], [0,2]],
  		  [[0,0],[-1,0],[-2,0], [1,0]]
	   ];
   }
   if (this.type === 1) {
      this.rots = [
  		  [[0,0],[0,-1],[1,0], [1,-1]],
  		  [[0,0],[0,-1],[1,0], [1,-1]],
  		  [[0,0],[0,-1],[1,0], [1,-1]],
  		  [[0,0],[0,-1],[1,0], [1,-1]]
	];
   }
   if (this.type === 2) {
      this.rots = [
  	  	[[0,0],[-1,0],[0,1], [1,1]],
  		  [[0,0],[-1,0],[0,-1], [-1,1]],
  		  [[0,0],[-1,0],[0,1], [1,1]],
  		  [[0,0],[-1,0],[0,-1], [-1,1]]
	  ];
   }
   if (this.type === 3) {
      this.rots = [
  	  	[[0,0],[0,1],[-1,1], [1,0]],
  		  [[0,0],[0,-1],[1,0], [1,1]],
  		  [[0,0],[0,1],[-1,1], [1,0]],
  		  [[0,0],[0,-1],[1,0], [1,1]]
	  ];
   }
   if (this.type === 4) {
      this.rots = [
  	  	[[0,0],[-1,0],[1,0], [0,1]],
  		  [[0,0],[-1,0],[0,-1], [0,1]],
  		  [[0,0],[-1,0],[1,0], [0,-1]],
  		  [[0,0],[1,0],[0,-1], [0,1]]
	  ];
   }
   if (this.type === 5) {
      this.rots = [
  	  	[[0,0],[0,-1],[0,1], [1,1]],
  		  [[0,0],[-1,0],[1,0], [-1,1]],
  		  [[0,0],[0,-1],[0,1], [-1,-1]],
  		  [[0,0],[-1,0],[1,0], [1,-1]]
	  ];
   }
   if (this.type === 6) {
      this.rots = [
  	  	[[0,0],[0,-1],[0,1], [-1,1]],
  		  [[0,0],[1,0],[-1,0], [-1,-1]],
  		  [[0,0],[0,-1],[0,1], [1,-1]],
  		  [[0,0],[-1,0],[1,0], [1,1]]
	  ];
   }
   
   for(var i = 0; i < 4; ++i) {
		this.cells.push(new Cell(this.type, this.rots[this.r][i][0] + this.x, this.rots[this.r][i][1] + this.y));
   }
};


Block.prototype.draw = function(ctx) {
   for (var i = 0; i < 4; ++i) {
      this.cells[i].draw(ctx);
   }
};

Block.prototype.wouldDropCollide = function(otherCell) {
   for (var i = 0; i < 4; ++i) {
     var cellX = this.x + this.rots[this.r][i][0];
	 var cellY = this.y + this.rots[this.r][i][1];
     for (var j = 0; j < 4; ++j) {
       if (otherCell.x == cellX && otherCell.y == cellY + 1) {
         return true;
       }
     }
   }
   return false;
};

Block.prototype.drop = function() {
   ++this.y;
   for (var i = 0; i < 4; ++i) this.cells[i].drop();
};

Block.prototype.moveLeft = function() {
   --this.x;
   for (var i = 0; i < 4; ++i) this.cells[i].moveLeft();
};

Block.prototype.moveRight = function() {
   ++this.x;
   for (var i = 0; i < 4; ++i) this.cells[i].moveRight();
};


Block.prototype.wouldLeftCollide = function(otherCell) {
	 for (var i = 0; i < 4; ++i) {
     var cell = this.cells[i];
     for (var j = 0; j < 4; ++j) {
       if (otherCell.x == cell.x - 1 && otherCell.y == cell.y) {
         return true;
       }
     }
   }
   return false;
}

Block.prototype.canMoveLeft = function() {
	for(var i = 0; i < 4; ++i) {
		var cellX = this.cells[i].x;
		if(cellX <= 0) {
			return false;
		}
	}
	
	for (var i = 0; i < inactiveCells.length; ++i) {
     if (activeBlock.wouldLeftCollide(inactiveCells[i])) {
       return false;
     }
	}
	
	return true;
};

Block.prototype.wouldRightCollide = function(otherCell) {
	 for (var i = 0; i < 4; ++i) {
     var cell = this.cells[i];
     for (var j = 0; j < 4; ++j) {
       if (otherCell.x == cell.x + 1 && otherCell.y == cell.y) {
         return true;
       }
     }
   }
   return false;
}

Block.prototype.canMoveRight = function() {
	for(var i = 0; i < 4; ++i) {
		var cell = this.cells[i];
		if(cell.x >= 9) {
			return false;
		}
	}
	
	for (var i = 0; i < inactiveCells.length; ++i) {
     if (activeBlock.wouldRightCollide(inactiveCells[i])) {
       return false;
     }
	}
	
	return true;
};

Block.prototype.canDrop = function() {
   for(var i = 0; i < 4; i ++) {
    var cellY = this.y + this.rots[this.r][i][1];
    if(cellY >= 17) {
      return false;
    }
  }
  for(var i = 0; i < inactiveCells.length; ++i) {
    if(activeBlock.wouldDropCollide(inactiveCells[i])) {
      return false;
    }
  }

  return true;
}

Block.prototype.isOverlapping = function(otherCell) {
  for(var i = 0; i < 4; ++i) {
    var cellX = this.x + this.rots[this.r][i][0];
    var cellY = this.y + this.rots[this.r][i][1];

    for(var j = 0; j < 4; ++j) {

      if(otherCell.x === cellX && otherCell.y === cellY) {
        return true;
      }
    }
  }
	return false;
};


Block.prototype.rotate = function() {
  this.r = ++this.r % 4;
	var newCells = [];
  var oldCells = activeBlock.cells;    
  
  for(var i = 0; i < 4; i++) {
	  newCells.push(new Cell(this.type, this.rots[this.r][i][0] + this.x, this.rots[this.r][i][1] + this.y));
  }

  for(var i = 0; i < 4; i++) {
	  if(newCells[i].x > 9) {
	    while(newCells[i].x > 9) for(var j = 0; j < 4; j++) newCells[j].moveLeft();
	  }

	  if(newCells[i].x < 0) {
	    while(newCells[i].x < 0) for(var k = 0; k < 4; k++) newCells[k].moveRight();
	  }

	  if(newCells[i].y > 17) {
	    while(newCells[i].y > 17) for(var k = 0; k < 4; k++) newCells[k].y--;
	  }
  }

  activeBlock.cells = newCells;

  for(var j = 0; j < inactiveCells.length; j++) {
	  if(activeBlock.isOverlapping(inactiveCells[j])) {
	    activeBlock.cells = oldCells;
	    if(this.r > 0) this.r--;
	    else this.r = 4;
	  }
  }
};

//The Javascript for Moving the Tetris Pieces Around 

//Movement Events with jQuery Library

    $(document).keydown(function(e){
        if (e.keyCode == 37) { //Left Arrow
            if(activeBlock.canMoveLeft()) {
              activeBlock.moveLeft();
              draw();
            }
        }
        if (e.keyCode == 39) { //Right Arrow
            if(activeBlock.canMoveRight()) {
              activeBlock.moveRight();
              draw();
            }
        }
        if (e.keyCode == 32) { //Spacebar
            activeBlock.rotate();
            draw();
        }
        if (e.keyCode == 40) { //Down Arrow
            downIsPressed = true;
            increaseSpeed();
            draw();
        }
    });

    $(document).keyup(function(e){
        if (e.keyCode == 40) {
          downIsPressed = false;
          resetSpeed();
        }
    });


//Movement for TouchScreens

    $(document).swipeleft(function(){ // When user swipes left the piece will move left
        if(activeBlock.canMoveLeft()) {
          activeBlock.moveLeft();
          draw();
        }
    });

    $(document).swiperight(function(){ // When user swipes right the piece will move right
        if(activeBlock.canMoveRight()) {
          activeBlock.moveRight();
        }
    });

    $(document).tap(function(){ // When user Taps on Screen Rotates piece
        activeBlock.rotate();
        draw();
    });

    $(document).taphold(function(){ //touch and hold finger on screen for 750ms to activate
      increaseSpeed();
      draw();
    });

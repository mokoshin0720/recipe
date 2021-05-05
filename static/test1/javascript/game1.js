(function() {
  function game1(){
  	// 汎用変数
    run = false;
    run_rest = false;
    run_game1 = true;
    run_game2 = false;
    run_game3 = false;
    run_game4 = false;
    run_game5 = false;
    game1_bool = true;
    game1_word ={
      w: "GOOD!",
      c: "rgba(255,0,0,1.0)"
    };

    //時間
    game1_fps = 10;
    game1_timecount = 0;
    game1_number = 5;

  	//ボール
  	game1_pos = {x:canvas.width/2, y:canvas.height-30};
  	game1_vel = {
      x: Math.random() * 2 -2,
      y: Math.random() * -1 -5
    };
  	game1_ballRadius = 10;
  	game1_ballcolor = "rgba(0,0,255,1.0)";

  	//パドル
  	game1_paddleHeight = 10;
  	game1_paddleWidth = 75;
  	keyDown[key.A] = false;
  	keyDown[key.D] = false;
  	game1_paddle = {
  		x: (canvas.width-game1_paddleWidth)/2,
  		y: canvas.height - game1_paddleHeight*2
  	};

  	//ブロック
  	game1_brick_height = 3;
  	game1_brick_width = 7;
  	game1_brickWidth = 75;
  	game1_brickHeight = 20;
  	game1_brickPadding = 20;
  	game1_brickOffsetTop = canvas.height/8;

  	if(game1_brick_width%2 == 0){
  		game1_brickOffsetLeft = canvas.width/2 - (game1_brickWidth * game1_brick_width%2
  													+ game1_brickPadding * (game1_brick_width%2-0.5));	//x軸合わせ
  	}else {
  		game1_brickOffsetLeft = canvas.width/2 - (game1_brickWidth * ((game1_brick_width-1)/2+0.5)
  													+ game1_brickPadding * ((game1_brick_width-1)/2));	//x軸合わせ
  	}

  	game1_bricks = [];
  	  for(var i = 0; i < game1_brick_width; i++) {
  	      game1_bricks[i] = [];
  	      for(var j = 0; j < game1_brick_height; j++) {
  	          game1_bricks[i][j] = {
                x: 0,
                y: 0,
                status: 1
              };
  	      }
  	  }

  	// スクリーンの初期化
  	ctx.clearRect(0, 0, canvas.width, canvas.height);

  	//イベント
  	//ブロック
  	function drawBricks() {
  			for(var i = 0; i < game1_brick_width; i++) {
  					for(var j = 0; j < game1_brick_height; j++) {
  							if(game1_bricks[i][j].status == 1) {
  									game1_brick = {
                      x: (i*(game1_brickWidth+game1_brickPadding))+game1_brickOffsetLeft,
  										y: (j*(game1_brickHeight+game1_brickPadding))+game1_brickOffsetTop
                    };
  									game1_bricks[i][j].x = game1_brick.x;
  									game1_bricks[i][j].y = game1_brick.y;
  									ctx.beginPath();
  									ctx.rect(game1_brick.x, game1_brick.y, game1_brickWidth, game1_brickHeight);
  									ctx.fillStyle = "#0095DD";
  									ctx.fill();
  									ctx.closePath();
  							}
  					}
  			}
  	}

  	//操作
  	function collisionDetection() {
  	    for(var i = 0; i < game1_brick_width; i++) {
  	        for(var j = 0; j < game1_brick_height; j++) {
  	            var b = game1_bricks[i][j];
  	            if(b.status == 1) {
  	                if(game1_pos.x > b.x && game1_pos.x < b.x + game1_brickWidth
  										&& game1_pos.y > b.y && game1_pos.y < b.y + game1_brickHeight) {
  	                    game1_vel.y = -game1_vel.y;
  	                    b.status = 0;
  	                }
  	            }
  	        }
  	    }
  	}

  	//ボール
  	function changeball(){
  	    game1_ballcolor = "rgba(" + (Math.random() * 256) + ","
  			                + (Math.random() * 256) + ","
  			                + (Math.random() * 256) + ",1.0)";
  	}

  	function drawBall() {
  	    ctx.beginPath();
  	    ctx.arc(game1_pos.x, game1_pos.y, game1_ballRadius, 0, Math.PI*2);
  	    ctx.fillStyle = game1_ballcolor;
  	    ctx.fill();
  	    ctx.closePath();
  	}

  	//自分
  	function drawPaddle() {
  	    ctx.beginPath();
  	    ctx.rect(game1_paddle.x, game1_paddle.y, game1_paddleWidth, game1_paddleHeight);
  	    ctx.fillStyle = "#0095DD";
  	    ctx.fill();
  	    ctx.closePath();
  	}

    function goal(){
      game1_vel ={
        x: 0,
        y: 0
      };
      if(game1_bool == false){
        game1_word.w = "FAILED…",
        game1_word.c = "rgba(0,0,255,1.0)"
      }
      ctx.beginPath();
        ctx.font = "bold 96px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = game1_word.c;
        ctx.fillText(game1_word.w, canvas.width/2, canvas.height/2);
      ctx.closePath();
    }

  	// レンダリング処理を呼び出す
  	(function(){
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
  		drawBall();
  		drawPaddle();
  		drawBricks();
  		collisionDetection();

  		if(game1_pos.x + game1_vel.x > canvas.width - game1_ballRadius
  			|| game1_pos.x + game1_vel.x < game1_ballRadius) {
  				game1_vel.x = -game1_vel.x;
  				changeball();
  		}
  		if(game1_pos.y + game1_vel.y < game1_ballRadius) {
  				game1_vel.y = -game1_vel.y;
  				changeball();
  		} else if(game1_pos.y + game1_vel.y > game1_paddle.y) {
  				if(game1_pos.x > game1_paddle.x && game1_pos.x < game1_paddle.x + game1_paddleWidth) {
  						game1_vel.y = -game1_vel.y;
  				}
  				else {
  					// スクリーンの初期化
  					game1_bool = false;
  				}
  		}

  		if(keyDown[key.D] && game1_paddle.x < canvas.width - game1_paddleWidth) {
  				game1_paddle.x += 7;
  		}
  		else if(keyDown[key.A] && game1_paddle.x > 0) {
  				game1_paddle.x -= 7;
  		}

  		game1_pos.x += game1_vel.x;
  		game1_pos.y += game1_vel.y;

      game1_time = Math.floor((game1_number*100-game1_timecount)/100);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        if(game1_time > 0 ){
          ctx.fillText("あと"+game1_time+"秒", 110, 50);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeText("あと"+game1_time+"秒", 110, 50);
        }else {
          ctx.fillText("finish", 110, 50);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeText("finish", 110, 50);
        }

      game1_timecount++;
      if(game1_timecount >= game1_number*100 || game1_bool == false){
        goal();
      }

      if(game1_timecount == (game1_number+1)*100){
        if(game1_bool == false){
                  zanki--;
        }
        window.gameLib.rest();
      }

  		if(run_game1){setTimeout(arguments.callee, game1_fps);}
  	})();
  }

  window.gameLib= window.gameLib|| {};
  window.gameLib.game1= game1;
})();

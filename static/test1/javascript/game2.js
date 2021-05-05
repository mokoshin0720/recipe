(function() {
  function game2(){
    // 汎用変数
    keyUp[key.W] = false;
    keyUp[key.S] = false;
    keyUp[key.A] = false;
    keyUp[key.D] = false;
    keyUp[key.Q] = false;
    run = false;
    run_rest = false;
    run_game1 = false;
    run_game2 = true;
    run_game3 = false;
    run_game4 = false;
    run_game5 = false;
    game2_bool = true;
    game2_loop = true;
    game2_word ={
      w: "GOOD!",
      c: "rgba(255,0,0,1.0)"
    };

    //時間
    game2_fps = 10;
    game2_timecount = 0;
    game2_number = 5;

    //迷路
    game2_maze_width = 7;
    if(game2_maze_width < 7) game2_maze_width = 7;
    if(game2_maze_width%2 == 0) game2_maze_width++;
    game2_maze_height = 7;
    if(game2_maze_height < 7) game2_maze_height = 7;
    if(game2_maze_height%2 == 0) game2_maze_height++;
    game2_maze_size = 50;
    game2_maze;
    game2_mazes = [];
      for(var i = 0; i < game2_maze_width; i++){
        game2_mazes[i] = [];
        for(var j = 0; j < game2_maze_height; j++){
          game2_mazes[i][j] = {
            x: 0,
            y: 0,
          };
        }
      }

    //スタート・エンド
    game2_start = {
      x: game2_maze_width-2,
      y: game2_maze_height-1
    };
    game2_end = {
      x: 1,
      y: 0
    };

    //自分
    game2_mine = {
      x: game2_start.x,
      y: game2_start.y
    };

    //順路
    game2_walls = [];
    for(var i = 0; i < game2_maze_width; i++){
      game2_walls[i] = [];
      for(var j = 0; j < game2_maze_height; j++){
        game2_walls[i][j] = {
           x: i,
           y: j,
           status: true
        };

        if(i == 0 || i == game2_maze_width-1
          || j == 0 || j == game2_maze_height-1){
          if(i != game2_start.x || j != game2_start.y){
            if(i != game2_end.x || j != game2_end.y){
              game2_walls[i][j].status = false;
            }
          }
        }
      }
    }
    for(var i = 2; i < game2_maze_width-2; i+=2){
      for(var j = 2; j < game2_maze_height-2; j+=2){
          game2_walls[i][j].status = false;
          if(j == 2){
            game2_wall = Math.floor(Math.random()*4);
          }else {
            game2_wall = Math.floor(Math.random()*3)+1;
          }
          switch(game2_wall) {
            case 0:
              game2_walls[i][j-1].status = false;
              break;
            case 1:
              if(game2_walls[i-1][j].status == false){
                if(game2_walls[i+1][j].status == false){
                  game2_walls[i][j+1].status = false;
                }else if(game2_walls[i][j+1].status == false){
                  game2_walls[i+1][j].status = false;
                }
              }else {
                game2_walls[i-1][j].status = false;
              }
              break;
            case 2:
              if(game2_walls[i][j+1].status == false){
                if(game2_walls[i+1][j].status == false){
                  game2_walls[i-1][j].status = false;
                }else if(game2_walls[i-1][j].status == false){
                  game2_walls[i+1][j].status = false;
                }
              }else {
                game2_walls[i][j+1].status = false;
              }
              break;
            case 3:
              if(game2_walls[i+1][j].status == false){
                if(game2_walls[i][j+1].status == false){
                  game2_walls[i-1][j].status == false;
                }else if(game2_walls[i-1][j].status == false){
                  game2_walls[i][j+1].status = false;
                }
              }else {
                game2_walls[i+1][j].status = false;
              }
              break;
            default:
          }
      }
    }

  	// スクリーンの初期化
  	ctx.clearRect(0, 0, canvas.width, canvas.height);

  	//イベント
    function create_maze(){
      for(var i = 0; i < game2_maze_width; i++){
        for(var j = 0; j < game2_maze_height; j++){
          game2_maze = {
            x: canvas.width/2 - (game2_maze_size * ((game2_maze_width-1)/2+0.5 -i)),
            y: canvas.height/2 - (game2_maze_size * ((game2_maze_height-1)/2+0.5 -j))
          };

          game2_mazes[i][j].x = game2_maze.x;
          game2_mazes[i][j].y = game2_maze.y;

          if(i != 0 && i != game2_maze_width-1
            && j != 0 && j != game2_maze_height-1
            && i%2 == 0 && j%2 == 0
            || game2_walls[i][j].status == false
            && game2_walls[i][j].status == false){
              ctx.beginPath();
                ctx.rect(game2_maze.x, game2_maze.y, game2_maze_size, game2_maze_size);
                ctx.fillStyle = "rgba(0,0,0,1.0)";
                ctx.fill();
              ctx.closePath();
          }

          if(i == game2_end.x && j == game2_end.y){
              ctx.beginPath();
                ctx.rect(game2_maze.x, game2_maze.y, game2_maze_size, game2_maze_size);
                ctx.fillStyle = "rgba(255,0,0,1.0)";
                ctx.fill();
              ctx.closePath();
          }

          if(i == game2_mine.x && j == game2_mine.y){
              ctx.beginPath();
                ctx.rect(game2_maze.x, game2_maze.y, game2_maze_size, game2_maze_size);
                ctx.fillStyle = "rgba(255,255,0,1.0)";
                ctx.fill();
              ctx.closePath();
          }

            ctx.beginPath();
              ctx.moveTo(game2_maze.x, game2_maze.y);
              ctx.strokeStyle = "white";
              ctx.lineTo(game2_maze.x + game2_maze_size, game2_maze.y);
              ctx.lineTo(game2_maze.x + game2_maze_size, game2_maze.y + game2_maze_size);
              ctx.lineTo(game2_maze.x, game2_maze.y + game2_maze_size);
              ctx.stroke();
            ctx.closePath();
        }
      }
      if(game2_loop == false){
        ctx.beginPath();
          ctx.font = "bold 96px Hiragino Kaku Gothic Std";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = game2_word.c;
          ctx.fillText(game2_word.w, canvas.width/2, canvas.height/2);
        ctx.closePath();
      }
    }

    function mine(){
      if(game2_loop){
        if(keyUp[key.W]){
          if(game2_mine.y > 0){
            if(game2_walls[game2_mine.x][game2_mine.y-1].status){
              game2_mine.y--;
            }
          }
          keyUp[key.W] = false;
        }
        if(keyUp[key.S]){
          if(game2_mine.y < game2_maze_height-1){
            if(game2_walls[game2_mine.x][game2_mine.y+1].status){
              game2_mine.y++;
            }
          }
          keyUp[key.S] = false;
        }
        if(keyUp[key.A]){
          if(game2_walls[game2_mine.x-1][game2_mine.y].status){
            game2_mine.x--;
          }
          keyUp[key.A] = false;
        }
        if(keyUp[key.D]){
          if(game2_walls[game2_mine.x+1][game2_mine.y].status){
            game2_mine.x++;
          }
          keyUp[key.D] = false;
        }
      }
      if(game2_mine.x == game2_end.x && game2_mine.y == game2_end.y){
        goal();
      }
    }

    function goal(){
      game2_loop = false;
      if(game2_bool == false){
        game2_word.w = "FAILED…"//,
        game2_word.c = "rgba(0,0,255,1.0)"
      }
    }

  	// レンダリング処理を呼び出す
  	(function(){
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
      mine();
      create_maze();

      game2_time = Math.floor((game2_number*100-game2_timecount)/100);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        if(game2_time > 0 ){
          ctx.fillText("あと"+game2_time+"秒", 110, 50);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeText("あと"+game2_time+"秒", 110, 50);
        }else {
          ctx.fillText("finish", 110, 50);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeText("finish", 110, 50);
        }


      game2_timecount++;
      if(game2_timecount >= game2_number*100 && game2_loop){
        game2_bool = false;
        goal();
      }

      if(game2_timecount == (game2_number+1)*100){
        if(game2_bool == false){
          zanki--;
        }
        window.gameLib.rest();
      }

  		if(run_game2){setTimeout(arguments.callee, game2_fps);}
  	})();
  }

  window.gameLib= window.gameLib|| {};
  window.gameLib.game2= game2;
})();

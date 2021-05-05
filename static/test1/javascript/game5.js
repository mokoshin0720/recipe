(function() {
  function game5(){
    // 汎用変数
    keyDown[key.W] = false;
    keyDown[key.S] = false;
    keyDown[key.A] = false;
    keyDown[key.D] = false;
    run = false;
    run_rest = false;
    run_game1 = false;
    run_game2 = false;
    run_game3 = false;
    run_game4 = false;
    run_game5 = true;
    game5_loop = true;
    game5_bool = true;
    game5_me_fireB = false; //表示
    game5_me_fireS = false; //初期化
    game5_boss_fireB = false; //表示
    game5_boss_fireS = true; //初期化
    game5_boss_life = false; //初期化
    game5_word ={
      w: "GOOD!",
      c: "rgba(255,0,0,1.0)"
    };
    time = 0;
    game5_hp_color;

    //時間
    game5_fps = 10;
    game5_timecount = 0;
    game5_number = 5;

    //壁
    game5_width = canvas.width;
    game5_height = canvas.height;

    //自分
    //本体
    game5_me = {
      posX: game5_width/2,
      posY: game5_height*3/4,
      velX: Math.random() * 3,
      velY: Math.random() * 3,
      size: 25,
      acc: 0.5,
      fric: 0.9,
      color: "white",
      sidecolor: "black",
      life: true
    };
    //ファイア
    game5_me_fire_num = 7;
    game5_me_fire_count = 0;
    game5_me_fire = [];
    for(var i = 0; i < game5_me_fire_num; i++){
      game5_me_fire[i] = {
        posX: game5_me.posX+game5_me.size/2,
        posY: game5_me.posY+game5_me.size,
        velX: 0,
        velY: -4,
        size: 10,
        color: "pink",
        sidecolor: "black",
        bool: false
      };
    }

    //ボス
    //本体
    game5_boss = {
      posX: game5_width/2,
      posY: 0,
      velX: Math.random() * 3,
      velY: Math.random() * 3,
      width: 200,
      height: 50,
      color: "rgba(" + (Math.random() * 256) + ","
                    + (Math.random() * 256) + ","
                    + (Math.random() * 256) + ",1.0)",
      sidecolor: "black",
      start: false,
      hp: 50
    };
    //ファイア
    game5_boss_fire_num = 5;
    game5_boss_fire_count = 0;
    game5_boss_fire = [];
    for(var i = 0; i < game5_boss_fire_num; i++){
      game5_boss_fire[i] = {
        posX: game5_boss.posX+game5_boss.width/2,
        posY: game5_boss.posY+game5_boss.height,
        velX: 0,
        velY: 1,
        size: 10,
        color: "red",
        sidecolor: "black",
        bool: true
      };
    }
    game5_boss_fire = [];

    //初期
    game5_me.posX -= game5_me.size/2;
    game5_me.posY -= game5_me.size/2;
    game5_boss.posX -= game5_boss.width/2;
    game5_boss.posY -= game5_boss.height/2;

  	// スクリーンの初期化
  	ctx.clearRect(0, 0, canvas.width, canvas.height);

  	//イベント
    //スタート
    function start(){
      if(game5_boss.posY + game5_boss.height/2 < game5_height/4){
        game5_boss.posY++;
      }
      if(game5_boss.posY + game5_boss.height/2 == game5_height/4){
        keyUp[key.Q] = false;
        game5_boss.start = true;
      }
    }

    //ファイア
    //自分
    function fire_me(){
        if(game5_me_fireS && game5_me_fireB == false){
          game5_me_fire_count = 0;
          for(var i = 0; i < game5_me_fire_num; i++){
            game5_me_fire[i] = {
              posX: game5_me.posX+game5_me.size/2,
              posY: game5_me.posY+game5_me.size,
              velX: 0,
              velY: -4,
              size: 10,
              color: "pink",
              sidecolor: "black",
              bool: true
            };
          }
          game5_me_fireB = true;
          game5_me_fireS = false;
        }

        for(var i = 0; i < game5_me_fire_num; i++){
          if(game5_me_fire[i].bool == false){
            game5_me_fire_count++;
            if(game5_me_fire_count == game5_me_fire_num){
              game5_me_fireB = false;
            }
          }
      }
    }
    //ボス
    function fire_boss(){
        if(/*game5_boss_fireS && */game5_boss_fireB == false){
          game5_boss_fire_count = 0;
          for(var i = 0; i < game5_boss_fire_num; i++){
            game5_boss_fire[i] = {
              posX: game5_boss.posX+game5_boss.width/2,
              posY: game5_boss.posY+game5_boss.height,
              velX: 0,
              velY: 1,
              size: 10,
              color: "red",
              sidecolor: "black",
              bool: true
            };
          }
          game5_boss_fireB = true;
        }

        for(var i = 0; i < game5_boss_fire_num; i++){
          if(game5_boss_fire[i].bool == false){
            game5_boss_fire_count++;
            if(game5_boss_fire_count == game5_boss_fire_num){
              game5_boss_fireB = false;
            }
          }
      }
    }

    //描写
    function draw(){
      //ライン
      ctx.beginPath();
        ctx.moveTo(0, game5_height/2);
        ctx.lineTo(game5_width, game5_height/2);
        ctx.setLineDash([20,5,10,5]);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
      ctx.closePath();

      //点線初期化
      ctx.setLineDash([]);
      //自分
      //本体
      ctx.beginPath();
        ctx.rect(game5_me.posX, game5_me.posY, game5_me.size, game5_me.size);
        ctx.fillStyle = game5_me.color;
        ctx.fill();
      ctx.closePath();
      ctx.beginPath();
        ctx.rect(game5_me.posX, game5_me.posY, game5_me.size, game5_me.size);
        ctx.strokeStyle = game5_me.sidecolor;
        ctx.lineWidth = 4;
        ctx.stroke();
      ctx.closePath();
      //ファイア
      if(game5_me_fireB){
        for(var i = 0; i < game5_me_fire_num; i++){
          if(game5_me_fire[i].bool){
            ctx.beginPath();
              ctx.arc(game5_me_fire[i].posX, game5_me_fire[i].posY, game5_me_fire[i].size, 0, Math.PI*2);
              ctx.fillStyle = game5_me_fire[i].color;
              ctx.fill();
            ctx.closePath();
            ctx.beginPath();
              ctx.arc(game5_me_fire[i].posX, game5_me_fire[i].posY, game5_me_fire[i].size, 0, Math.PI*2);
              ctx.strokeStyle = game5_me_fire[i].sidecolor;
              ctx.lineWidth = 2;
              ctx.stroke();
            ctx.closePath();
          }
        }
      }

      //ボス
      //本体
      ctx.beginPath();
        ctx.rect(game5_boss.posX, game5_boss.posY, game5_boss.width, game5_boss.height);
        ctx.fillStyle = game5_boss.color;
        ctx.fill();
      ctx.closePath();
      ctx.beginPath();
        ctx.rect(game5_boss.posX, game5_boss.posY, game5_boss.width, game5_boss.height);
        ctx.strokeStyle = game5_boss.sidecolor;
        ctx.lineWidth = 4;
        ctx.stroke();
      ctx.closePath();
      //ファイア
      if(game5_boss_fireB){
        for(var i = 0; i < game5_boss_fire_num; i++){
          ctx.beginPath();
            ctx.arc(game5_boss_fire[i].posX, game5_boss_fire[i].posY, game5_boss_fire[i].size, 0, Math.PI*2);
            ctx.fillStyle = game5_boss_fire[i].color;
            ctx.fill();
          ctx.closePath();
          ctx.beginPath();
            ctx.arc(game5_boss_fire[i].posX, game5_boss_fire[i].posY, game5_boss_fire[i].size, 0, Math.PI*2);
            ctx.strokeStyle = game5_boss_fire[i].sidecolor;
            ctx.lineWidth = 2;
            ctx.stroke();
          ctx.closePath();
        }
      }

      if(game5_loop == false){
        ctx.beginPath();
          ctx.font = "bold 96px Hiragino Kaku Gothic Std";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = game5_word.c;
          ctx.fillText(game5_word.w, canvas.width/2, canvas.height/2);
        ctx.closePath();
        ctx.stroke() ;
      }
    }

    //動き
    function active(){
      if(game5_loop){
        //自分
        game5_me.velX = game5_me.velX * game5_me.fric;
        game5_me.velY = game5_me.velY * game5_me.fric;
          if(keyDown[key.W]){
            if(game5_me.posY > game5_height/2){
              game5_me.velY -= game5_me.acc;
              game5_me.posY += game5_me.velY;
            }
          }
          if(keyDown[key.S]){
            if(game5_me.posY < game5_height-game5_me.size){
              game5_me.velY += game5_me.acc;
              game5_me.posY += game5_me.velY;
              console.log("S");
            }
          }
          if(keyDown[key.A]){
            if(game5_me.posX > 0){
              game5_me.velX -= game5_me.acc;
              game5_me.posX += game5_me.velX;
              console.log("A");
            }
          }
          if(keyDown[key.D]){
            if(game5_me.posX < game5_width-game5_me.size){
              game5_me.velX += game5_me.acc;
              game5_me.posX += game5_me.velX;
              console.log("D");
            }
          }
          //ファイア
          for(var i = 0; i < game5_me_fire_num; i++){
            game5_me_fire[i].posX += game5_me_fire[i].velX;
            game5_me_fire[i].posY += game5_me_fire[i].velY;
            if(game5_me_fire[i].posX < 0 || game5_me_fire[i].posX > game5_width-game5_me_fire[i].size
              || game5_me_fire[i].posY < 0 || game5_me_fire[i].posY > game5_height-game5_me_fire[i].size){
                game5_me_fire[i].bool = false;
              }
              game5_me_fire[i].velX = (i+1-(game5_me_fire_num+1)/2)*0.2;
              game5_me_fire[i].velY = -4;
          }
          if(keyUp[key.Q]){
            if(game5_me_fireB == false && game5_me_fireS == false){
              game5_me_fireS = true;
            }
            keyUp[key.Q] = false;
          }

          //ボス
          game5_boss.posX += game5_boss.velX;
          game5_boss.posY += game5_boss.velY;
            if(game5_boss.posX < 0 || game5_boss.posX > game5_width-game5_boss.width){
              game5_boss.velX *= -1.0;
            }
            if(game5_boss.posY < 0 || game5_boss.posY > game5_height/2-game5_boss.height){
              game5_boss.velY *= -1.0;
            }

            for(var i = 0; i < game5_boss_fire_num; i++){
              game5_boss_fire[i].posX += game5_boss_fire[i].velX;
              game5_boss_fire[i].posY += game5_boss_fire[i].velY;
              if(game5_boss_fire[i].posX < 0 || game5_boss_fire[i].posX > game5_width-game5_boss_fire[i].size
                || game5_boss_fire[i].posY < 0 || game5_boss_fire[i].posY > game5_height-game5_boss_fire[i].size){
                  game5_boss_fire[i].bool = false;
                }
                game5_boss_fire[i].velX = (i+1-(game5_boss_fire_num+1)/2)*0.2;
                game5_boss_fire[i].velY = 1;
            }
            touch();
          }

          function touch(){
            for(var i = 0; i < game5_me_fire_num; i++){
              if(game5_me_fire[i].bool){
                if(game5_boss.posX - game5_me_fire[i].size < game5_me_fire[i].posX && game5_boss.posX+game5_boss.width
                  + game5_me_fire[i].size > game5_me_fire[i].posX && game5_boss.posY < game5_me_fire[i].posY && game5_boss.posY+game5_boss.height > game5_me_fire[i].posY){//矩形の領域判定1
                    game5_boss_life = true;
                    game5_me_fire[i].bool = false;
                    T();
                }
                if(game5_boss.posX < game5_me_fire[i].posX && game5_boss.posX+game5_boss.width > game5_me_fire[i].posX && game5_boss.posY
                  - game5_me_fire[i].size < game5_me_fire[i].posY && game5_boss.posY+game5_boss.height + game5_me_fire[i].size > game5_me_fire[i].posY){//矩形の領域判定2
                    game5_boss_life = true;
                    game5_me_fire[i].bool = false;
                    T();
                }
                if((game5_boss.posX - game5_me_fire[i].posX) * (game5_boss.posX - game5_me_fire[i].posX)
                + (game5_boss.posY - game5_me_fire[i].posY) * (game5_boss.posY - game5_me_fire[i].posY) < game5_me_fire[i].size * game5_me_fire[i].size){//左上の当たり判定
                    game5_boss_life = true;
                    game5_me_fire[i].bool = false;
                    T();
                }
                if((game5_boss.posX+game5_boss.width - game5_me_fire[i].posX) * (game5_boss.posX+game5_boss.width - game5_me_fire[i].posX) + (game5_boss.posY - game5_me_fire[i].posY)
                * (game5_boss.posY - game5_me_fire[i].posY) < game5_me_fire[i].size * game5_me_fire[i].size){//右上の当たり判定
                    game5_boss_life = true;
                    game5_me_fire[i].bool = false;
                    T();
                }
                if((game5_boss.posX - game5_me_fire[i].posX) * (game5_boss.posX - game5_me_fire[i].posX) + (game5_boss.posY+game5_boss.height - game5_me_fire[i].posY)
                * (game5_boss.posY+game5_boss.height - game5_me_fire[i].posY) < game5_me_fire[i].size * game5_me_fire[i].size){//左下の当たり判定
                    game5_boss_life = true;
                    game5_me_fire[i].bool = false;
                    T();
                }
                if((game5_boss.posX+game5_boss.width - game5_me_fire[i].posX) * (game5_boss.posX+game5_boss.width - game5_me_fire[i].posX) + (game5_boss.posY+game5_boss.height - game5_me_fire[i].posY)
                * (game5_boss.posY+game5_boss.height - game5_me_fire[i].posY) < game5_me_fire[i].size * game5_me_fire[i].size){//右下の当たり判定
                    game5_boss_life = true;
                    game5_me_fire[i].bool = false;
                    T();
                }
              }
            }

            function T(game5_boss_life){
              console.log("!!");
              game5_boss.hp--;
              game5_boss_life = false;
              time = game5_timecount;
              if(game5_boss.hp <= 0){
                goal();
              }
            }

            for(var i = 0; i < game5_boss_fire_num; i++){
              if(Math.pow(game5_boss_fire[i].size + game5_me.size, 2)
              >= Math.pow(game5_boss_fire[i].posX - game5_me.posX, 2)
              + Math.pow(game5_boss_fire[i].posY - game5_me.posY, 2)){
                  game5_me.color = "rgba(100,0,0,1.0)";
                  game5_bool = false;
                  time = game5_timecount;
                  console.log("time: "+ time);
                  goal();
              }
            }
          }

          function goal(){
            game5_loop = false;
            console.log("time: "+ time);
            console.log(game5_timecount);
            if(game5_bool == false){
              zanki--;
              game5_word.w = "FAILED…",
              game5_word.c = "rgba(0,0,255,1.0)"
            }
          }
    }

  	// レンダリング処理を呼び出す
  	(function(){
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
      game5_me_fire_count = 0;
      game5_boss_fire_count = 0;
      if(game5_boss.start){
        if(game5_me_fireB || game5_me_fireS){
          fire_me();
        }
        if(game5_boss_fireB || game5_boss_fireS){
          fire_boss();
        }
        active();
        hp();
      }else {
        start();
      }
      draw();

      if(game5_boss.hp < 0){
        game5_boss.hp = 0;
      }

      if(game5_boss.hp > 40 && game5_boss.hp <= 50){
        game5_hp_color = "rgba(100,0,255,1.0)";
      } else if(game5_boss.hp > 30 && game5_boss.hp <= 40){
        game5_hp_color = "rgba(0,140,0,1.0)";
      } else if(game5_boss.hp > 20 && game5_boss.hp <= 30){
        game5_hp_color = "rgba(255,220,0,1.0)";
      } else if(game5_boss.hp > 10 && game5_boss.hp <= 20){
        game5_hp_color = "rgba(255,140,0,1.0)";
      } else {
        game5_hp_color = "rgba(190,0,0,1.0)";
      }

      function hp(){
        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = game5_hp_color;
        ctx.fillText("ENEMY's HP"+game5_boss.hp, game5_width-150, 50);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("ENEMY's HP"+game5_boss.hp, game5_width-150, 50);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("残り時間なし", 110, 50);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("残り時間なし", 110, 50);
      }


      game5_timecount++;

      if(game5_timecount == time + 100 && game5_loop == false){
        if(game5_bool == false){
          zanki--;
        }
        console.log("last" +game5_timecount);
        window.gameLib.rest();
      }

  		if(run_game5){setTimeout(arguments.callee, game5_fps);}
  	})();
  }

  window.gameLib= window.gameLib|| {};
  window.gameLib.game5= game5;
})();

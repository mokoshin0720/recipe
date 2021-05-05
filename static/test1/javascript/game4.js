(function() {
  function game4(){
  	// 汎用変数
    keyUp[key.W] = false;
    keyUp[key.S] = false;
    keyUp[key.A] = false;
    keyUp[key.D] = false;
    keyUp[key.Q] = false;
    run = false;
    run_rest = false;
    run_game1 = false;
    run_game2 = false;
    run_game3 = false;
    run_game4 = true;
    run_game5 = false;
    game4_loop = true;
    game4_bool = true;
    game4_word ={
      w: "GOOD!",
      c: "rgba(255,0,0,1.0)"
    };

    //時間
    game4_fps = 10;
    game4_timecount = 0;
    game4_number = 5;

    //壁
    game4_width = canvas.width;
    game4_height = canvas.height;

    //アイテム１
    game4_item_num = 3;
    if(game4_item_num > 3){
      game4_item_num = 3;
    }
    game4_color = "rgba(255,0,0,1.0)";
    game4_up_color = "rgba(90,90,90,1.0)";
    game4_down_color = "lightgrey";

    //穴
    game4_w_holeS;
    game4_h_holeS;
    game4_w_hole_up = [];
    game4_w_hole_down = [];
    game4_h_hole_up = [];
    game4_h_hole_down = [];
    game4_w_up = [];
    game4_w_down = [];
    game4_h_up = [];
    game4_h_down = [];
    //[0]が正解、他は偽物
    for(var i = 0; i < game4_item_num; i++){
      if(i == 0){
        //width0
        game4_w_holeS = Math.floor(Math.random()*5)+1;
        game4_w_hole_up[i] = game4_w_holeS;
        game4_w_hole_down[i] = game4_w_holeS;
        //height0
        game4_h_holeS = Math.floor(Math.random()*5)+1
        game4_h_hole_up[i] = game4_h_holeS;
        game4_h_hole_down[i] = game4_h_holeS;
      }else {
        game4_w_hole_up[i] = Math.floor(Math.random()*5)+1;
        game4_w_hole_down[i] = Math.floor(Math.random()*5)+1;
        game4_h_hole_up[i] = Math.floor(Math.random()*5)+1;
        game4_h_hole_down[i] = Math.floor(Math.random()*5)+1;
      }
    }

    //アイテム２
    //サイズの決定
    for(var i = 0; i < game4_item_num; i++){
      game4_w_up[i] = Math.floor(Math.random()*6)+7;
      game4_w_down[i] = Math.floor(Math.random()*6)+7;
      game4_h_up[i] = Math.floor(Math.random()*6)+7;
      game4_h_down[i] = Math.floor(Math.random()*6)+7;
    }
    //アイテムの設定
    game4_item = [];
    game4_item_pos = [];
    game4_hole = [];
    game4_hole_pos = [];
    //上部の基準
    game4_up_botton = game4_height/2 - game4_height/8;
    //下部の基準
    game4_down_top = game4_height/2 + game4_height/8;

    for(var i = 0; i < game4_item_num; i++){
      game4_item[i] = {
        w_up: 20*game4_w_up[i],
        w_down: 20*game4_w_down[i],
        h_up: 20*game4_h_up[i],
        h_down: 20*game4_h_down[i]
      };

      game4_item_pos[i] = {
        x_up: game4_width/2 - game4_item[i].w_up/2,
        x_down: game4_width/2 - game4_item[i].w_down/2,
        y_up: game4_up_botton - game4_item[i].h_up,
        y_down: game4_down_top
      };
      game4_hole[i] = {
        w_up: 20*game4_w_hole_up[i],
        w_down: 20*game4_w_hole_down[i],
        h_up: 20*game4_h_hole_up[i],
        h_down: 20*game4_h_hole_down[i]
      };
      game4_hole_pos[i] = {
        x_up: game4_width/2 - game4_hole[i].w_up/2,
        x_down: game4_width/2 - game4_hole[i].w_down/2,
        y_up: game4_up_botton,
        y_down: game4_down_top
      };
    }
    //アイテムの位置
    for(var i = 0; i < game4_item_num; i++){
      game4_item_pos[i].x_up += game4_width/game4_item_num*i;
      if(game4_item_pos[i].x_up > game4_width){
        game4_item_pos[i].x_up -= game4_width;
      }
      game4_item_pos[i].x_down += game4_width/game4_item_num*i;
      if(game4_item_pos[i].x_down > game4_width){
        game4_item_pos[i].x_down -= game4_width;
      }
      game4_hole_pos[i].x_up += game4_width/game4_item_num*i;
      if(game4_hole_pos[i].x_up > game4_width){
        game4_hole_pos[i].x_up -= game4_width;
      }
      game4_hole_pos[i].x_down += game4_width/game4_item_num*i;
      if(game4_hole_pos[i].x_down > game4_width){
        game4_hole_pos[i].x_down -= game4_width;
      }
    }

    var num;
    //シャッフル
    game4_down_rand = Math.floor(Math.random() * (game4_item_num));
    game4_count = [];
    for(var i = 0; i < game4_item_num; i++){
      num = game4_item_pos[i].x_down
      game4_count[i] = i + game4_down_rand;
      if(i + game4_down_rand > game4_item_num-1){
        game4_count[i] = game4_count[i] - game4_item_num;
      }
      game4_item_pos[i].x_down += game4_width/game4_item_num * game4_count[i];
      game4_hole_pos[i].x_down += game4_width/game4_item_num * game4_count[i];
      num = game4_item_pos[i].x_down;
      if(num > game4_width){
        num -= game4_width;
      }
      if(num > game4_width){
        num -= game4_width;
      }
    }

  	// スクリーンの初期化
  	ctx.clearRect(0, 0, game4_width, game4_height);

  	//イベント
    function control(){
      if(game4_loop == true){
          if(keyUp[key.W]){
            for(var i = 0; i < game4_item_num; i++){
              if(game4_item_pos[i].x_down + game4_item[i].w_down/2
                - (game4_item_pos[i].x_down + game4_item[i].w_down/2)%1
                == game4_width/2){
                  if(i == 0){
                    game4_loop = false;
                    mix();
                  }
                }
            }
            keyUp[key.W] = false;
          }
          if(keyUp[key.A]){
            for(var i = 0; i < game4_item_num; i++){
              game4_item_pos[i].x_down += game4_width/game4_item_num;
              game4_hole_pos[i].x_down += game4_width/game4_item_num;
            }
            keyUp[key.A] = false;
          }
          if(keyUp[key.D]){
            for(var i = 0; i < game4_item_num; i++){
              game4_item_pos[i].x_down += game4_width/game4_item_num;
              game4_hole_pos[i].x_down += game4_width/game4_item_num;
            }
            keyUp[key.D] = false;
          }
        }
    }

    function item(){
      for(var i = 0; i < game4_item_num; i++){
        if(game4_item_pos[i].x_up > game4_width){
          game4_item_pos[i].x_up -= game4_width;
        }
        if(game4_item_pos[i].x_down > game4_width){
          game4_item_pos[i].x_down -= game4_width;
        }
        if(game4_hole_pos[i].x_up > game4_width){
          game4_hole_pos[i].x_up -= game4_width;
        }
        if(game4_hole_pos[i].x_down > game4_width){
          game4_hole_pos[i].x_down -= game4_width;
        }
      }
    }

    function draw(){
      if(game4_loop){
        for(var i = 0; i < game4_item_num; i++){
          //item
          ctx.beginPath();
            ctx.rect(game4_item_pos[i].x_up, game4_item_pos[i].y_up,
                    game4_item[i].w_up, game4_item[i].h_up);
            ctx.fillStyle = game4_color;
            ctx.fill();
          ctx.closePath();
        }
        for(var i = 0; i < game4_item_num; i++){
          ctx.beginPath();
            ctx.rect(game4_item_pos[game4_count[i]].x_down, game4_item_pos[game4_count[i]].y_down,
                    game4_item[game4_count[i]].w_down, game4_item[game4_count[i]].h_down);
            ctx.fillStyle = game4_color;
            ctx.fill();
          ctx.closePath();
        }

        //hole
        for(var i = 0; i < game4_item_num; i++){
          ctx.beginPath();
            ctx.rect(game4_hole_pos[game4_count[i]].x_down, game4_hole_pos[game4_count[i]].y_down,
                    game4_hole[game4_count[i]].w_down, game4_hole[game4_count[i]].h_down);
            ctx.fillStyle = game4_down_color;
            ctx.fill();
          ctx.closePath();
        }

        for(var i = 0; i < game4_item_num; i++){
          //hole
          ctx.beginPath();
            ctx.rect(game4_hole_pos[i].x_up, game4_hole_pos[i].y_up,
                    game4_hole[i].w_up, game4_hole[i].h_up);
            ctx.fillStyle = game4_up_color;
            ctx.fill();
          ctx.closePath();
        }
      }

      ctx.font = "bold 32px Hiragino Kaku Gothic Std";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      if(game4_time > 0 ){
        ctx.fillText("あと"+game4_time+"秒", 110, 50);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("あと"+game4_time+"秒", 110, 50);
      }else {
        ctx.fillText("finish", 110, 50);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("finish", 110, 50);
      }
    }

    function mix(){
      if(game4_loop == false){
          if(game4_bool){
            ctx.beginPath();
              ctx.rect(game4_item_pos[0].x_up, game4_item_pos[0].y_up + game4_height/4,
                      game4_item[0].w_up, game4_item[0].h_up);
              ctx.fillStyle = "rgba(255,255,0,1.0)";
              ctx.fill();
            ctx.closePath();

            ctx.beginPath();
              ctx.rect(game4_item_pos[0].x_down, game4_item_pos[0].y_down,
                      game4_item[0].w_down, game4_item[0].h_down);
              ctx.fillStyle = "rgba(255,255,0,1.0)";
              ctx.fill();
            ctx.closePath();

            ctx.beginPath();
              ctx.rect(game4_hole_pos[0].x_up, game4_hole_pos[0].y_up + game4_height/4,
                      game4_hole[0].w_up, game4_hole[0].h_up);
              ctx.fillStyle = game4_up_color;
              ctx.fill();
            ctx.closePath();

            ctx.beginPath();
              ctx.rect(game4_hole_pos[0].x_down, game4_hole_pos[0].y_down,
                      game4_hole[0].w_down, game4_hole[0].h_down);
              ctx.fillStyle = game4_up_color;
              ctx.fill();
            ctx.closePath();
          }else {
            for(var i = 0; i < game4_item_num; i++){
              ctx.beginPath();
                ctx.rect(game4_item_pos[i].x_up, game4_item_pos[i].y_up,
                        game4_item[i].w_up, game4_item[i].h_up);
                ctx.fillStyle = game4_color;
                ctx.fill();
              ctx.closePath();

              ctx.beginPath();
                ctx.rect(game4_item_pos[i].x_down, game4_item_pos[i].y_down,
                        game4_item[i].w_down, game4_item[i].h_down);
                ctx.fillStyle = game4_color;
                ctx.fill();
              ctx.closePath();

              ctx.beginPath();
                ctx.rect(game4_hole_pos[i].x_down, game4_hole_pos[i].y_down,
                        game4_hole[i].w_down, game4_hole[i].h_down);
                ctx.fillStyle = game4_down_color;
                ctx.fill();
              ctx.closePath();

              ctx.beginPath();
                ctx.rect(game4_hole_pos[i].x_up, game4_hole_pos[i].y_up,
                        game4_hole[i].w_up, game4_hole[i].h_up);
                ctx.fillStyle = game4_up_color;
                ctx.fill();
              ctx.closePath();
            }
          }

          goal();
      }
    }

    function goal(){
      game4_loop = false;
      if(game4_bool == false){
        game4_word.w = "FAILED…",
        game4_word.c = "rgba(0,0,255,1.0)"
      }
      ctx.beginPath();
        ctx.font = "bold 96px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = game4_word.c;
        ctx.fillText(game4_word.w, game4_width/2, game4_height/2);
        ctx.closePath();
    }
    
  	// レンダリング処理を呼び出す
  	(function(){
      console.log(zanki);
  		ctx.clearRect(0, 0, game4_width, game4_height);
        control();
        item();
        mix();
        draw();

        game4_time = Math.floor((game4_number*100-game4_timecount)/100);

      game4_timecount++;
      if(game4_timecount >= game4_number*100 && game4_loop){
        game4_bool = false;
        goal();
      }

      if(game4_timecount == (game4_number+1)*100){
        console.log(zanki);
        if(game4_bool == false){
          zanki--;
        }
        window.gameLib.rest();
      }

  		if(run_game4){setTimeout(arguments.callee, game4_fps);}
  	})();
  }

  window.gameLib= window.gameLib|| {};
  window.gameLib.game4= game4;
})();

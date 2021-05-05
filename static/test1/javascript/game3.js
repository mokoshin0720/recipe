(function() {
  function game3(){
  	// 汎用変数
    keyDown[key.W] = false;
    keyDown[key.S] = false;
    keyDown[key.A] = false;
    keyDown[key.D] = false;
    keyDown[key.Q] = false;
    run = false;
    run_rest = false;
    run_game1 = false;
    run_game2 = false;
    run_game3 = true;
    run_game4 = false;
    run_game5 = false;
    game3_loop = true;
    game3_bool = true;
    game3_word ={
      w: "GOOD!",
      c: "rgba(255,0,0,1.0)"
    };

    //時間
    game3_fps = 10;
    game3_timecount = 0;
    game3_number = 5;

    //壁
    game3_width = canvas.width;
    game3_height = canvas.height;

    //アイテム
    game3_particle_num = 5;
    game3_particles = [];
    for(var i = 0; i < game3_particle_num; i++){
      game3_particles[i] = {
        x: Math.random() * (game3_width/2) + game3_width/4,
        y: Math.random() * (game3_height*3/4),
        dx: Math.random() * 3,
        dy: Math.random() * 3,
        size: 50,
        color: "rgba(60,60,200,1.0)",
        status: 0
      };
    }
    game3_count = 0;

    //自分
    game3_size = 20;
    game3_pos = {
      //Math.random() * (max - min) + min;
      x: Math.random() * (game3_width/2) + game3_width/4,
      y: Math.random() * (game3_height/4) + game3_height*3/4,
    };
    game3_vel = {
      x: 2,
      y: 2,
      acc: 0.5,
      fric: 0.9
    };
    game3_acc = 0.5;
    game3_color = "rgba(255,0,255,1.0)";

    // スクリーンの初期化
  	ctx.clearRect(0, 0, canvas.width, canvas.height);

  	//イベント
    function active(){
      game3_vel.x = game3_vel.x * game3_vel.fric;
      game3_vel.y = game3_vel.y * game3_vel.fric;

      if(game3_loop){
        if(keyDown[key.W]){
          if(game3_pos.y > 0){
            game3_vel.y -= game3_vel.acc;
            game3_pos.y += game3_vel.y;
          }
        }
        if(keyDown[key.S]){
          if(game3_pos.y < game3_height){
            game3_vel.y += game3_vel.acc;
            game3_pos.y += game3_vel.y;
          }
        }
        if(keyDown[key.A]){
          if(game3_pos.x > 0){
            game3_vel.x -= game3_vel.acc;
            game3_pos.x += game3_vel.x;
          }
        }
        if(keyDown[key.D]){
          if(game3_pos.x < game3_width){
            game3_vel.x += game3_vel.acc;
            game3_pos.x += game3_vel.x;
          }
        }
      }

      for(var i = 0; i < game3_particle_num; i++){
        game3_particles[i].x += game3_particles[i].dx;
        game3_particles[i].y += game3_particles[i].dy;
        if(game3_particles[i].x < 0 || game3_particles[i].x > game3_width) game3_particles[i].dx *= -1.0;
        if(game3_particles[i].y < 0 || game3_particles[i].y > game3_height) game3_particles[i].dy *= -1.0;
      }
    }

    function touch(){
      for(var i = 0; i < game3_particle_num; i++){
        if(Math.pow((game3_size + game3_particles[i].size), 2)
        >= Math.pow((game3_particles[i].x - game3_pos.x), 2)
        + Math.pow((game3_particles[i].y - game3_pos.y), 2)){
            game3_particles[i].color = "rgba(255,60,60,1.0)";
            game3_particles[i].status = 1;
        }
      }
    }

    function draw(){
      ctx.beginPath();
        ctx.arc(game3_pos.x, game3_pos.y, game3_size, 0, Math.PI*2);
        ctx.fillStyle = game3_color;
        ctx.fill();
      ctx.closePath();

        for(var i = 0; i < game3_particle_num; i++){
          ctx.beginPath();
            ctx.arc(game3_particles[i].x, game3_particles[i].y, game3_particles[i].size, 0, Math.PI*2);
            ctx.fillStyle = game3_particles[i].color;
            ctx.fill();
          ctx.closePath();
        }

        if(game3_loop == false){
          ctx.beginPath();
            ctx.font = "bold 96px Hiragino Kaku Gothic Std";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = game3_word.c;
            ctx.fillText(game3_word.w, game3_width/2, game3_height/2);
          ctx.closePath();
        }
    }

    function goal(){
      game3_loop = false;
      for(var i = 0; i < game3_particle_num; i++){
        game3_particles[i] = {
          dx: 0,
          dy: 0
        };
      }
      game3_vel = {
        x: 0,
        y: 0,
        acc: 0,
        fric: 0
      };
      if(game3_bool == false){
        game3_word.w = "FAILED…",
        game3_word.c = "rgba(0,0,255,1.0)"
      }
    }

  	// レンダリング処理を呼び出す
  	(function(){
  		ctx.clearRect(0, 0, canvas.width, canvas.height);
      game3_count = 0;
      active();
      touch();
      draw();

      game3_time = Math.floor((game3_number*100-game3_timecount)/100);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        if(game3_time > 0 ){
          ctx.fillText("あと"+game3_time+"秒", 110, 50);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeText("あと"+game3_time+"秒", 110, 50);
        }else {
          ctx.fillText("finish", 110, 50);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeText("finish", 110, 50);
        }


      for(var i = 0; i < game3_particle_num; i++){
        game3_count += game3_particles[i].status
        if(game3_count == game3_particle_num){
          goal();
        }
      }

      game3_timecount++;
      if(game3_timecount >= game3_number*100 && game3_loop){
        game3_bool = false;
        goal();
      }

      if(game3_timecount == (game3_number+1)*100){
        if(game3_bool == false){
          zanki--;
        }
        window.gameLib.rest();
      }

  		if(run_game3){setTimeout(arguments.callee, game3_fps);}
  	})();
  }

  window.gameLib= window.gameLib|| {};
  window.gameLib.game3= game3;
})();

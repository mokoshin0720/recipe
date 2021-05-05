(function() {
  function rest(){
    // スクリーンの初期化
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  	// 汎用変数
    keyUp[key.S] = false;
    run = false;
    run_rest = true;
    run_game1 = false;
    run_game2 = false;
    run_game3 = false;
    run_game4 = false;
    run_game5 = false;
    game_count++;
    console.log("残機"+zanki);

    //時間
    rest_fps = 1000;
    rest_timecount = 0;
    rest_number = 3;
    rest_number_pos = {
      x: canvas.width/2,
      y: canvas.height/2
    };
    rest_numbercolor =  "rgba(0,0,255,1.0)";
    rest_wordcolor =  "black";
    console.log("2: "+ game_count);
    //指令
    rest_word_pos = {
      x: canvas.width/2,
      y: canvas.height/4
    };
    switch (game_count%5) {
      case 1:
        rest_word = "ボールを落とすな！";
        exrest_word = "A（←）D（→）";
        break;
      case 2:
        rest_word = "赤マスへ急げ！";
        exrest_word = "W（↑）A（←）S（↓）D（→）";
        break;
      case 3:
        rest_word = "でかいやつら全員にぶつかれ！";
        exrest_word =  "W（↑）A（←）S（↓）D（→）";
        break;
      case 4:
        rest_word = "同じ形を当てはめろ！";
        exrest_word =  "W（決定）A（←）D（→）";
        break;
      case 0:
        rest_word = "打ち勝て！";
        exrest_word = "W（↑）A（←）S（↓）D（→）Q（発射）";
        break;
      default:
    }
    console.log("3: " + game_count);

    //イベント
    //文字
    function word() {
      ctx.font = "bold 32px Hiragino Kaku Gothic Std";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(exrest_word, rest_word_pos.x, rest_word_pos.y+350);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeText(exrest_word, rest_word_pos.x, rest_word_pos.y+350);

      ctx.font = "bold 32px Hiragino Kaku Gothic Std";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("操作するキーボード", rest_word_pos.x, rest_word_pos.y+250);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeText("操作するキーボード", rest_word_pos.x, rest_word_pos.y+250);

      ctx.font = "bold 32px Hiragino Kaku Gothic Std";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(rest_word, rest_word_pos.x, rest_word_pos.y);
      ctx.strokeStyle = rest_wordcolor;
      ctx.lineWidth = 3;
      ctx.strokeText(rest_word, rest_word_pos.x, rest_word_pos.y);

      ctx.font = "bold 32px Hiragino Kaku Gothic Std";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("残り残機　"+zanki, canvas.width-150, 50);
      ctx.strokeStyle = rest_wordcolor;
      ctx.lineWidth = 3;
      ctx.strokeText("残り残機　"+zanki, canvas.width-150, 50);

      ctx.font = "bold 32px Hiragino Kaku Gothic Std";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("スコア　"+game_count, 100, 50);
      ctx.strokeStyle = rest_wordcolor;
      ctx.lineWidth = 3;
      ctx.strokeText("スコア　"+game_count, 100, 50);
    }

    //カウント
    function number() {
      ctx.font = "bold 96px Hiragino Kaku Gothic Std";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = rest_numbercolor;
      ctx.fillText(rest_number - rest_timecount, rest_number_pos.x, rest_number_pos.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeText(rest_number - rest_timecount, rest_number_pos.x, rest_number_pos.y);
    }

    function end(){
      if(zanki == 0){
        ctx.font = "bold 96px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "blue";
        ctx.fillText("GAME OVER", rest_number_pos.x, rest_number_pos.y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText("GAME OVER", rest_number_pos.x, rest_number_pos.y);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Sを押して、スタートメニューへ戻る。", rest_number_pos.x, rest_number_pos.y + 150);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText("Sを押して、スタートメニューへ戻る。", rest_number_pos.x, rest_number_pos.y + 150);

      }else if(game_count == 6){
        ctx.font = "bold 96px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "red";
        ctx.fillText("スコア: "+game_count, rest_number_pos.x, rest_number_pos.y+150);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText("スコア: "+game_count, rest_number_pos.x, rest_number_pos.y+150);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("GAME CLEAR", rest_number_pos.x, rest_number_pos.y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText("GAME CLEAR", rest_number_pos.x, rest_number_pos.y);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("Sを押して、スタートメニューへ戻る。", rest_number_pos.x, rest_number_pos.y + 250);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.strokeText("Sを押して、スタートメニューへ戻る。", rest_number_pos.x, rest_number_pos.y + 250)
      }
    }

    function change_number_color(){
      switch (rest_number - rest_timecount) {
        case 3:
          rest_numbercolor =  "rgba(100,100,255,1.0)";
          console.log("blue : " + (rest_number - rest_timecount));
          console.log(rest_wordcolor);
          break;
        case 2:
          rest_numbercolor =  "rgba(0,255,0,1.0)";
          console.log("green : " + (rest_number - rest_timecount));
          console.log(rest_wordcolor);
          break;
        case 1:
          rest_numbercolor =  "rgba(255,0,0,1.0)"
          console.log("red : " + (rest_number - rest_timecount));
          console.log(rest_wordcolor);
          break;
        default:
      }
    }

  	// レンダリング処理を呼び出す
  	(function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if(game_count >= 6){
        end();
        if(keyUp[key.S]){
          window.gameLib.start();
          keyUp[key.S] = false;
        }
      }else if(zanki > 0){
        change_number_color();
        word();
        number();

      console.log(rest_timecount);
      rest_timecount++;
      if(rest_timecount>rest_number){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        switch (game_count%5) {
          case 1:
            window.gameLib.game1();
            break;
          case 2:
            window.gameLib.game2();
            break;
          case 3:
            window.gameLib.game3();
            break;
          case 4:
            window.gameLib.game4();
            break;
          case 0:
            window.gameLib.game5();
            break;
          default:
        }
      }
    }else {
      end();
      if(keyUp[key.S]){
        window.gameLib.start();
        keyUp[key.S] = false;
      }
    }

  		if(run_rest){setTimeout(arguments.callee, rest_fps);}
  	})();
  };

  window.gameLib= window.gameLib|| {};
  window.gameLib.rest = rest;
})();

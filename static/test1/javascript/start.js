(function() {
  function start(){
    // 汎用変数
    keyUp[key.W] = false;
    keyUp[key.S] = false;
    keyUp[key.A] = false;
    keyUp[key.D] = false;
    game_count = 0;
    zanki = 3;
    fps = 1000 / 30;
  	run = true;
  	run_rest = false;
  	run_game1 = false;
  	run_game2 = false;
  	run_game3 = false;
  	run_game4 = false;
  	run_game5 = false
    ballRadius = 100;
  	start_select_count = 2;
    select_word = "スタート！";
    select_bool = false;

    c = 0;

  	canvas = document.getElementById('canvas');
  	canvas.width = 800;
  	canvas.height = 600;
    keyDown = {};
  	keyUp = {};
    key = {
    	W: 87,
    	A: 65,
    	S: 83,
    	D: 68,
  		Q: 81
    };

    // 2dコンテキスト
    ctx = canvas.getContext('2d');

    //壁
    start_width = canvas.width;
    start_height = canvas.height;

    //ボタン
    box = start_width/6;

    for(var i=0; i<start_select_count; i++){
      start_select[i] = {
        x: start_width/2 - box + 2*box*i,
        y: start_height/2 + box/4,
        color: "red",
        sidecolor: "black"
      };
    }

    //word
    exword = "操作説明";
    exword1 = "基本操作はキーボードのWASDのみです。";
    exword2 = "（一部ステージを除く。）";
    exword3 = "必要な操作はゲームの前の休憩時間にお伝えします。";
    exword4 = "Sを押して、スタートメニューへ戻る。";


    // スクリーンの初期化
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // イベントの登録
    document.addEventListener("keydown", keyDownFunc);
    document.addEventListener("keyup", keyUpFunc);


    console.log(c);
    //イベント
    //セレクト操作
    function select(){
      if(keyUp[key.D]){
        if(c == 0){
          select_word = "操作説明";
          c++;
        }

        console.log(c);
        keyUp[key.D] = false;
      }
      if(keyUp[key.A]){
        if(c == 1){
          select_word = "スタート！";
          c--;
        }

        console.log(start_select[0].x);
        console.log(start_select[1].x);
        keyUp[key.A] = false;
      }
      if(keyUp[key.W]){
        if(c == 0){
          window.gameLib.rest();
        }
        if(c == 1){
          select_bool = true;
        }
        keyUp[key.W] = false;
      }
      if(keyUp[key.S]){
        select_bool = false;
        keyUp[key.S] = false;
      }
    }

    function word(){
      if(select_bool){
        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(exword, start_width/2, start_height/2-250);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(exword, start_width/2, start_height/2-250);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(exword1, start_width/2, start_height/2-150);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(exword1, start_width/2, start_height/2-150);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(exword2, start_width/2, start_height/2-50);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(exword2, start_width/2, start_height/2-50);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(exword3, start_width/2, start_height/2+50);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(exword3, start_width/2, start_height/2+50);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(exword4, start_width/2, start_height/2+150);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(exword4, start_width/2, start_height/2+150);

      }else {
        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("ミニゲーム集", start_width/2, start_select[c].y-250);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("ミニゲーム集", start_width/2, start_select[c].y-250);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("←A　（キーボード）  D→", start_width/2, start_select[c].y-150);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("←A　（キーボード）  D→", start_width/2, start_select[c].y-150);

        ctx.font = "bold 32px Hiragino Kaku Gothic Std";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText(select_word, start_select[c].x, start_select[c].y-50);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText(select_word, start_select[c].x, start_select[c].y-50);
      }
    }

    function draw(){
      if(select_bool == false){
        for(var i=0; i<start_select_count; i++){
          ctx.beginPath();
            ctx.rect(start_select[i].x-box/2, start_select[i].y, box, box);
            ctx.fillStyle = start_select[i].color;
            ctx.fill();
          ctx.closePath();
          ctx.beginPath();
            ctx.rect(start_select[i].x-box/2, start_select[i].y, box, box);
            ctx.strokeStyle = start_select[i].sidecolor;
            ctx.lineWidth = 4;
            ctx.stroke();
          ctx.closePath();
        }
      }
    }


  	// レンダリング処理を呼び出す
  	(function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      word();
      draw();
      select();

  		if(run){setTimeout(arguments.callee, fps);}
  	})();
  };

  window.gameLib= window.gameLib|| {};
  window.gameLib.start = start;
})();

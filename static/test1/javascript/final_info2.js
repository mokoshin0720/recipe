//global
//定義
var canvas, pos, ctx;
var run = true;
var game_count = 0;
var fps;
var counter = 0;
var touch = true;
var keyDown = {};
var keyUp = {};
var key = {};
var zanki = 3;

//スタート
//壁
var start_width;
var start_height;
//ボタン
var start_select = [];
var start_select_bool = [];
var c;
var box;
//時間
var start_select_count;
var ballRadius = 100;
var select_word;

//rest
var run_rest = false;
//時間
var rest_fps;
var rest_timecount;
var rest_number;
var rest_number_pos;
//指令
var rest_word_pos;
var rest_word

//game1
var run_game1 = false;
var game1_fps;
var game1_word;
var game1_time;
//ボール
var game1_pos;
var game1_vel;
var game1_ballRadius;
//自分
var game1_paddleHeight;
var game1_paddleWidth;
var game1_paddle;
//ブロック
var game1_brick_height;
var game1_brick_width;
var game1_brickWidth;
var game1_brickHeight;
var game1_brickPadding;
var game1_brickOffsetTop;
var game1_brickOffsetLeft;
var game1_bricks = [];
var game1_brick;

//game2
var run_game2 = false;
var game2_bool;
var game2_loop
var game2_word;
//時間
var game2_fps;
var game2_timecount;
var game2_number;
var game2_time;
//迷路
var game2_maze_width;
var game2_maze_height;
var game2_maze_size;
var game2_maze;
var game2_mazes = [];
var game2_start;
var game2_end;
//順路
var game2_wall;
var game2_walls = [];
//自分
var game2_mine;

//game3
var run_game3 = false;
var game3_loop;
var game3_bool;
var game3_word;
//時間
var game3_fps;
var game3_timecount;
var game3_number;
var game3_time;
//壁
var game3_width;
var game3_height;
//アイテム
var game3_particle_num;
var game3_particles = [];
var game3_count = 0;
//自分
var game3_size;
var game3_pos;
var game3_vel;

//game4
var run_game4 = false;
var game4_loop;
var game4_bool;
var game4_word;
//時間
var game4_fps;
var game4_timecount;
var game4_number;
var game4_time;
//壁
var game4_width;
var game4_height;
//アイテム
var game4_item_num;
//穴
var game4_h_holeS;
var game4_w_holeS;
var game4_w_hole_up = [];
var game4_w_hole_down = [];
var game4_h_hole_up = [];
var game4_h_hole_down = [];
var game4_w_up = [];
var game4_w_down = [];
var game4_h_up = [];
var game4_h_down = [];
//アイテム２
var game4_item = [];
var game4_item_pos = [];
var game4_hole = [];
var game4_hole_pos = [];
var game4_up_botton;
var game4_down_top;
//シャッフル
var game4_down_rand;
var game4_count = [];
var game4_zero;

//game5
var run_game5 = false;
var game5_loop;
var game5_bool;
var game5_word;


//定義(color)
var game1_ballcolor = [];
var game3_color;
var game4_color;
var game4_hole_color;
var game4_up_color;
var game4_down_color;
var game5_hp_color;
var rest_numbercolor;
var rest_wordcolor;

//
window.onload = function(){
	window.gameLib.start();
};

//キーイベント
function keyDownFunc(e) {
	keyDown[e.keyCode] = true;
	keyUp[e.keyCode] = false;
}

function keyUpFunc(e) {
	keyDown[e.keyCode] = false;
	keyUp[e.keyCode] = true;
}

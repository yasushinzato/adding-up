'use strict';
// ファイルを読み込むためのモジュールの呼び出し
const fs = require('fs');
const readline = require('readline');
// 直下のCSVファイルを読み込み。
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {}});
//[line]イベントが発生したら、1行分の文字[lineString]を表示する。
rl.on('line', (lineString) => {
    console.log(lineString);
});
rl.resume();

'use strict';
// ファイルを読み込むためのモジュールの呼び出し
const fs = require('fs');
const readline = require('readline');
// 直下のCSVファイルを読み込み。
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {}});
//[line]イベントが発生したら、1行分の文字[lineString]から集計年、都道府県、15～19歳の人工を抜き出す。
rl.on('line', (lineString) => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[2];
    const popu = parseInt(columns[7]);
    if (year == 2010 || year == 2015) {
        console.log(year);
        console.log(prefecture);
        console.log(popu);
    }
});
rl.resume();

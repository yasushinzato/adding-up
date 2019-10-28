'use strict';
// ファイルを読み込むためのモジュールの呼び出し
const fs = require('fs');
const readline = require('readline');
// 直下のCSVファイルを読み込み。
const rs = fs.ReadStream('./popu-pref.csv');
const rl = readline.createInterface({ 'input': rs, 'output': {}});
//[line]イベントが発生したら、1行分の文字[lineString]から集計年、都道府県、15～19歳の人工を抜き出す。
// 連想配列で都道府県の男女別レコードを纏める。
const map = new Map(); // key: 都道府県 value: 集計データのオブジェクト
rl.on('line', (lineString) => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[2];
    const popu = parseInt(columns[7]);
    if (year == 2010 || year == 2015) {
        // (都道府県が変るたびに)連想配列を初期化
        let value = map.get(prefecture);
        if(!value) {
            value = {
                popu10: 0, //2010年集計
                popu15: 0, //2015年集計
                change: null //変化量 　最後に計算する。
            };
        }
        if (year === 2010) {
            value.popu10 += popu;
        }
        if (year === 2015) {
            value.popu15 += popu;
        }
        map.set(prefecture, value);
        // console.log(year);
        // console.log(prefecture);
        // console.log(popu);
    }
});
rl.resume();
// すべての行を読み終わったら、変化量（2015年÷2010年)を計算する
rl.on('close', () =>{
    for (let pair of map){
        const value = pair[1]; //mapにあるvalue配列をセット
        value.change = value.popu15 / value.popu10;
    }
    // 変化率毎に降順で並べ替え
    const rankingArray = Array.from(map).sort((pair1,pair2) => {
        return pair2[1].change - pair1[1].change;
    });
    const rankingStrings = rankingArray.map((pair) => {
        return pair[0] + ': ' + pair[1].popu10 + '=>' + pair[1].popu15 + '変化率:'+ pair[1].change;
    })
    console.log(rankingStrings);
});


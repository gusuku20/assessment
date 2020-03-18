'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMlの要素
 */
function removeAllChidren(element){
    while (element.firstChild) {// 子供の要素がある限り削除
    element.removeChild(element.firstChild);
    }
}
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0 ) { //なめ画からの時は処理を終了する
    　　return;
    }
    
    // 診断表示結果エリアの作成
    removeAllChidren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    //TODO ツイートエリアの作成
    removeAllChidren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw";
    
    anchor.setAttribute('href', hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute('data-text',"診断結果の文章");
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
};
const answers = [
'{userName}の良いところは声です。{userName}の特徴的な声は皆を惹きつけ，心に残ります。',
'{userName}の良いところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}の良いところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}の良いところは厳しさです。{userName}の厳しさがいつも物事を成功に導きます。',
'{userName}の良いところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}の良いところはユニークさです。{userName}だけのその特徴がみんなを楽しくさせます。',
'{userName}の良いところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}の良いところは見た目です。内側からあふれ出る{userName}の良さにみんなが気をひかれます。',
'{userName}の良いところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}の良いところは思いやりです。{userName}二機をかけてもらった多くの人が感謝しています。',
'{userName}の良いところは好奇心です。新しいことに向かって新しいことに向かっていくの心構えが多くの人に魅力的に映ります。',
'{userName}の良いところは感受性です。{userName}が感じたことにみんなが共感し、分かり合うことができます。',
'{userName}の良いところは節度です。強引すぎない{userName}の考えにみんなが感謝しています。',
'{userName}の良いところは気配りです。{userName}の配慮が多くの人和救っています。',
'{userName}の良いところはそのすべてです。ありのままの{userName}自身がいいところなのです。',
'{userName}の良いところは自制心です。やばいと思ったときにやばいと思ったときにしっかりと衝動を抑えられるが皆から評価されています。',
];
/** 
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //　全文字のコード番号を取得してそれを足し合わせる
    let sumOFCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOFCharCode = sumOFCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOFCharCode % answers.length;
    let result = answers[index] ;
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

console.assert(
    assessment('太郎')　=== '太郎の良いところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

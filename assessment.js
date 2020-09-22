'use strict';
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

function removeAllChild(element) {
    while (element.firstChild) { //result-area になにかタグがある限りはループしてタグを削除
        element.removeChild(element.firstChild);
    }
}

/**診断処理を実行して、指定した要素に結果を追加する
 * @param {HTMLElement} element HTMLの要素
 */

function createAssessmentResult(element, result){
    const h3 = document.createElement('h3');
    h3.innerText = '診断結果'; //h3タグに'診断結果'の文字列を設定
    element.appendChild(h3); //result-area に h3 変数を設定

    //result-areaにPタグで診断結果を表示
    const p = document.createElement('p');
    p.innerText = result;
    resultDivided.appendChild(p);
}

assessmentButton.onclick = function funcAssessmentButtonOnclick() {
    let userName = userNameInput.value;
   if(userName.length === 0) {
        //名前の入力が無かったため処理を中断
        return;
    }
    
    //診断結果の表示
    removeAllChild(resultDivided);
    const result = assessment(userName);
    createAssessmentResult(resultDivided, result);

    removeAllChild(tweetDivided);

    const a = document.createElement('a');
    const href = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたのいいところ')
    + '&ref_src=twsrc%5Etfw';
    a.setAttribute('href', href);
    a.setAttribute('class', 'twitter-hashtag-button');
    a.setAttribute('data-text', result);
    a.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(a);

    //scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

    //scriptタグをHTMLとして追加する
    tweetDivided.appendChild(script);

};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
        assessmentButton.onclick();
    }
  };

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */

 function assessment(userName) {
     // useName (文字列)を数値に変換
     //すべての文字を足し算する
     let userNameNumber = 0;
     for (let i = 0; i < userName.length; i++) {
         userNameNumber += userName.charCodeAt(i);
     }

     //回答結果の回答結果を範囲 (0~15)に変換
     let answersNumber = userNameNumber % answers.length;
     //診断結果
     let result = answers[answersNumber];
     return  result.replace(/\{userName\}/g, userName); //置換
    }
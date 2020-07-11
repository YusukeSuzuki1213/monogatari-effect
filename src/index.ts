import './css/index.scss';
import { delay } from './mixin';
import {
  quadraticFuncCoordY,
  calcGradient,
  calcVertexY,
  calcRandomValueFromRange,
  calcRandomValueFromValueAndRate,
} from './calc';

window.onload = async function () {
  createCharSpan();
  await delay(10);
  removeSentence();
  await delay(1200);
  changeColor();
  frameAnimation();
  await delay(10);
  charAnimation(animation);
};

/*
 * 1文字ずつspanタグで囲む
 */
function createCharSpan() {
  const sentences = [
    '　桜の花が咲くと人々は酒をぶらさげたり団子だんごをたべて花の下を歩いて絶景だの春ランマンだのと浮かれて陽気になりますが、これは嘘です。なぜ嘘かと申しますと、桜の花の下へ人がより集って酔っ払ってゲロを吐いて喧嘩けんかして、これは江戸時代からの話で、大昔は桜の花の下は怖しいと思っても、絶景だなどとは誰も思いませんでした。近頃は桜の花の下といえば人間がより集って酒をのんで喧嘩していますから陽気でにぎやかだと思いこんでいますが、桜の花の下から人間を取り去ると怖ろしい景色になりますので、能にも、さる母親が愛児を人さらいにさらわれて子供を探して発狂して桜の花の満開の林の下へ来かかり見渡す花びらの陰に子供の幻を描いて狂い死して花びらに埋まってしまう（このところ小生の蛇足だそく）という話もあり、桜の林の花の下に人の姿がなければ怖しいばかりです',
    '　昔、鈴鹿峠にも旅人が桜の森の花の下を通らなければならないような道になっていました。花の咲かない頃はよろしいのですが、花の季節になると、旅人はみんな森の花の下で気が変になりました。できるだけ早く花の下から逃げようと思って、青い木や枯れ木のある方へ一目散に走りだしたものです。一人だとまだよいので、なぜかというと、花の下を一目散に逃げて、あたりまえの木の下へくるとホッとしてヤレヤレと思って、すむからですが、二人連は都合が悪い。なぜなら人間の足の早さは各人各様で、一人が遅れますから、オイ待ってくれ、後から必死に叫んでも、みんな気違いで、友達をすてて走ります。それで鈴鹿峠の桜の森の花の下を通過したとたんに今迄仲のよかった旅人が仲が悪くなり、相手の友情を信用しなくなります。そんなことから旅人も自然に桜の森の下を通らないで、わざわざ遠まわりの別の山道を歩くようになり、やがて桜の森は街道を外はずれて人の子一人通らない山の静寂へとり残されてしまいました。',
    '　そうなって何年かあとに、この山に一人の山賊が住みはじめましたが、この山賊はずいぶんむごたらしい男で、街道へでて情容赦なく着物をはぎ人の命も断ちましたが、こんな男でも桜の森の花の下へくるとやっぱり怖しくなって気が変になりました。そこで山賊はそれ以来花がきらいで、花というものは怖しいものだな、なんだか厭なものだ、そういう風に腹の中では呟つぶやいていました。花の下では風がないのにゴウゴウ風が鳴っているような気がしました。そのくせ風がちっともなく、一つも物音がありません。自分の姿と跫音あしおとばかりで、それがひっそり冷めたいそして動かない風の中につつまれていました。花びらがぽそぽそ散るように魂が散っていのちがだんだん衰えて行くように思われます。それで目をつぶって何か叫んで逃げたくなりますが、目をつぶると桜の木にぶつかるので目をつぶるわけにも行きませんから、一そう気違いになるのでした。',
    '　けれども山賊は落付いた男で、後悔ということを知らない男ですから、これはおかしいと考えたのです。ひとつ、来年、考えてやろう。そう思いました。今年は考える気がしなかったのです。そして、来年、花がさいたら、そのときじっくり考えようと思いました。毎年そう考えて、もう十何年もたち、今年も亦また、来年になったら考えてやろうと思って、又、年が暮れてしまいました。',
  ];

  const createdHtml = sentences
    .map(
      (sentence) =>
        Array.from(sentence)
          .map(
            (char) =>
              `<span class="box__sentences--char" style="display: inline-block">${char}</span>`
          )
          .join('') + '<br>'
    )
    .join('');

  document
    .getElementById('sentences')
    .insertAdjacentHTML('afterbegin', createdHtml);
}

/*
 * box外からはみ出ているsentenceは削除
 */
function removeSentence() {
  const boxElement = document.getElementById('box');

  Array.from(
    document.getElementsByClassName('anim-wrap__box__sentences--char')
  ).forEach((elem) => {
    if (
      boxElement.getBoundingClientRect().left >
      elem.getBoundingClientRect().left + 2
    ) {
      elem.remove();
    }
  });

  document.getElementById('sentences').style.visibility = 'visible';
}

/*
 * 色を変更
 */
function changeColor() {
  document.getElementById('wrap').style.background = '#656490';
  document.getElementById('box').style.color = '#d5d6f0';
  document.getElementById('title').style.visibility = 'visible';
}

/*
 * フレームを揺らす処理
 */
function frameAnimation() {
  const OFFSET_SPAN = 6;
  const TRANS_PX = 5;

  const transList = [
    { x: '0', y: '0' },
    { x: `-${TRANS_PX}`, y: `-${TRANS_PX}` },
    { x: `${TRANS_PX}`, y: `${TRANS_PX}` },
    { x: `${TRANS_PX}`, y: `-${TRANS_PX}` },
    { x: `-${TRANS_PX}`, y: `${TRANS_PX}` },
    { x: `${TRANS_PX}`, y: `${TRANS_PX}` },
    { x: `-${TRANS_PX}`, y: `-${TRANS_PX}` },
  ];
  const animationList = [];

  transList.forEach((data, index) =>
    animationList.push({
      offset: index / OFFSET_SPAN,
      transform: `translate(${data.x}px, ${data.y}px)`,
    })
  );

  document.getElementById('box').animate(animationList, {
    delay: 0,
    duration: 200,
    fill: 'forwards',
    easing: 'ease-in',
  });
}

/* 1文字に対してアニメーションをさせる */
function charAnimation(animation: (elem: Element, index: number) => void) {
  Array.from(
    document.getElementsByClassName('box__sentences--char')
  ).forEach((elem, index) => animation(elem, index));
}

function animation(elem: Element, index: number) {
  // 画面のサイズ
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // 頂点の座標
  const vertexX = -windowWidth;
  const vertexY = 2 * windowHeight;

  // 頂点が(vertexX, vertexY)で、座標(0, 3/2*windowYFromRight)を通る2次関数の傾きを求める
  const gradient = calcGradient(vertexX, vertexY, 0, 1.5 * windowHeight);

  // アニメーションの終わりの座標
  const goalX = windowWidth * 2;

  //この文字の, 画面左からの座標取得
  const coordXFromLeftTopPx = elem.getBoundingClientRect().left;
  const coordYFromLeftTopPx = elem.getBoundingClientRect().top;

  //この文字の座標を通る2次関数の頂点のY座標
  const currentVertexY = calcVertexY(
    coordYFromLeftTopPx,
    gradient,
    coordXFromLeftTopPx,
    vertexX
  );

  // 文字のアニメーションの始動タイミングをランダムに
  const delay = Math.floor(Math.random() * 700) + 300 - index * 0.25;

  /* // 文字の場所に応じてスピードを変える
  const speed =
    (coordYFromLeftTopPx ** 2 + (windowWidth - coordXFromLeftTopPx) ** 2) *
    0.0001; */

  // ある文字の移動距離
  const translateX = goalX - coordXFromLeftTopPx;
  const translateY =
    quadraticFuncCoordY(goalX, gradient, vertexX, currentVertexY) -
    coordYFromLeftTopPx;

  const SPAN_OFFSET = 8;
  const animateList = [];
  let degValueOld = 0;

  for (let i = 0; i < SPAN_OFFSET + 1; i++) {
    const rate = i / SPAN_OFFSET;
    const degValue = i == 0 ? 0 : calcRandomValueFromRange(45, 180);
    const transX = calcRandomValueFromValueAndRate(translateX * rate, 0.95);
    const transY = calcRandomValueFromValueAndRate(translateY * rate, 0.95);
    animateList.push({
      offset: rate,
      transform: `translate(${transX}px, ${transY}px) rotate(-${
        degValueOld + degValue
      }deg)`,
    });
    degValueOld += degValue;
  }

  elem.animate(animateList, {
    delay: delay,
    duration: 2200,
    fill: 'forwards',
    easing: 'ease-in-out',
  });
}

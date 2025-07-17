//var txspeed = 20;
async function TextTyping(txspeed) {  
  let elements = document.getElementsByClassName("js-text-anime");
  for (var i = 0; i < elements.length; i++) {
    await animateText(elements[i],txspeed);
  }
}
async function animateText(element,txspeed) {
    var i = 0;
    var j = 0;
  let text = element.innerText;
  element.innerText = "";

  for (i = 0; i < text.length; i++) {
    var span = document.createElement("span");
    span.innerText = text[i];
    element.appendChild(span);
  }

  let spans = element.getElementsByTagName("span");
  for (j = 0; j < spans.length; j++) {
    await new Promise((resolve, reject) => {
      setTimeout(function () {
        spans[j].style.opacity = 1;
        resolve()
      }, txspeed); // 遅延時間を調整したい場合はここの数値を変更してください
    })
    // (function (index) {
    // })(j);
  }
  
}


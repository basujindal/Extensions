var paragraph = document.getElementById("input");
var display = document.getElementById("note");
var converter = new showdown.Converter();
// paragraph.innterText = '**hello**, markdown!';
// html =

display.innerHTML = converter.makeHtml(paragraph.innterText);
// display.innerHTML = mmd("[website](https://basujindal.me) **Hello**");

paragraph.addEventListener("keyup", function (event) {
  // if (event.keyCode === 13) {
  //   var converter = new showdown.Converter();
  display.innerHTML = converter.makeHtml(paragraph.value);
  console.log("Hello");
  // }
});

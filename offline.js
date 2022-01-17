"use strict";

// alert("Hello World!!");
const output_area = document.getElementById("output_area");
const get_default = document.getElementById("get_default");
const kaigyo = document.getElementById("kaigyo");
const output = document.getElementById("output");
const select = document.getElementById("select");
const paragraph = document.getElementById("paragraph");

function convert() {
    let text = document.getElementById("input_area").value;
    // console.log(text);
    let array = replaceText(text);
    let str = buildStr(array);
    // console.log(str);
    // const output = document.getElementById("output_area");
    // output.textContent(str);
    output_area.value = str;
}

function buildStr(array) {
    const kaigyo = paragraph.value;
    let str = "";
    for(let i = 0; i < array.length; i++) {
        if(i % 2 === 0 && array[i + 1] !== "") { str += array[i]; }
        if(i % 2 === 1) { str += array[i]; if(kaigyo === "true") { str += "\n"; }}
    }
    return str;
}

function replaceText(t) {
    let text = t.replace(/：/g, "");
    text = text.replace(/\n/g, "");
    // text = text.replace("))", "");
    // text = text.replace("[[", "");
    // text = text.replace("]]", "");
    // placeholder.forEach(item => text = text.replace(placeholder[item], ""));
    text = text.replace(/【/g, "||【");
    text = text.replace(/】/g, "】||");
    for(let i = 0; i < items.length; i++) {
        text = text.replace(placeholder[items[i].name], "");
    }
    let array = text.split("||");
    array.shift();
    // console.log(array);
    return array;
}

// $("#get_default").click(function() {
//     confirm("当 PC は 5 秒後に自爆します。よろしいですか？");
// });

// 空の設定文書テンプレートを表示
get_default.addEventListener("click", function() {
    // let bomb = confirm("当 PC は 5 秒後に自爆します。よろしいですか？");
    // if(bomb) { console.log("じ・ば・く！！！"); }
    let bool = false;
    if(kaigyo.checked) { bool = true; }
    console.log(bool);
    window.sessionStorage.setItem("kaigyo", bool);
    let file = "default.html";
    // const from = window.sessionStorage.getItem("from");
    // if(from === "stage") { file = "../charaEditorWords/" + file; }
    window.open(file, "_blank"); 
});

// 変換処理のトリガー
output.addEventListener("click", function() {
    convert();
});

// テキストエリア全選択
select.addEventListener("click", function() {
    output_area.focus();
    output_area.select();
});

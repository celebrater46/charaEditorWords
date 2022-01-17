"use strict";

let resetSW = false;
let num = 0;
let layout = calcItemNum();

function htmlWriter() {
  let double = htmlWriterDQ(2, "double");
  let quarter = htmlWriterDQ(4, "quarter");
  let single = htmlWriterSingle();
  // console.log("【double】\n\n" + double);
  // console.log("【quarter】\n\n" + quarter);
  // console.log("【single】\n\n" + single);
  let str = double + quarter + single;
  $("#mainForm").html(str);
}

function htmlWriterStage() {
  let str = htmlWriterName();
  // alert("Hello World from HWS");
  let single = htmlWriterSingle();
  str = str + single;
  $("#mainForm").html(str);
}

function htmlWriterDQ(root, type) { // double or quarter
  let code = "";
  for (let i = 0; i < layout[type]; i++) {
    if (i % root === 0) { code += '<div class="formContainerChild">\n'; }
    code += '  <div class="formContainerGrandChild ' + items[num]["type"] + '">\n    <h2>';
    code += items[num]["title"] + '</h2>\n    <input type="text" id="item_' + num;
    code += '" name="' + items[num]["name"] + '" class="';
    code += items[num]["type"] + ' form-control bg-dark text-light" ';
    code += 'placeholder="' + placeholder[items[num]["name"]];
    code += '">\n  </div>\n';
    if (root === 2 && i % root === 1) { code += '</div>\n\n'; }
    if (root === 4 && i % root === 3) { code += '</div>\n\n'; }
    num++;
  }
  let end = code.substr(-12, 1);
  if(end === '"') { code += '</div>\n\n'; }
  // console.log("【end】" + end);
  return code;
}

function htmlWriterSingle() {
  let code = "";
  console.log(layout["single"]);
  console.log(items[num]["title"]);
  for (let i = 1; i < layout["single"]; i++) {
    code += '<div class="formContainerChild long">\n<h2>';
    code += items[num]["title"] + '</h2>\n<textarea id="item_' + num;
    code += '" name="' + items[num]["name"] + '" class="';
    code += items[num]["type"] + ' form-control bg-dark text-light" ';
    code += 'placeholder="' + placeholder[items[num]["name"]];
    code += '"></textarea>\n</div>\n\n';
    num++;
  }
  console.log(code);
  return code;
}

function htmlWriterName() {
  let code = '<div class="formContainerChild">\n<h2>';
  code += items[num]["title"] + '</h2>\n<input id="item_' + num;
  code += '" name="' + items[num]["name"] + '" class="';
  code += items[num]["type"] + ' form-control bg-dark text-light stageTop" ';
  code += 'placeholder="' + placeholder[items[num]["name"]];
  code += '">\n</div>\n\n';
  num++;
  // console.log(code);
  return code;
}

// single タイプの項目数を計算
function calcItemNum() {
  let itemsNum = { single: 0, double: 0, quarter: 0 };
  console.log(items);
  for (let i = 0; i < items.length; i++) {
    switch(items[i]["type"]) {
      case "single": itemsNum["single"]++; break;
      case "double": itemsNum["double"]++; break;
      case "quarter": itemsNum["quarter"]++; break;
      default: console.log('items[i]["type"] に不正な値が含まれています。'); break;
    }
  }
  return itemsNum;
}

function getForm() {
  let data = new Array();
  for (let i = 0; i < items.length; i++) {
    let id = "#item_" + i;
    let str = $(id).val();
    data[i] = { name: items[i]["name"], value: str };
  }
  // console.log("data from getForm:");
  // console.log(data);
  return data;
}

function dataSave() {
  let obj = getForm();
  let setJson = JSON.stringify(obj);
  let name = obj[0]["value"];
  // if(name === null) { name = "No Name"; }
  localStorage.setItem(name, setJson);
  // console.log("obj from setJson:");
  // console.log(obj);
}

let autoSave = function() {
  let bool = $("#autoSave").prop("checked");
  console.log(bool);
  if(bool) { dataSave(); }
  setTimeout(autoSave, 60000);
};

// 自動保存機能
autoSave();

function output() {
  let data = getForm();
  let paragraph = $("#paragraph").val();
  let str = "▼" + data[0]["value"];
  if(paragraph === "true") { str += "\n\n"; } else { str += "　……　"; }
  for(let j = 1; j < data.length; j++) {
    if(data[j]["value"] !== "") {
      str += "【" + items[j]["title"] + "】" + data[j]["value"];
      if(paragraph === "true") { str += "\n"; }
    }
  }
  return str;
}

// データ保存（手動）
$("#save").click(function() {
  dataSave();
});

// データ復元
$("#restore").click(function() {
  let name = $("#item_0").val();
  console.log("name from restore" + name);
  if(name === "") { alert("名前を入力してください"); return; }
  let getJson = localStorage.getItem(name);
  let obj = JSON.parse(getJson);
  for(let i = 0; i < items.length; i++) {
    let id = "#item_" + i;
    $(id).val(obj[i]["value"]);
  }
  // console.log("obj from getJson:");
  // console.log(obj);
});

// 完成文を出力
$("#output").click(function() {
  let str = output();
  $("#outputArea").val(str);
});

// 全選択
$("#select").click(function() {
  $("#outputArea").select();
});


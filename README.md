# Node.js基本

## 準備
1. Node.jsをインストールしておきます。
2. ローカル環境の適当な場所にprojectフォルダを作成してそのフォルダ内で作業を行います。

## Hello,worldの表示

コマンドラインはあらかじめprojectフォルダに移動しておきます。
**`cd`コマンドは、カレントディレクトリ（カレントワーキングディレクトリ）の位置を変更するコマンドです**

JavaScriptでHello,world!を作成します。

```
console.log("Hello,world!");
```

次のコマンドで確認できます。ちなみに拡張子は省略することができます。

```
node hello.js
```

## memo作成
memoフォルダを新規作成して、その中にapp.jsファイルを作成します。
### require関数
1. コアモジュール、ビルトインモジュール
2. オリジナルファイル
3. npmパッケージ

(コアモジュールについてはこちら)[https://nodejs.org/api/]

### 新規ファイルを追加して何かを書き込む
これはappendFile()を使用する。
appendFile()の活用方法はdocumentで読んで参考。

(fs.appendFile(path, data[, options], callback))[https://nodejs.org/api/fs.html#fs_fs_appendfile_path_data_options_callback]

次の内容をapp.jsファイルに記述して実行すると、新規ファイルにHello,world!が書き込まれるか確認。もう一度実行すると追記されることも確認しておく。

```
console.log("app.js稼働開始");

const fs = require("fs");

fs.appendFile("greeting.txt","Hello,world!",function(err){
	if(err){
		console.log(err);
	}
})
```

### user情報を取得
OS関連のメソッドもたくさん用意されています。
今回はuserInfo()を使って見ます。まずはdocumentで確認しておきます。

(os.userInfo([options]))[https://nodejs.org/api/os.html#os_os_userinfo_options]

コード
```
console.log("app.js稼働開始");

const fs = require("fs");
const os = require("os");

let user = os.userInfo();
console.log(user);
fs.appendFile("greeting.txt","Hello,"+user.username,function(err){
	if(err){
		console.log(err);
	}
})
```
greeting.txtにユーザー名が書き出されます。

#### require()について補足
独自ファイルを呼び出す場合にも`require()`が使えます。
その場合は引数に呼び出すファイルのパスを記述します。

```
require("./sample.js");
```


## アプリ開発準備
初期設定は`npm init`で行います。
色々聞かれますが、そのまま無記入で進めることもできます。

package.jsonができます。

## gruntのインストール

通常のインストール方法は次のコマンド

```
npm install grunt --save
```

gruntがインストールされ、package.jsonにgruntインストール情報が追記されます。dependenciesの部分がそれです。

```
{
  "name": "memo",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "grunt": "^1.0.3"
  }
}
```

### 別のインストール方法

別のインストール方法はpackage.jsonにインストールしたいモジュールの情報を記述します。

次の例はpackege.jsonにexpressの最新バージョンを指定したものです。あとはコマンドで`npm install`とだけ入力すればexpressがインストールされます。

```
{
  "name": "memo",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "grunt": "^1.0.3",
    "express": "*"
  }
}
```
この方法を使うと共同作業者がpackage.jsonを共有することで同一の環境を作ることができます。

## nodemonの導入
nodemonを導入するとコードを変更するたびにコマンドを入力して再起動する必要がなくなります。
今回はnodemonをグローバルにインストールします。
```
npm install nodemon -g
```

`nodemon app.js`とコマンドを入れると開始します。
尚、nodemonを終了するには「control+C」です。

## コマンド引数の使い方
実行コマンドを入力する際にそのあとになんらかの文字列を入力するとコマンド引数として扱われます。

例
app.jsに次のコードを追加します。
```
console.log(process.argv);
```
次のように配列として表示されます。
[ '/Users/tahara/.nodebrew/node/v9.10.0/bin/node',
  '/Users/tahara/learning/nodejs/node_project1/memo/app.js',
  'mytext' ]
1.  最初がnodeのインストール場所
2.  ２番目が現在のフォルダのパス
3.  ３番目が入力した引数となります

コマンド引数を使ってメモ帳の動作を切り分けます。

```
console.log("app.js稼働開始");
const fs = require("fs");
let command = process.argv[2];
console.log("コマンド:",command);
if (command === "add"){
	console.log("メモを追加します。");
}else if(command === "list"){
	console.log("メモ一覧を表示します。");
}else if(common === "read"){
	console.log("メモを個別表示します。");
}else if(command === "remove"){
	console.log("メモを削除します。")
}
```

### コマンド引数をもっと便利にするyargsの導入

```
 npm install yargs@4.7.1 --save
```

yargsを使ってみる
```
console.log("app.js稼働開始");

const fs = require("fs");
const yargs = require("yargs");
const argv = yargs.argv;

let command = process.argv[2];
console.log("コマンド:",command);

console.log("process",process.argv);
console.log("yargs",argv);

if (command === "add"){
	console.log("メモを追加します。");
}else if(command === "list"){
	console.log("メモ一覧を表示します。");
}else if(command === "read"){
	console.log("メモを個別表示します。");
}else if(command === "remove"){
	console.log("メモを削除します。")
}
```

コマンドは次のように入力
```
node app.js read --title="テキスト"
```

yargsの表示は次のようにオブジェクト形式となります。

`yargs { _: [ 'read' ], title: 'テキスト', '$0': 'app.js' }`


## memo帳作成

app.js
```
console.log("app.js稼働開始");

const fs = require("fs");
const notes = require("./notes.js");
const yargs = require("yargs");
const argv = yargs.argv;

let command = argv._[0];

if (command === "add"){
	notes.addNote(argv.title,argv.body);
}else if(command === "list"){
	notes.showAll();
}else if(command === "read"){
	notes.readNote(argv.title);
}else if(command === "remove"){
	notes.removeNote(argv.title);
}
```

note.js
```
console.log("notes.js稼働");

let addNote = (title,body) =>{
	console.log("メモ追加",title,body);
};
let showAll = () =>{
	console.log("メモ一覧表示");
};
let readNote = title =>{
	console.log("個別メモの読み込み",title);
};
let removeNote = title =>{
	console.log("個別メモの削除",title);
};

module.exports = {
	addNote,
	showAll,
	readNote,
	removeNote
}
```

実行コマンド
add
```
node app.js add --title="今日の天気" --body="はれ"
```

list
```
node app.js list
```

read
```
node app.js read  --title="今日の天気"
```

remove
```
node app.js remove  --title="今日"
```

### addの作成

```
console.log("notes.js稼働");
const fs = require("fs");

let addNote = (title,body) =>{
	let notes = [];
	let note = {
		title,
		body
	};
	notes.push(note);
	fs.writeFileSync("notes-data.json",JSON.stringify(notes));
};
let showAll = () =>{
	console.log("メモ一覧表示");
};
let readNote = title =>{
	console.log("個別メモの読み込み",title);
};
let removeNote = title =>{
	console.log("個別メモの削除",title);
};

module.exports = {
	addNote,
	showAll,
	readNote,
	removeNote
}
```

次のコマンドで自動的にnotes-date.jsonファイルが作成されて記述されます。

```
node app.js add --title="今日の天気" --body="はれ"
```

notes-data.jsonの内容
```
[{"title":"今日の天気","body":"はれ"}]
```

### 追加書き込み可能にする

notes.js
```
console.log("notes.js稼働");
const fs = require("fs");

let addNote = (title,body) =>{
	let notes = [];
	let note = {
		title,
		body
	};
	let notesString = fs.readFileSync("notes-data.json");
	notes = JSON.parse(notesString);

	notes.push(note);
	fs.writeFileSync("notes-data.json",JSON.stringify(notes));
};
let showAll = () =>{
	console.log("メモ一覧表示");
};
let readNote = title =>{
	console.log("個別メモの読み込み",title);
};
let removeNote = title =>{
	console.log("個別メモの削除",title);
};

module.exports = {
	addNote,
	showAll,
	readNote,
	removeNote
}
```

注意：fs.readFileSync()はすでにファイルがあることが条件で使えるものです。新規の場合はこのままではエラーになります。
この問題を解決するには、`try{}catch(e){}`で対応します。

notes.js
```
console.log("notes.js稼働");
const fs = require("fs");

let addNote = (title,body) =>{
	let notes = [];
	let note = {
		title,
		body
	};

	try{
		let notesString = fs.readFileSync("notes-data.json");
		notes = JSON.parse(notesString);
	}catch(e){

	}
	
	let duplicatedNotes = notes.filter(note => note.title === title);
	if(duplicatedNotes.length === 0){
		notes.push(note);
	fs.writeFileSync("notes-data.json",JSON.stringify(notes));
	}
};
let showAll = () =>{
	console.log("メモ一覧表示");
};
let readNote = title =>{
	console.log("個別メモの読み込み",title);
};
let removeNote = title =>{
	console.log("個別メモの削除",title);
};

module.exports = {
	addNote,
	showAll,
	readNote,
	removeNote
}
```

#### 処理の関数化

notes.js
```
console.log("notes.js稼働");
const fs = require("fs");

let fetchNotes = () =>{
	try{
		let notesString = fs.readFileSync("notes-data.json");
		return JSON.parse(notesString);
	}catch(e){
		return [];
	}
};
let saveNotes = notes =>{
	fs.writeFileSync("notes-data.json",JSON.stringify(notes));
};

let addNote = (title,body) =>{
	let notes = fetchNotes();
	let note = {
		title,
		body
	};

	
	
	let duplicatedNotes = notes.filter(note => note.title === title);
	if(duplicatedNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
	}
};
let showAll = () =>{
	console.log("メモ一覧表示");
};
let readNote = title =>{
	console.log("個別メモの読み込み",title);
};
let removeNote = title =>{
	console.log("個別メモの削除",title);
};

module.exports = {
	addNote,
	showAll,
	readNote,
	removeNote
}
```
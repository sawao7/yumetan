var wordlist = [
    "effort",
    "dawn",
    "supply",
    "grade",
    "instrument",
    "means",
    "rate",
    "subject",
    "access",
    "glance",
];
var wordlistJapanese = [
    "努力",
    "夜明け",
    "供給",
    "等級",
    "道具",
    "手段",
    "割合",
    "主題",
    "接近方法",
    "一見",
];
var musiclistjapanese = [
    "https://yumetanweb.alc.co.jp/audio/2/A01_1_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_2_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_3_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_4_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_5_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_6_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_7_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_8_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_9_1.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_10_1.mp3",
];
var musiclistEnglish = [
    "https://yumetanweb.alc.co.jp/audio/2/A01_1_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_2_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_3_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_4_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_5_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_6_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_7_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_8_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_9_2.mp3",
    "https://yumetanweb.alc.co.jp/audio/2/A01_10_2.mp3",
];
var mistakelist = [];
var time_limit = 30;
var readytime = 3;
var score;
var correct;
var mistake;
var char_num = 0;
var word_char;
var random;
var english_score = 0;
var myfinish = 1;
var all_number = 0;
var my_time = 5;
function ready() {
    // var music = new Audio("https://yumetanweb.alc.co.jp/audio/2/A01_1_1.mp3");
    // music.play();
    readytime = 3;
    scoredis.innerHTML = "";
    start_button.style.visibility = "hidden";
    var readytimer = setInterval(function () {
        count.innerHTML = readytime;
        readytime--;
        if (readytime < 0) {
            count.innerHTML = "題" + (all_number + 1) + "問";
            clearInterval(readytimer);
            gameStart();
        }
    }, 1000);
}
function gameStart() {
    score = 0.0;
    mistake = 0;
    correct = 0;
    wordDisplay();
    var time_remaining = time_limit;
    var gametimer = setInterval(function () {
        // count.innerHTML = "残り時間：" + time_remaining;
        time_remaining--;
        if (time_remaining <= 0) {
            myfinish = 0;
            clearInterval(gametimer);
        }
    }, 1000);
}
function wordDisplay() {
    // var time_remaining = time_limit;
    // var gametimer = setInterval(function () {
    //     // count.innerHTML = "残り時間：" + time_remaining;
    //     time_remaining--;
    //     if (time_remaining <= 0) {
    //         clearInterval(gametimer);
    //         finish();
    //     }
    // }, 1000);

    var mytime = my_time + 1;
    var mytimer = setInterval(function () {
        if (myfinish === 0) {
            clearInterval(mytimer);
            console.log("finish_log");
            finish();
            mytime = null;
        } else {
            console.log(mytime);
            mytime--;
            count.innerHTML = "残り時間" + mytime;
        }
        // console.log(mytime);
        if (char_num == wordlist[random].length) {
            char_num = 0;
            word.innerHTML = "";
            wordlist.splice(random, 1);
            wordlistJapanese.splice(random, 1);
            musiclistjapanese.splice(random, 1);
            musiclistEnglish.splice(random, 1);
            console.log("yey2");
            count.innerHTML =
                "<h1 style='color: rgb(212, 181, 0);'>Good!!</h1>";
            clearInterval(mytimer);
            english_score++;
            all_number++;
            wordDisplay();
        } else if (mytime < 0) {
            all_number++;
            mistakelist.push(wordlistJapanese[random]);
            count.innerHTML = "題" + (all_number + 1) + "問";
            clearInterval(mytimer);
            char_num = 0;
            word.innerHTML = "";
            wordlist.splice(random, 1);
            wordlistJapanese.splice(random, 1);
            musiclistjapanese.splice(random, 1);
            musiclistEnglish.splice(random, 1);
            // console.log("yey");
            wordDisplay();
            // testtime = 1;
            // var test = setInterval(function () {
            //     console.log(testtime + "これtest");
            //     testtime--;
            //     if (testtime == 0) {
            //         clearInterval(test);
            //         wordDisplay();
            //     }
            // },1000)
        } else if (mytime == 0) {
            count.innerHTML = "時間切れ";
            word.innerHTML =
                "<span style='color: black;'>" +
                wordlist[random].substr(0, char_num) +
                "</span>" +
                "<span style = 'color:red'>" +
                wordlist[random].substr(char_num, wordlist[random].length) +
                "</span>";
            console.log("後ろの" + mytime);
            console.log("終了");
        } else if (mytime == 2) {
            console.log("music");
            var music_answer = new Audio(musiclistEnglish[random]);
            music_answer.play();
        }
    }, 1000);
    random = Math.floor(Math.random() * wordlist.length);
    // word.innerHTML = wordlist[random];
    var music = new Audio(musiclistjapanese[random]);
    music.play();
    japanese.innerHTML =
        wordlistJapanese[random] +
        "(" +
        "<span style='color: red;'>" +
        wordlist[random].length +
        "</span>" +
        "語)";
    charInsort();
}
function charInsort() {
    word_char = wordlist[random].charAt(char_num);
    // console.log(char_num);
    // console.log(word_char);
}
function finish() {
    // score = Math.floor(
    //     Math.pow(correct, 2) * Math.pow(correct / (correct + mistake), 5)
    // );
    var total_score = ((english_score / all_number) * 100).toFixed(1);
    var message;
    if (total_score == 100) {
        message = "Congratulation!!";
    } else if (total_score >= 80) {
        message = "Great!!";
    } else if (total_score >= 60) {
        message = "Good!!";
    } else if (total_score >= 40) {
        message = "So so...";
    } else if (total_score >= 20) {
        messge = "Good luck...";
    } else if (total_score >= 0) {
        message = "More Study...";
    }
    scoredis.innerHTML =
        "FINISH!! <span style = 'font-size:30px;font-weight:bold;color:red;'>" +
        message +
        "</span>" +
        "<h1>" +
        "あなたの正答率は..." +
        "<span style='font-size:40px;font-weight:bold;'>" +
        total_score +
        "%" +
        "</span>" +
        " です" +
        "</h1>" +
        "<span style = 'font-weight:bold;'>正解数 : </span>" +
        "<span style='font-size:40px;font-weight:bold;color:red;'>" +
        english_score +
        "</span>" +
        "<hr>" +
        "<span style = 'font-weight:bold;'>間違えた問題 : </span>" +
        "<span style = 'font-weight:bold;color:red;'>" +
        mistakelist +
        "</span>";
    // " 点" +
    // "<hr>正タイプ数:" +
    // correct +
    // "<br>ミスタイプ数:" +
    // mistake +
    // "<br>正答率" +
    // ((correct / (correct + mistake)) * 100).toFixed(1) +
    // "%";
    count.style.display = "none";
    console.log("heloo");
    word.innerHTML = "";
    japanese.innerHTML = "";
    start_button.style.display = "none";
    word_char = 0;
    random = 0;
    char_num = 0;
}
document.onkeydown = function (e) {
    if (e.keyCode == 189) {
        keyStr = "-";
    } else if (e.keyCode == 188) {
        keyStr = ",";
    } else {
        var keyStr = String.fromCharCode(e.keyCode);
        keyStr = keyStr.toLowerCase();
    }
    if (keyStr == word_char) {
        // document.getElementById("missaudio").pause();
        // document.getElementById("missaudio").currentTime = 0;
        // document.getElementById("correctaudio").pause();
        // document.getElementById("correctaudio").currentTime = 0;
        // document.getElementById("correctaudio").play();
        word.innerHTML =
            "<span style='color: black;'>" +
            wordlist[random].substr(0, char_num + 1) +
            "</span>";
        // wordlist[random].substr(char_num + 1, wordlist[random].length);
        japanese.innerHTML =
            wordlistJapanese[random] +
            "(" +
            "<span style='color: red;'>" +
            wordlist[random].substr(char_num + 1, wordlist[random].length)
                .length +
            "</span>" +
            "語)";
        char_num++;
        correct++;
        charInsort();
    } else {
        // document.getElementById("missaudio").pause();
        // document.getElementById("missaudio").currentTime = 0;
        // document.getElementById("correctaudio").pause();
        // document.getElementById("correctaudio").currentTime = 0;
        mistake++;
        // document.getElementById("missaudio").play();
    }
    // if (char_num == wordlist[random].length) {
    //     char_num = 0;
    //     word.innerHTML = "";
    //     wordlist.splice(random, 1);
    //     wordlistJapanese.splice(random, 1);
    //     console.log("yey2");
    //     wordDisplay();
    // }
};

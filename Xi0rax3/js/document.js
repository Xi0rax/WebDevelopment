var attempt;
var score;
var number;
var level;
var m;
var n;
var current_div = 'container';

function main_menu() {
    document.getElementById("start").setAttribute("disabled", "disabled");
    smooth_transition('container');
    setTimeout("restore('level')", 500);
    current_div = 'level';
    setTimeout("document.getElementById('start').removeAttribute('disabled')", 550);
}

function game(min, max) {
    disable_levels();
    m = max;
    n = min;
    document.getElementById('num_box').addEventListener("keyup", enter);
    score = 0;
    attempt = 1;
    level = 1;
    smooth_transition('level');
    number = Math.round(Math.random() * (max - min) + min);
    setTimeout("restore('game')", 500);
    setTimeout("show('Число загадано', 'hints')", 550);
    setTimeout("smooth_transition('hints')", 2000);
    setTimeout("enable_levels()", 2500);
    current_div = 'game';
}

function smooth_transition(id) {
    setTimeout(function () {
        document.getElementById(id).style.opacity = '0.8'
    }, 200);
    setTimeout(function () {
        document.getElementById(id).style.opacity = '0.6'
    }, 250);
    setTimeout(function () {
        document.getElementById(id).style.opacity = '0.4'
    }, 300);
    setTimeout(function () {
        document.getElementById(id).style.opacity = '0.2'
    }, 350);
    setTimeout(function () {
        document.getElementById(id).style.opacity = '0'
    }, 400);
    setTimeout(function () {
        document.getElementById(id).style.visibility = "hidden"
    }, 450);
}

function restore(id) {
    document.getElementById(id).style.visibility = "visible";
    document.getElementById(id).style.opacity = '1';
}

function num_handle(value) {

    if (value == number && attempt < 6) {
        show("Правильно", "hints");
        document.getElementById("num_box").removeEventListener("keyup", enter);
        setTimeout("smooth_transition('hints')", 1500);
        switch (attempt) {
            case 1:
                score += 10;
                break;
            case 2:
                score += 8;
                break;
            case 3:
                score += 6;
                break;
            case 4:
                score += 4;
                break;
            case 5:
                score += 2;
                break;
        }
        setTimeout("change_level(m,n)", 2000);
        setTimeout("document.getElementById('val_score').innerHTML = score.toString()", 2600);
        setTimeout("document.getElementById('val_lev').innerHTML = level.toString()", 2600);
    }
    else if (value < number && attempt < 5) {
        document.getElementById("num_box").removeEventListener("keyup", enter);
        show("Неправильно. Введенное число <b>меньше</b> загаданного", 'hints');
        setTimeout("smooth_transition('hints')", 1000);
        attempt += 1;
        document.getElementById('val_att').innerHTML = attempt.toString();
        setTimeout("document.getElementById('num_box').addEventListener('keyup', enter)", 2000);
    }
    else if (value > number && attempt < 5) {
        document.getElementById("num_box").removeEventListener("keyup", enter);
        show("Неправильно. Введенное число <b>больше</b> загаданного", 'hints');
        setTimeout("smooth_transition('hints')", 1000);
        attempt += 1;
        document.getElementById('val_att').innerHTML = attempt.toString();
        setTimeout("document.getElementById('num_box').addEventListener('keyup', enter)", 2000);
    }

    else {
        document.getElementById("num_box").removeEventListener("keyup", enter);
        show("Игра окончена", 'hints');
        setTimeout("smooth_transition('hints')", 1000);
        setTimeout("game_over()", 1050);
        setTimeout("set_to_zero()", 1300);
        setTimeout("document.getElementById('num_box').addEventListener('keyup', enter)", 2000);
    }
}

function game_over() {
    smooth_transition('game');
    setTimeout("restore('container')", 500);
    current_div = 'container';
}

function set_to_zero() {
    score = 0;
    attempt = 1;
    number = 0;
    level = 1;
    m = 0;
    n = 0;
    document.getElementById("val_score").innerHTML = score.toString();
    document.getElementById("val_att").innerHTML = attempt.toString();
    document.getElementById('val_lev').innerHTML = level.toString();
    document.getElementById("num_box").value = "";
    document.getElementById("num_box").removeEventListener("keyup", enter);
}


function enter() {
    event.preventDefault();
    if (event.keyCode === 13)
        num_handle(document.getElementById("num_box").value);
}

function show(arg, ids) {
    document.getElementById(ids).innerHTML = arg;
    document.getElementById(ids).style.visibility = "visible";
    setTimeout(function () {
        document.getElementById(ids).style.opacity = '0.2'
    }, 200);
    setTimeout(function () {
        document.getElementById(ids).style.opacity = '0.4'
    }, 250);
    setTimeout(function () {
        document.getElementById(ids).style.opacity = '0.6'
    }, 300);
    setTimeout(function () {
        document.getElementById(ids).style.opacity = '0.8'
    }, 350);
    setTimeout(function () {
        document.getElementById(ids).style.opacity = '1'
    }, 400);
}

function change_level(max, min) {
    attempt = 1;
    level += 1;
    number = Math.round(Math.random() * (max - min) + min);
    smooth_transition('game');
    setTimeout("document.getElementById('val_att').innerHTML=attempt.toString()", 600);
    setTimeout("document.getElementById('val_lev').innerHTML = level.toString()", 600);
    setTimeout("document.getElementById('num_box').value = ''", 600);
    setTimeout("restore('game')", 650);
    setTimeout("show('Число загадано', 'hints')", 600);
    setTimeout("smooth_transition('hints')", 2000);
    setTimeout("document.getElementById('num_box').addEventListener('keyup', enter)", 2000);
}

function back_to_menu(pw) {
        set_to_zero();
        current_div='container';
        smooth_transition(pw);
        setTimeout("restore('container')", 500);
}

function disable_levels() {
    document.getElementById("easy").setAttribute("disabled", "disabled");
    document.getElementById("medium").setAttribute("disabled", "disabled");
    document.getElementById("difficult").setAttribute("disabled", "disabled");
    document.getElementById("hardcore").setAttribute("disabled", "disabled");
}

function enable_levels() {
    document.getElementById("easy").removeAttribute("disabled");
    document.getElementById("medium").removeAttribute("disabled");
    document.getElementById("difficult").removeAttribute("disabled");
    document.getElementById("hardcore").removeAttribute("disabled");
}

function leave() {
    smooth_transition('container');
    setTimeout("restore('conf')", 500);
}

function Yes() {
    switch (current_div) {
        case 'container':
            window.close();
            break;
        case 'game':
            set_to_zero();
            smooth_transition('game');
            setTimeout("restore('level')", 500);
    }

}

function No() {
    if (current_div == 'container') {
        smooth_transition("conf");
        setTimeout("restore('container')", 500);
    }
    else {
        smooth_transition("conf");
        setTimeout("restore('game')", 500);
    }
}

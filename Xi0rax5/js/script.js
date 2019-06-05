let curCircle = undefined;
let digits = [];
let add = 0;
let digIndex = -1, InitX = -1, InitY = -1;
let t_r_y=1;
let scores=0;
let level=1;
let record=0;

class Circle {
    constructor(x, y, value1, value2) {
        this.x = x;
        this.y = y;
        this.value1 = value1;
        this.value2 = value2;
    }
}

class Values {
    constructor(index, val1, val2) {
        this.index = index;
        this.val1 = val1;
        this.val2 = val2;
    }
}

$(document).ready(function () {$('#container').animate({top: '+=320px', left: "+=160px"}, 0);
    $('#add').animate({top: '+=320px', left: "+=40px"}, 0);
    $("#confirm").animate({top: "+=320px", left: "+=480px"}, 0);});


function lets_go () {

    $('#start_menu').hide(500);
    $('header').hide(500);
  begin();
};

function up() {
    if (digIndex > -1) {
        digits[digIndex].x = Math.round(curCircle.position().left + 32);
        digits[digIndex].y = Math.round(curCircle.position().top + 32);
        digIndex = -1;
    }
    InitX = -1;
    InitY = -1;
}

function down(e) {
    if (curCircle !== undefined) {
        InitX = e.pageX;
        InitY = e.pageY;
    }
}

function move(e) {
    if (curCircle !== undefined && digIndex > -1) {
        let newX = e.pageX;
        let newY = e.pageY;
        curCircle
            .css({
                left: Math.min(640 - 64, Math.max(0, digits[digIndex].x - 32 + newX - InitX)),
                top: Math.min(480 - 64, Math.max(0, digits[digIndex].y - 32 + newY - InitY))
            });
    }
}

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

async function begin() {
    let count = random(6, 12);
    digits = [];
    let entities = [];
    let entity;
    $("#wrapper").show(500);
    await delay(1000);
    $(".level:first").show(500);
    $(".level:last").html(level).show(500);
    $(".try:first").show(500);
    $(".try:last").html(t_r_y).show(500);
    $(".scores:first").show(500);
    $(".scores:last").html(scores).show(500);
    $(".ingame_button").show(500);
    $("#confirm").click(check);
    for (let i = 0; i < count; ++i) {
        let value1 = random(0, 9);
        let value2;
        if (value1 === 0) {
            value2 = random(1, 9);
        }
        else
            value2 = random(0, 9);
        digits.push(gen(value1, value2));
        entity = new Values(i, value1, value2);
        entities.push(entity);
    }
    $("div.circle").remove();
    add = genAdd(entities);
    $("#add").html(add);
    for (let i = 0; i < digits.length; ++i) {
        let circle = '<div class="circle">' + digits[i].value1 + '+' + digits[i].value2 + '<div>';
        $('div#main_field').append(circle);
        $('div.circle:last').animate({top: digits[i].y - 32, left: digits[i].x - 32}, 0).show(500)
            .on('mousedown', control);
    }

    $(document.body)
        .on('mousedown', down)
        .on('mousemove', move)
        .on('mouseup', up);

}

function gen(value1, value2) {
    let x, y;
    let stat;
    do {
        stat = true;
        x = random(32, 640 - 64);
        y = random(32, 320 - 64);
        for (let i = 0; i < digits.length && stat; ++i) {
            stat = distance(x, y, digits[i].x, digits[i].y)
        }
    } while (!stat);
    return new Circle(x, y, value1, value2);
}

function distance(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) > 4096;
}

function control() {
    if (digIndex < 0) {
        curCircle = $(this);
        let x = Math.round(curCircle.position().left + 32);
        let y = Math.round(curCircle.position().top + 32);
        for (let j = 0; j < digits.length; j++) {
            if (digits[j].x === x && digits[j].y === y) {
                digIndex = j;
            }
        }
    }

}

function genAdd(arr) {
    let sum = 0;
    let combine = [];
    let rightCircle = random(2, 5);
    for (let i = 0; i < rightCircle; i++) {
        let curElement = random(0, (arr.length - 1));
        combine.push(arr[curElement]);
        arr.splice(curElement, 1);
    }
    for (let j = 0; j < combine.length; j++) {
        sum += combine[j].val1;
        sum += combine[j].val2;
    }
    return sum;
}

async function check() {
    let cur_sum = 0;
    $("#confirm").off('click');
    $("div.circle").each(function () {
        let x = Math.round($(this).position().left);
        let y = Math.round($(this).position().top);
        if (y + 64 > 320 && y < 440 && x + 64 > 160 && x < 440) {
            cur_sum += get_pos(x, y);
        }
    });
    if (cur_sum === add) {


        $(".hint").html('Правильно').css({background:'#fcff00',borderRadius:"10px"}).show(500);
        await delay(3000);
        $(".hint").hide(500);
    await change_level();
     await begin();
    }
   else if ((cur_sum !== add)&&(t_r_y===5)) {
        $(".hint").html('Игра окончена').css({background:'aqua',borderRadius:"10px"}).show(500);
        await delay(3000);
        $(".hint").hide(500);
        await delay(1000);
        await game_over();
    }
    else {
        t_r_y+=1;
        $(".hint").html('Не правильно').css({background:'red',borderRadius:"10px"}).show(500);
      await delay(1000);
        $(".try:last").hide(500);
        await delay(1000);
        $(".try:last").html(t_r_y);
    $(".try:last").show(500);
        $(".hint").hide(500);
        $("#confirm").click(check);
    }
}

function get_pos(x, y) {
    x += 32;
    y += 32;
    for (let j = 0; j < digits.length; j++) {
        if (digits[j].x === x && digits[j].y === y) {
            return (digits[j].value1 + digits[j].value2)
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function change_level()
{
        switch (t_r_y) {
            case 1: {
                scores += 10;
                break;
            }
            case 2: {
                scores += 8;
                break;
            }
            case 3: {
                scores += 6;
                break;
            }
            case 4: {
                scores += 4;
                break;
            }
            case 5: {
                scores += 2;
                break;
            }
        }
        level += 1;
        t_r_y = 1;
}

async function game_over()
{
    $("#confirm").off('click');
    $(".level:first").hide(500);
    $(".level:last").hide(500);
    $(".try:first").hide(500);
    $(".try:last").hide(500);
    $(".scores:first").hide(500);
    $(".scores:last").hide(500);
    $("#wrapper").hide(500);
    $("#complete_game").hide(500);
    if (scores>record) {
        record=scores;
     $("#collect").show(200);
    }
    else {
        scores=0;
        level=1;
        t_r_y=1;
        $("#start_menu").show(500);
        $("header").html("Игра \"Цифры в контейнере\"").show(500);
        $(".level:last").html("Undefined");
        $(".try:last").html("Undefined");
        $(".scores:last").html("Undefined");
        $('div.circle').each(function(){$(this).hide(500).off('mouseup','mousemove','mousedown')});
        $('#add').empty();
    }
}

function records() {
    $('header').hide(200);
    $("#start_menu").hide(200);
    $("#records").show(200);
    $('header').html("Рекорды").show(200);
}

async function back()
{
    $('header').hide(200);
    $("#records").hide(200);
    await(200);
    $('header').html("Игра \"Цифры в контейнере\"").show(200);
    $("#start_menu").show(200);
}

async function add_gamer()
{
    $('header').html("Рекорды").show(200);
    $("#results").append("<tr><th>"+$('#name').val()+"</th><th>"+scores+"</th><th>"+level+"</th></tr>");
    $("#collect").hide(200);
    $("#records").show(200);
    await delay(500);
    $(".level:last").html("Undefined");
    $(".try:last").html("Undefined");
    $(".scores:last").html("Undefined");
    $('div.circle').each(function(){$(this).hide(500)},);
    $('#add').empty();
    scores=0;
    level=1;
    t_r_y=1;
}
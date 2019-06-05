let minutes=0;
let seconds=0;
let currentQuest=0;
let done=0;
let correct=0;
let shuffle=false;
let is_timer=false;
let is_stop=false;

class question
{
    constructor(desc,correct,type,variants)
    {
        this.desc=desc;
        this.correct=correct;
        this.type=type;
        this.variants=variants;
        this.userAnswer='';
        this.isanswered=false;
    }
}

let questions = [
    new question('Одна из ошибок Ламарка заключается в признании','1','radio',['прямого влияния среды на возникновение приспособленности','существования наследственности','неизменяемости видов','того факта, что все виды произошли от других видов']),
    new question('Вся природа была разделена К.Линнем на царства','124','checkbox',['минералов','растений','бактерий','животных']),
    new question('Концепция постоянства видов, рассматривающая многообразие органического мира как результат его творения богом','4','radio',['трансформизм','катастрофизм','преформизм','креационизм']),
    new question('В трудах К.Линнея нашли яркое выражение представления о','234','checkbox',['корреляции частей организма','сотворении органического мира богом','постоянстве видов животных и растений','системе природы']),
    new question('Ученый, который считал, что виды неизменны и являются такими, какими их создал Творец в соответствии с поставленной им целью','2','selection',['Аристотель','К. Линней','Ж. Б. Ламарк','Ч. Дарвин']),
    new question('К. Линней внес существенный вклад в развитие биологии','4','radio',['разработал учение о естественном отборе','определил место человека в системе животного мира','собрал огромный фактический материал, доказывающий наличие эволюции','развил представление о различных формах изменчивости и их значения в эволюции']),
    new question('Употребление двойных названий (бинарной номенклатуры) для видов получило широкое распространение благодаря','3','selection',['Ч. Дарвину','К. Ф. Рулье','К. Линнею','Ж. Б. Ламарку']),
    new question('Впервые "лестницу существ", читаемую от низших форм жизни к высшим предложил','ламарк','text',[]),
    new question('Учение о наличии в половых клетках организмов материальных структур, предопределяющих развитие зародыша и признаки образующегося из него организма','преформизм','text',[]),
    new question('Система представлений естествоиспытателей и философов XVII-XIX вв. об исторической изменяемости организмов, предшествовшая эволюционному учению','трансформизм','text',[])
];

function mix_up()
{
    questions.sort(function(){return Math.random() - 0.5;});
}

function switchQuestion(value)
{
    currentQuest=value;
    clear();
    update();
}


function update() {
    document.getElementById('cur_q').innerHTML=(currentQuest+1).toString()+'/'+questions.length.toString();
    document.getElementById('done_q').innerHTML="Выполнено:  "+done.toString()+'/'+questions.length.toString();
    document.getElementById('correct_q').innerHTML="Правильно:  "+correct.toString()+'/'+questions.length.toString();
    for (let block of document.getElementsByClassName('block'))
    {
        block.style.visibility='hidden';
    }
    document.getElementById('text_desc').innerHTML=questions[currentQuest].desc;
    switch(questions[currentQuest].type)
    {
        case 'radio':
        {
            document.getElementById('radio1').parentNode.innerHTML='<input id="radio1" class="radio" name="radio" type="radio" value="1">'+questions[currentQuest].variants[0];
            document.getElementById('radio2').parentNode.innerHTML='<input id="radio2" class="radio" name="radio" type="radio" value="2">'+questions[currentQuest].variants[1];
            document.getElementById('radio3').parentNode.innerHTML='<input id="radio3" class="radio" name="radio" type="radio" value="3">'+questions[currentQuest].variants[2];
            document.getElementById('radio4').parentNode.innerHTML='<input id="radio4" class="radio" name="radio" type="radio" value="4">'+questions[currentQuest].variants[3];
            document.getElementById('radioBlock').style.visibility='visible';
            break;
        }
        case 'checkbox':
        {
            document.getElementById('checkbox1').parentNode.innerHTML='<input class="checkbox" id="checkbox1" name="checkbox" type="checkbox">'+questions[currentQuest].variants[0];
            document.getElementById('checkbox2').parentNode.innerHTML='<input class="checkbox" id="checkbox2" name="checkbox" type="checkbox">'+questions[currentQuest].variants[1];
            document.getElementById('checkbox3').parentNode.innerHTML='<input class="checkbox" id="checkbox3" name="checkbox" type="checkbox">'+questions[currentQuest].variants[2];
            document.getElementById('checkbox4').parentNode.innerHTML='<input class="checkbox" id="checkbox4" name="checkbox" type="checkbox">'+questions[currentQuest].variants[3];
            document.getElementById('checkboxBlock').style.visibility='visible';
            break;
        }
        case 'selection':
        {
            document.getElementById('selection1').innerHTML=questions[currentQuest].variants[0];
            document.getElementById('selection2').innerHTML=questions[currentQuest].variants[1];
            document.getElementById('selection3').innerHTML=questions[currentQuest].variants[2];
            document.getElementById('selection4').innerHTML=questions[currentQuest].variants[3];
            document.getElementById('selectionBlock').style.visibility='visible';
            break;
        }
        case 'text':
        {
            document.getElementById('textBlock').style.visibility='visible';
            break;
        }

    }
    updateState();
}
function check() {
    if (questions[currentQuest].userAnswer === '') {
        switch (questions[currentQuest].type) {
            case 'radio': {
                if (document.answerForm.radio.value!=='')
                    questions[currentQuest].userAnswer=document.answerForm.radio.value;
                    else
                        done--;
                    break;
            }
            case 'checkbox':
            {
                if(questions[currentQuest].userAnswer==='') {
                    let checking = '';
                    if (document.getElementById('checkbox1').checked === true)
                        checking += '1';
                    if (document.getElementById('checkbox2').checked === true)
                        checking += '2';
                    if (document.getElementById('checkbox3').checked === true)
                        checking += '3';
                    if (document.getElementById('checkbox4').checked === true)
                        checking += '4';
                    questions[currentQuest].userAnswer=checking;
                    if (checking === '')
                        done--;
                }
                break;
            }
            case 'selection':
            {
                if (document.answerForm.selection.value!=='')
                    questions[currentQuest].userAnswer=document.answerForm.selection.value;
                else
                    done--;
                break;
            }
            case 'text': {
                if (document.answerForm.textField.value.trim() !== '')
                    questions[currentQuest].userAnswer = document.answerForm.textField.value.trim().toLowerCase();
                else
                    done--;
                break;
            }
        }
    }
    done++;
    questions[currentQuest].isanswered=true;
    if (questions[currentQuest].userAnswer===questions[currentQuest].correct)
        correct++;
    updateState();
}

function begin()
{
    is_stop=false;
    document.getElementById('start_menu').style.display="none";
    document.getElementById('test_menu').style.display="inline";
    if(shuffle) mix_up();
    if (is_timer) {
        minutes=document.getElementById('min').value;
        seconds=document.getElementById('sec').value;
        Timer();
    }
    else
    document.getElementById('time').innerHTML='--:--';
    currentQuest=0;
    done=0;
    correct=0;
    clear();
    update();
}

function updateState()
{
    document.getElementsByClassName('num_q')[currentQuest].disabled=true;
    if (questions[currentQuest].isanswered)
    {
        document.getElementsByClassName('num_q')[currentQuest].title="Отвечен";
    }
    document.getElementById('cur_q').innerHTML=(currentQuest+1).toString()+'/'+questions.length.toString();
    document.getElementById('done_q').innerHTML="Выполнено:  "+done.toString()+'/'+questions.length.toString();
    document.getElementById('correct_q').innerHTML="Правильно:  "+correct.toString()+'/'+questions.length.toString();
    let radio1= document.getElementById('radio1').parentNode;
    let radio2=document.getElementById('radio2').parentNode;
    let radio3=document.getElementById('radio3').parentNode;
    let radio4=document.getElementById('radio4').parentNode;
    let checkbox1=document.getElementById('checkbox1').parentNode;
    let checkbox2=document.getElementById('checkbox2').parentNode;
    let checkbox3=document.getElementById('checkbox3').parentNode;
    let checkbox4=document.getElementById('checkbox4').parentNode;
    radio1.style.borderRadius="10px";
    radio2.style.borderRadius="10px";
    radio3.style.borderRadius="10px";
    radio4.style.borderRadius="10px";
    checkbox1.style.borderRadius='10px';
    checkbox2.style.borderRadius='10px';
    checkbox3.style.borderRadius='10px';
    checkbox4.style.borderRadius='10px';
    switch(questions[currentQuest].type)
    {
        case 'radio':
        {
            if (questions[currentQuest].userAnswer!=='') {
                if (questions[currentQuest].userAnswer.includes('1') && questions[currentQuest].correct.includes('1')) {
                    radio1.style.background = "green";
                    radio1.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('1') && !questions[currentQuest].correct.includes('1')) {
                    radio1.style.background = 'red';
                    radio1.style.border = "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('1') && questions[currentQuest].correct.includes('1')) {
                    radio1.style.border = "2px solid lime";
                }
                if (questions[currentQuest].userAnswer.includes('2') && questions[currentQuest].correct.includes('2')) {
                    radio2.style.background = "green";
                    radio2.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('2') && !questions[currentQuest].correct.includes('2')) {
                    radio2.style.background = 'red';
                    radio2.style.border = "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('2') && questions[currentQuest].correct.includes('2')) {
                    radio2.style.border = "2px solid lime";
                }
                if (questions[currentQuest].userAnswer.includes('3') && questions[currentQuest].correct.includes('3')) {
                    radio3.style.background = "green";
                    radio3.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('3') && !questions[currentQuest].correct.includes('3')) {
                    radio3.style.background = 'red';
                    radio3.style.border = "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('3') && questions[currentQuest].correct.includes('3')) {
                    radio3.style.borderColor = "lime";
                }
                if (questions[currentQuest].userAnswer.includes('4') && questions[currentQuest].correct.includes('4')) {
                    radio4.style.background = "green";
                    radio4.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('4') && !questions[currentQuest].correct.includes('4')) {
                    radio4.style.background = 'red';
                    radio4.style.border= "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('4') && questions[currentQuest].correct.includes('4')) {
                    radio4.style.border = "2px solid lime";
                }
                if (questions[currentQuest].isanswered)
                {
                    radio1.firstChild.disabled=true;
                    radio2.firstChild.disabled=true;
                    radio3.firstChild.disabled=true;
                    radio4.firstChild.disabled=true;
                }
            }
            break;
        }
        case 'checkbox': {
            if (questions[currentQuest].userAnswer !== '') {
                if (questions[currentQuest].userAnswer.includes('1') && questions[currentQuest].correct.includes('1')) {
                    checkbox1.style.background = "green";
                    checkbox1.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('1') && !questions[currentQuest].correct.includes('1')) {
                    checkbox1.style.background = "red";
                    checkbox1.style.border = "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('1') && questions[currentQuest].correct.includes('1')) {
                    checkbox1.style.border = "2px solid lime";
                }
                if (questions[currentQuest].userAnswer.includes('2') && questions[currentQuest].correct.includes('2')) {
                    checkbox2.style.background = "green";
                    checkbox2.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('2') && !questions[currentQuest].correct.includes('2')) {
                    checkbox2.style.background = "red";
                    checkbox2.style.border = "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('2') && questions[currentQuest].correct.includes('2')) {
                    checkbox2.style.border = "2px solid lime";
                }
                if (questions[currentQuest].userAnswer.includes('3') && questions[currentQuest].correct.includes('3')) {
                    checkbox3.style.background = "green";
                    checkbox3.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('3') && !questions[currentQuest].correct.includes('3')) {
                    checkbox3.style.background = "red";
                    checkbox3.style.border = "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('3') && questions[currentQuest].correct.includes('3')) {
                    checkbox3.style.border = "2px solid lime";
                }
                if (questions[currentQuest].userAnswer.includes('4') && questions[currentQuest].correct.includes('4')) {
                    checkbox4.style.background = "green";
                    checkbox4.style.border = "2px solid lime";
                }
                else if (questions[currentQuest].userAnswer.includes('4') && !questions[currentQuest].correct.includes('4')) {
                    checkbox4.style.background = "red";
                    checkbox4.style.border = "2px solid crimson";
                }
                else if (!questions[currentQuest].userAnswer.includes('4') && questions[currentQuest].correct.includes('4')) {
                    checkbox4.style.border = "2px solid lime";
                }
                if (questions[currentQuest].isanswered)
                {
                    checkbox1.firstChild.disabled=true;
                    checkbox2.firstChild.disabled=true;
                    checkbox3.firstChild.disabled=true;
                    checkbox4.firstChild.disabled=true;
                }
            }
            break;
        }
        case 'text':
        {
          if (questions[currentQuest].userAnswer==='')
              document.answerForm.textField.style.color = 'black';
          else
          {
              if(questions[currentQuest].userAnswer===questions[currentQuest].correct)
                  document.answerForm.textField.style.color="green";
              else
                  document.answerForm.textField.style.color='red';
              document.answerForm.textField.value=questions[currentQuest].userAnswer;
          }
            if (questions[currentQuest].isanswered)
                document.answerForm.textField.disabled=true;
            break;
        }

        case 'selection':
        {
            if(questions[currentQuest].userAnswer==='')
                document.answerForm.selection.style.color='black';
            else if (questions[currentQuest].userAnswer===questions[currentQuest].correct)
                document.answerForm.selection.style.color='green';
            else
                document.answerForm.selection.style.color='red';
            document.answerForm.selection.value=questions[currentQuest].userAnswer;
             if (questions[currentQuest].isanswered)
                 document.answerForm.selection.disabled=true;
            break;
        }
    }
    if (done===questions.length)
    {
        stop();
    }
}

function clear()
{
    for (let num_q of document.getElementsByClassName('num_q'))
    {
        num_q.disabled=false;
    }
    let radio1= document.getElementById('radio1').parentNode;
    let radio2=document.getElementById('radio2').parentNode;
    let radio3=document.getElementById('radio3').parentNode;
    let radio4=document.getElementById('radio4').parentNode;
    let checkbox1=document.getElementById('checkbox1').parentNode;
    let checkbox2=document.getElementById('checkbox2').parentNode;
    let checkbox3=document.getElementById('checkbox3').parentNode;
    let checkbox4=document.getElementById('checkbox4').parentNode;
    radio1.style.background='transparent';
    radio1.style.borderColor='transparent';
    radio2.style.background='transparent';
    radio2.style.borderColor="transparent";
    radio3.style.backgroundColor='transparent';
    radio3.style.borderColor='transparent';
    radio4.style.background='transparent';
    radio4.style.borderColor='transparent';
    checkbox1.style.background = "transparent";
    checkbox1.style.borderColor = 'transparent';
    checkbox2.style.background = "transparent";
    checkbox2.style.borderColor = 'transparent';
    checkbox3.style.background = "transparent";
    checkbox3.style.borderColor = 'transparent';
    checkbox4.style.background = "transparent";
    checkbox4.style.borderColor = 'transparent';
    document.answerForm.textField.style.color='black';
    document.answerForm.selection.style.color='black';
    document.answerForm.textField.disabled=false;
    document.answerForm.selection.disabled=false;
    document.answerForm.textField.value='';
}

function reset()
{
for (let quest of questions)
{
    quest.userAnswer='';
    quest.isanswered=false;
}
for (let q of document.getElementsByClassName('num_q'))
{
    q.title="Не отвечен";
}
}

function stop()
{
    is_stop=true;
document.getElementById('test_menu').style.display='none';
document.getElementById('doneTable').style.display='block';
let table ='';
for (let quest of questions)
{
    table+='<tr>';
    table+='<td class="'+(quest.userAnswer===quest.correct ? 'correct':'incorrect')+'">'+quest.userAnswer+'</td>';
    table+='<td class="'+(quest.userAnswer===quest.correct ? 'correct':'incorrect')+'">'+quest.correct+'</td>';
    table += '</tr>';
}
document.getElementById('results').innerHTML=table;
document.getElementById('complete').innerHTML="Правильно: "+correct.toString()+'/'+questions.length.toString();
document.getElementById('table').style.display='block';
reset();
clear();
}

function statistics()
{
    document.getElementById('start_menu').style.display="none";
    document.getElementById('doneTable').style.display='inline';
}

function Timer() {
    let dt=new Date();
    dt.setMinutes(minutes);
    dt.setSeconds(seconds);
    document.getElementById('time').innerHTML=((dt.getMinutes()>9) ? dt.getMinutes():'0'+dt.getMinutes())+":"+((dt.getSeconds()>9) ? dt.getSeconds():'0'+dt.getSeconds());
    if (dt.getMinutes()===0&&dt.getSeconds()===0)
        stop();
    else if (is_stop) {
        document.getElementById('time').innerHTML = '--:--';
    }
    else{
        minutes = dt.getMinutes();
        seconds = dt.getSeconds() - 1;
        setTimeout("Timer()", 1000);
    }
}

function updateTimer() {
   if (!document.getElementById('timer').checked) {
        document.getElementById('min').disabled = true;
        document.getElementById('sec').disabled = true;
    }
    else
    {
        document.getElementById('min').disabled = false;
        document.getElementById('sec').disabled = false;
    }
}

function main_menu()
{
    document.getElementById('settings').style.display='none';
    document.getElementById('start_menu').style.display='flex';
}

function settings()
{
    if (document.getElementById('timer').checked===false) {
        document.getElementById('min').disabled = true;
        document.getElementById('sec').disabled = true;
    }
    else
    {
        document.getElementById('min').disabled = false;
        document.getElementById('sec').disabled = false;
    }
    document.getElementById('start_menu').style.display='none';
    document.getElementById('settings').style.display='flex';
}
function main()
{
   document.getElementById('doneTable').style.display="none";
   document.getElementById('start_menu').style.display='flex';
}

function settingsApply() {
    if (document.getElementById('timer').checked&&document.getElementById('min').value<60&&document.getElementById('sec').value<60&&((document.getElementById('min').value>0&&document.getElementById('sec').value>=0)||(document.getElementById('min').value>=0&&document.getElementById('sec').value>0)||(document.getElementById('min').value>0&&document.getElementById('sec').value>0)))
        {
        is_timer = true;
    }
    else if (!document.getElementById('timer').checked) {
        is_timer = false;
    }
    else
        {
        alert("Введены неверные данные");
        return;
    }
    if (document.getElementById('shuffle').checked)
        shuffle = true;
    else
        shuffle=false;
    main_menu();
}

function cancel()
{
    document.getElementById('shuffle').checked=shuffle;
    document.getElementById('timer').checked=is_timer;
    main_menu();
}
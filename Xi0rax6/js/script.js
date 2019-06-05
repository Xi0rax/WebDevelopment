$(document).ready(function () {
    $("#Creative").on("change", Creative);
    $("#Sport").on("change", Sport);
    $("#Intelligent").on("change", Intelligent);
    $("#Creative").change();
    $("#Creative").prop("checked", true);
});
    $(function() {
        $("#confirm").click(function (e) {
            e.preventDefault();
            let json_data = get($(document.queryForm).serializeArray());
            $.ajax({
                url: 'handler.php',
                type: 'POST',
                contentType: 'application/json',
                data: json_data,
                success: async function (jsonResult) {
                    let reply = JSON.parse(jsonResult);
                    if (reply.valid&&reply.result==="affirmative") {
                        $("#interactive").html("Заявка успешно отправлена").show(500);
                        await delay(3000);
                        undoColor();
                        $("#interactive").hide(500);
                        await delay(500);
                    }
                    else {
                        if (reply.result.includes('1'))
                            $("#first_name").css({backgroundColor: 'crimson'});
                        if (reply.result.includes('2'))
                            $("#last_name").css({backgroundColor: 'crimson'});
                        if (reply.result.includes('3'))
                            $("#ageField").css({backgroundColor: 'crimson'});
                        if (reply.result.includes('4'))
                            $("#email").css({backgroundColor: 'crimson'});
                        $("#interactive").html("Неверный формат введенных данных").show(500);
                        await delay(3000);
                        undoColor();
                        $("#interactive").hide(500);
                        await delay(500);
                    }
                },

            });
        });
    });

function Creative() {
    $("#selection").html("<option value='TheBestPortrait'>Лучший портрет писателя</option><option value='DrawYourEnd'>Нарисуй свой край</option><option value='TryPen'>Проба пера</option>");
}

function Sport() {
    $("#selection").html("<option value='HeroFun'>Богатырские забавы</option><option value='RopePulling'>Перетягивание каната</option><option value='OnlyForward'>Только вперед!</option>");
}

function Intelligent() {
    $("#selection").html("<option value='OwnGame'>Своя игра</option><option value='TheSmartest'>Самый умный</option><option value='Million'>Кто хочет стать миллионером</option>");
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function get(value) {
    let query = {};
    $.each(value, function (index, field) {
        query[field['name']] = field['value'];
    });
    return JSON.stringify(query);
}

function undoColor()
{
    $("#first_name").css({border:"1px solid black",backgroundColor: 'white'});
    $("#last_name").css({border:"1px solid black",backgroundColor: 'white'});
    $("#ageField").css({border:"1px solid black",backgroundColor: 'white'});
    $("#email").css({border:"1px solid black",backgroundColor: 'white'});
}
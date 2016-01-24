/**
 * Created by Антон on 22.01.2016.
 */






function save(){
    var arrayRows = [];

    $('#table tr').each(function() {
        var a = $(this).find("td").eq(0).html();
        var b = $(this).find("td").eq(1).html();
        var c = $(this).find("td").eq(2).html();
        var result = $(this).find("td").eq(3).html();
        var row = new Object();
        row.a = a;
        row.b = b;
        row.c = c;
        row.result = result;
        arrayRows.push(row);
    });

    localStorage.setItem('rows',JSON.stringify(arrayRows));


}



function load(){



    var arrayRows = JSON.parse(localStorage.getItem("rows"));
    for (var i=1; i<arrayRows.length; i++){
        var row = arrayRows[i];
        calc(row.a,row.b,row.c);
    }
    //Set tr on click event
        $('tr').on('click',function(){

            var row  = $(this);

            $('#overlay').fadeIn(400);
            $('#confirm').dialog({

                resizable: false,
                height:250,
                buttons: {
                    "Yes": function(){

                        row.remove();
                        $('#confirm').dialog('close');
                        $('#overlay').fadeOut(400);


                    },
                    "No" : function(){

                        $('#confirm').dialog('close');
                        $('#overlay').fadeOut(400);

                    }
                }, close:function(){

                    $('#overlay').fadeOut(400);

                }
            })


        })

}

window.onunload = save;
window.onload = load;


$(function(){
    var dialog = $("#modal").dialog({
        autoOpen: false,
        height: 450,
        width: 350,
        closeText: "Cancel",
        buttons:{
            'Calculate': calc_modal
        },
        close:function(){

            $('#overlay').fadeOut(400);
            $('#a').val('1');
            $('#b').val('1');
            $('#c').val('1');
            $('#a').css('border','1px solid #1F4E5F');
            $('#b').css('border','1px solid #1F4E5F');
            $('#c').css('border','1px solid #1F4E5F');
            $('p').remove();
        }

    });

    $('#confirm').hide();


    $( "#btn" ).button().on( "click", function() {

        dialog.dialog( "open" );
        $('#overlay').fadeIn(400);
    });
});



function test_on_valid(number){
    var floatRegex = new RegExp(/^-?\d+(,\d+)*(\.\d+(e\d+)?)?$/);
    return floatRegex.test(number);
}


function calc(a,b,c){



    var e = Number(a);
    var f = Number(b);
    var g = Number(c);
    var p = (e + f + g) / 2;
    var result = Math.sqrt(p * (p - e) * (p - f) * (p - g));
    var row = jQuery("<tr>" +
        "<td>" + e + "</td>" +
        "<td>" + f + "</td>" +
        "<td>" + g + "</td>" +
        "<td>" + result + "</td>" +
        "</tr>");

    row.on('click', function () {

        $('#overlay').fadeIn(400);
        $('#confirm').dialog({

            resizable: false,
            height:250,
            buttons: {
                "Yes": function(){

                    row.remove();
                    $('#confirm').dialog('close');
                    $('#overlay').fadeOut(400);


                },
                "No" : function(){

                    $('#confirm').dialog('close');
                    $('#overlay').fadeOut(400);

                }
            }, close:function(){

                $('#overlay').fadeOut(400);

            }
        })


    });

    $('#table').append(row);

    $('tr:first').css('background-color', '#AACFD0');

}
function calc_modal(){

    if (!test_on_valid($('#a').val())){

        $('p').remove();
        $('#a').css('border','1px solid red');
        $('<p>Use only numbers!</p>').insertAfter($('h5'));

    } else if(!test_on_valid($('#b').val())){


        $('p').remove();
        $('#a').css('border','1px solid #1F4E5F');
        $('#b').css('border','1px solid red');
        $('<p>Use only numbers!</p>').insertAfter($('h5'));

    } else if(!test_on_valid($('#c').val())){

        $('p').remove();
        $('#a').css('border','1px solid #1F4E5F');
        $('#b').css('border','1px solid #1F4E5F');
        $('#c').css('border','1px solid red');
        $('<p>Use only numbers!</p>').insertAfter($('h5'));

    } else {
        $('#a').css('border','1px solid #1F4E5F');
        $('#b').css('border','1px solid #1F4E5F');
        $('#c').css('border','1px solid #1F4E5F');
        $('p').remove();
        var a = Number($('#a').val());
        var b = Number($('#b').val());
        var c = Number($('#c').val());
        var p = (a + b + c) / 2;
        var result = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        if (isNaN(result)){

            $('<p>This triangle does not exist!</p>').insertAfter($('h5'));

        } else {

            $('p').remove();

            var row = jQuery("<tr>" +
                "<td>" + a + "</td>" +
                "<td>" + b + "</td>" +
                "<td>" + c + "</td>" +
                "<td>" + result + "</td>" +
                "</tr>");

            row.on('click', function () {

                $('#overlay').fadeIn(400);
                $('#confirm').dialog({

                    resizable: false,
                    height:250,
                    buttons: {
                        "Yes": function(){

                            row.remove();
                            $('#confirm').dialog('close');
                            $('#overlay').fadeOut(400);


                        },
                        "No" : function(){

                            $('#confirm').dialog('close');
                            $('#overlay').fadeOut(400);

                        }
                    }, close:function(){

                        $('#overlay').fadeOut(400);

                    }
                })


            });

            $('#table').append(row);

            $('tr:first').css('background-color', '#AACFD0');
            $('#modal').dialog('close');
        }
    }
}
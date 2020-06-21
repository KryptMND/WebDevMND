// Check off Specific Todus By Clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13) {
        //grabbing new todo text from input
        let todoText = $(this).val();
        $(this).val("");
        //create a new li and add it to the ul
        $("ul").append("<li><span><i class='far fa-trash-alt'></i></span> " + todoText + "</li>");
    }
});

$("#toggle-form").click(function(){
    $("input[type='text']").fadeToggle();
});
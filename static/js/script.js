$(document).ready(function () {

    // initalisation of Materialize elements
    $('select').formSelect();
    $('.collapsible').collapsible();
    $('.modal').modal();
    $('.sidenav').sidenav();

    // Add commenting functionality
    $(".add-comment").click(function () {
        $(".comment-form").animate({ height: "200px" });
        $(".cancel-comment, .submit-comment, .comment-form").show();
        $(".add-comment, .topic-options").hide();
    });
    $(".cancel-comment").click(function () {
        $(".comment-form").animate({ height: "0px" }, function () { $(".comment-form").hide() });
        $(".cancel-comment, .submit-comment").hide();
        $(".add-comment, .topic-options").show();
    });


    // user input in the search field
    $('#searchfield').on("input", function () {
        if (checkTextLength($(this))) {
            $("#dbupdate-progress").removeClass("hide-progress");
            delay.count();
        }
    });

    // user selects the search scope (Title, Details, Comments)
    $('#search-scope').change(function () {
        if (checkSelection($(this))) {
            $("#dbupdate-progress").removeClass("hide-progress");
            searchFunction();
        }
    });

    // user selects a different os/platform
    $('#platformfilter').change(function () {
        if (checkSelection($(this))) {
       
        $("#dbupdate-progress").removeClass("hide-progress");
        let items = [];
        $(this).find('option:selected').each(function () {
            item = ($(this).val());
            items.push(item);
        });
        platformChosen(items);
    }
    });

    $('#costfilter').change(function () {
        $("#dbupdate-progress").removeClass("hide-progress");
        costChosen($(this).find('option:selected').attr('value'));
    });

    $('#answersfilter').change(function () {
        $("#dbupdate-progress").removeClass("hide-progress");
        answersChosen($(this).find('option:selected').attr('value'));
    });

    // Defensive programming: Checking the length of text entered
    $('textarea, input').on("input", function () {
        checkTextLength($(this))
    });

    $('.nav-link').on('click', function(event) {
        $('.nav-link').removeClass('nav-highlight').addClass('nav-passiv');
        $(this).removeClass('nav-passiv').addClass('nav-highlight');
    });

})

// set a short delay after every keystroke in the search field
let delay = {
    timer: setTimeout(function () {
        // 
    }, 100),
    count: function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            searchFunction();
        }, 500);
    }
};

function searchFunction() {
    let keyword = $('#searchfield').val();
    if (keyword.length < 1) {
        keyword = ".*";
    }

    let items = [];
    $('#search-scope').find('option:selected').each(function () {
        item = ($(this).val());
        items.push(item);
    });
    commitSearch(keyword, items);
}

// Defensive programming: User must select at least one item if <select> is multiple
function checkSelection(element) {
    if (element.val().length === 0) {
            $('#noselection-modal').modal('open');
            return false;
        } else {
            return true;
        }
}

// Defensive programming: User cannot enter more than 'maxlength'-digits
function checkTextLength(element) {
    if (element.val().length > element.attr('maxlength') - 1) {
            limit = String(element.attr('maxlength'));
            $('#character-limit').text(limit);
            $('#maxlength40-modal').modal('open');
            return false;
        } else {
            return true;
        }
}
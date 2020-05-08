$(document).ready(function () {

    // initalisation of Materialize elements
    $('select').formSelect();
    $('.collapsible').collapsible();
    $('.modal').modal();

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

    // Add rating functionality (thumbs up/down)
    $(".thumb-up").on('click', function () {
        urlTemplate = "{{ url_for('rate_pos', topic_id='v1', index='v2') }}";
        urlTemplateId = urlTemplate.replace(/v1/, $(this).attr('topic_id'));
        baseUrl = urlTemplateId.replace(/v2/, $(this).attr('loop_index'));
        thumbsCountDisplay = $(this).next();
        req = $.ajax(baseUrl)
        req.done(function (data) {
            let result = JSON.parse(req.responseText)
            $(thumbsCountDisplay).replaceWith(`<p>${result["totalThumbs"]}</p>`);
        });

    });
    $(".thumb-down").on('click', function () {
        urlTemplate = "{{ url_for('rate_neg', topic_id='v1', index='v2') }}";
        urlTemplateId = urlTemplate.replace(/v1/, $(this).attr('topic_id'));
        baseUrl = urlTemplateId.replace(/v2/, $(this).attr('loop_index'));
        thumbsCountDisplay = $(this).next();
        req = $.ajax(baseUrl)
        req.done(function (data) {
            let result = JSON.parse(req.responseText)
            $(thumbsCountDisplay).replaceWith(`<p>${result["totalThumbs"]}</p>`);
        })
    });

    // user input in the search field
    $('#searchfield').on("input", function () {
        if ($(this).val().length > 40) {
            $('#maxlength40-modal').modal('open');
        } else {
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
function checkSelection(value) {
    if (value.val().length === 0) {
            $('#noselection-modal').modal('open');
            return false;
        } else {
            return true;
        }
}

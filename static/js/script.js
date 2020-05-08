 $(document).ready(function() {

        // initalisation of Materialize elements
        $('select').formSelect();
        $('.collapsible').collapsible();
        $('.modal').modal();
         
       // Add commenting functionality
         $(".add-comment").click(function(){
             $(".comment-form").animate({height: "200px"});
             $(".cancel-comment, .submit-comment, .comment-form").show();
             $(".add-comment, .topic-options").hide();
         });
         $(".cancel-comment").click(function(){
             $(".comment-form").animate({height: "0px"}, function(){$(".comment-form").hide()});
             $(".cancel-comment, .submit-comment").hide();
             $(".add-comment, .topic-options").show();
         });
       
         // Add rating functionality (thumbs up/down)
         $(".thumb-up").on('click', function(){
             urlTemplate = "{{ url_for('rate_pos', topic_id='v1', index='v2') }}";
             urlTemplateId = urlTemplate.replace(/v1/, $(this).attr('topic_id'));
             baseUrl = urlTemplateId.replace(/v2/, $(this).attr('loop_index')); 
             thumbsCountDisplay = $(this).next();
             req = $.ajax(baseUrl)
             req.done(function(data){
                 let result = JSON.parse(req.responseText)
                 $(thumbsCountDisplay).replaceWith(`<p>${result["totalThumbs"]}</p>`);
             });
       
         });
         $(".thumb-down").on('click', function(){
             urlTemplate = "{{ url_for('rate_neg', topic_id='v1', index='v2') }}";
             urlTemplateId = urlTemplate.replace(/v1/, $(this).attr('topic_id'));
             baseUrl = urlTemplateId.replace(/v2/, $(this).attr('loop_index')); 
             thumbsCountDisplay = $(this).next();
             req = $.ajax(baseUrl)
             req.done(function(data){
                 let result = JSON.parse(req.responseText)
                 $(thumbsCountDisplay).replaceWith(`<p>${result["totalThumbs"]}</p>`);
             })
         });
       
       
         $('#searchfield').on("input", function(){
             $("#dbupdate-progress").removeClass("hide-progress");
             delay.count();
         });
       
         $('#search-scope').change(function() {
                    
           // defensive programming: User must selet at least one option
           if ($(this).val().length === 0) {
            $('#noselection-modal').modal('open');
           } else {
               $("#dbupdate-progress").removeClass("hide-progress");
                searchFunction();
           }
        
             
             
         });
       
       
         $('#sortdate').change(function() {
             $("#dbupdate-progress").removeClass("hide-progress");
             urlTemplate = "{{ url_for('sort_topics_date', date_order='v1') }}";
             baseUrl = urlTemplate.replace(/v1/, $(this).find('option:selected').attr('value'));
             req = $.ajax(baseUrl)
             req.done(function(data){
                 $("#dbupdate-progress").addClass("hide-progress");
                 $('#topics-table').html(data);
             });
       
         });
       
       
         $('#platformfilter').change(function() {
             $("#dbupdate-progress").removeClass("hide-progress");
             let items = [];
             $(this).find('option:selected').each(function() {
               item = ($(this).val());
               items.push(item);
             });
             urlTemplate = "{{ url_for('filter_topics_platform', platform_filter='v1') }}";
             baseUrl = urlTemplate.replace(/v1/, items);
             req = $.ajax(baseUrl)
             req.done(function(data){
                 $("#dbupdate-progress").addClass("hide-progress");
                 $('#topics-table').html(data);
             });
         });
       
         $('#costfilter').change(function() {
             $("#dbupdate-progress").removeClass("hide-progress");
             urlTemplate = "{{ url_for('filter_topics_cost', cost_filter='v1') }}";
             baseUrl = urlTemplate.replace(/v1/, $(this).find('option:selected').attr('value'));
             req = $.ajax(baseUrl)
             req.done(function(data){
                 $("#dbupdate-progress").addClass("hide-progress");
                 $('#topics-table').html(data);
             });
       
         });
       
         $('#answersfilter').change(function() {
             $("#dbupdate-progress").removeClass("hide-progress");
             urlTemplate = "{{ url_for('filter_topics_answer', answer_filter='v1') }}";
             baseUrl = urlTemplate.replace(/v1/, $(this).find('option:selected').attr('value'));
             req = $.ajax(baseUrl)
             req.done(function(data){
                 $("#dbupdate-progress").addClass("hide-progress");
                 $('#topics-table').html(data);
             });
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
       
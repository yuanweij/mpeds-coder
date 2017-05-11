var changeTab = function(e) {
    var eid = $(e.target).parent().attr("id").split("_")[0];

    // Get all elements with class="tablinks" and remove the class "active"
    $(".tablinks").each(function() {
      $(this).removeClass('active')
    });

    // hide all other tab content
    $(".tab-pane").each(function() {
      $(this).hide();
    });

    // Show the current tab, and add an "active" class to the button that opened the tab
    $('#' + eid + "_button").addClass("active");
    $('#' + eid + "_block").show();
}

var addUser = function(e) {
    var username = $('#username').val();
    req = $.ajax({
      type: "GET",
      url:  $SCRIPT_ROOT + '/_add_user',
      data: {
        'username': username
      }
    });

    req.success(function() {
    $('#username-form-group').removeClass('has-error');            

    $('#username-form-group').addClass('has-success');
    $('#username-form-group div.form-control-feedback').html('User <b>' 
        + username + '</b> created. Their password is <b>' 
        + req.responseJSON['result']['password'] + '</b>. ' + 
        'Please save this.');
    });

    req.fail(function() {
      $('#username-form-group').removeClass('has-success');            

      $('#username-form-group').addClass('has-error');
      $('#username-form-group div.form-control-feedback').text(req.responseText);
    });
}


var assignArticlesIndividual = function(e) {
    var num        = $('#num-assign-articles-individual').val();
    var db         = $('#article-database-individual').val();
    var users    = [];

    // gets the checkbox
    var same  = $('input[name=article-distribution]:checked').val();

    // gets all the checked users
    $('#individual-users input.user:checked').each(function() {
        users.push($(this).val());
    });

    req = $.ajax({
      type: "GET",
      url:  $SCRIPT_ROOT + '/_assign_articles_individual',
      data: {
        'num': num,
        'db': db,
        'users': users.join(),
        'same': same
      }
    });

    req.success(function() {
        $('#assign-articles-individual-form-group').removeClass('has-error');            
        $('#assign-articles-individual-form-group').addClass('has-success');
        $('#assign-articles-individual-form-group div.form-control-feedback').text(req.responseText);
    });

    req.fail(function() {
        $('#assign-articles-individual-form-group').removeClass('has-success');            
        $('#assign-articles-individual-form-group').addClass('has-error');
        $('#assign-articles-individual-form-group div.form-control-feedback').text(req.responseText);
    });
}


var assignArticlesGroup = function(e) {
    var num        = $('#num-assign-articles-group').val();
    var db         = $('#article-database-group').val();
    var users    = [];
    var group_size = $('#group-size').val();

    // gets all the checked users
    $('#group-users input.user:checked').each(function() {
        users.push($(this).val());
    });

    req = $.ajax({
      type: "GET",
      url:  $SCRIPT_ROOT + '/_assign_articles_group',
      data: {
        'num': num,
        'db': db,
        'users': users.join(),
        'group_size': group_size
      }
    });

    req.success(function() {
        $('#assign-articles-group-form-group').removeClass('has-error');
        $('#assign-articles-group-form-group').addClass('has-success');
        $('#assign-articles-group-form-group div.form-control-feedback').text(req.responseText);
    });

    req.fail(function() {
        $('#assign-articles-group-form-group').removeClass('has-success');            
        $('#assign-articles-group-form-group').addClass('has-error');
        $('#assign-articles-group-form-group div.form-control-feedback').text(req.responseText);
    });
}

var transferArticles = function(e) {
    var num        = $('#num-transfer-articles').val();
    var from_users = [];
    var to_users   = [];

    // gets all the checked users
    $('#from-users input:checked').each(function() {
        from_users.push($(this).val());
    });

    $('#to-users input:checked').each(function() {
        to_users.push($(this).val());
    });

    req = $.ajax({
      type: "GET",
      url:  $SCRIPT_ROOT + '/_transfer_articles',
      data: {
        'num': num,
        'from_users': from_users.join(),
        'to_users': to_users.join()
      }
    });

    req.success(function() {
        $('#transfer-articles-form-group').removeClass('has-error');            

        $('#transfer-articles-form-group').addClass('has-success');
        $('#transfer-articles-form-group div.form-control-feedback').text(req.responseText);
    });

    req.fail(function() {
        $('#transfer-articles-form-group').removeClass('has-success');            

        $('#transfer-articles-form-group').addClass('has-error');
        $('#transfer-articles-form-group div.form-control-feedback').text(req.responseText);
    });
}


$(function(){ 
    // add tab listeners
    $(".tablinks").each(function(){
      $(this).click(changeTab);
    });

    // show add user first
    $("#add-user_block").show();

    $('#submit').click(function(e) {
        // get the active button to identify correct form
        var current_form = $('.active').attr("id").split('_')[0];

        // create user
        if (current_form == 'add-user') {
            addUser(e);
        } else if (current_form == 'assign-articles-individual') {
            assignArticlesIndividual(e);
        } else if (current_form == 'assign-articles-group') {
            assignArticlesGroup(e);            
        } else if (current_form == 'transfer-articles') {
            transferArticles(e);
        }
    });
});
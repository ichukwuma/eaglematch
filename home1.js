$(document).ready(function() {
    $('.js-example-basic-multiple').select2();
});


$(".js-example-responsive").select2({
    width: 'resolve' // need to override the changed default
});

//for theme
$(".js-example-theme-multiple").select2({
    theme: "classic"
  });
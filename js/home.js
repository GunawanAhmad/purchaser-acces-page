$(function () {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});

$("#notification-dropdown").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
});

//read notification function
$(".read-notif").click(function (e) {
    e.preventDefault();
});

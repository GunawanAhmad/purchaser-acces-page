$(function () {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});

//when "tandi sudah dibaca" got clicked
$("#notification-dropdown").click(function (e) {
    if ($(e.target).hasClass("read-notif")) {
        $(e.target).parent().parent().addClass("read");
        e.preventDefault();
        e.stopPropagation();
    }
});

$(document).ready(function () {
    $(".select2").select2();
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    });
});

//clear search input
$(".clear-icon-search").click(function (e) {
    $("#thumbnail_icon_search_input").val("");
});

//when "tandai sudah dibaca" got clicked
$("#notification-dropdown").click(function (e) {
    if ($(e.target).hasClass("read-notif")) {
        $(e.target).parent().parent().addClass("read");
        e.preventDefault();
        e.stopPropagation();
    }
});

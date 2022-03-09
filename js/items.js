$(document).ready(function () {
    $(".select2").select2({
        tags: true,
    });
});

//clear search input
$(".clear-icon-search").click(function (e) {
    $("#thumbnail_icon_search_input").val("");
});

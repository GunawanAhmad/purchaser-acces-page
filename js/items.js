$(document).ready(function () {
    $(".select2").select2();
    $(".lang-select").select2({
        dropdownCssClass: "navbar-dropdown",
    });
    $(".select2-footer").select2({
        dropdownCssClass: "footer-dropdown",
    });
    $(".abrev-lang-head").html($(".lang").val());
    $(".lang-select").change(function (e) {
        $(".abrev-lang-head").html(e.target.value);
        let title = e.target.options[e.target.selectedIndex].innerHTML;
        $(".lang-container .btn").attr(
            "data-original-title",
            "Language: " + title
        );
        e.preventDefault();
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    });

    $(".loading-container").css("display", "none");
    $(".abrev-lang-head").html($(".lang").val());
    $(".lang-select").change(function (e) {
        $(".abrev-lang-head").html(e.target.value);
        let title = e.target.options[e.target.selectedIndex].innerHTML;
        $(".lang-container .btn").attr(
            "data-original-title",
            "Language: " + title
        );
        e.preventDefault();
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

$(".select2").on("select2:open", function (e) {
    $(e.target).parent().toggleClass("rotate");
});
$(".select2").on("select2:close", function (e) {
    $(e.target).parent().toggleClass("rotate");
});

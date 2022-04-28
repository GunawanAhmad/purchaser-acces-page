$(document).ready(function () {
    $(".lang-select").select2({
        dropdownCssClass: "navbar-dropdown",
    });
    $(".select2-footer").select2({
        dropdownCssClass: "footer-dropdown",
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    });

    //when "tandai sudah dibaca" got clicked
    $("#notification-dropdown").click(function (e) {
        if ($(e.target).hasClass("read-notif")) {
            $(e.target).parent().parent().addClass("read");
            e.preventDefault();
            e.stopPropagation();
        }
    });
    $(".loading-container").css("display", "none");
    $(".abrev-text-1").html($(".lang").val());
    $(".lang-select").change(function (e) {
        $(".abrev-text-1").html(e.target.value);
        let title = e.target.options[e.target.selectedIndex].innerHTML;
        $(".lang-container .btn").attr(
            "data-original-title",
            "Language: " + title
        );
        e.preventDefault();
    });

    $(".select2").on("select2:open", function (e) {
        $(e.target).parent().toggleClass("rotate");
    });
    $(".select2").on("select2:close", function (e) {
        $(e.target).parent().toggleClass("rotate");
    });
});

$(document).ready(function () {
    $(".lang-select").select2({
        dropdownCssClass: "navbar-dropdown",
    });
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
    $(".loading-container").css("display", "none");
    $(".abrev-text-1").html($(".lang").val());
    $(".select2.lang").change(function (e) {
        $(".abrev-text-1").html(e.target.value);
        let title = e.target.options[e.target.selectedIndex].innerHTML;
        $(".lang-container .btn").attr(
            "data-original-title",
            "Language: " + title
        );
        e.preventDefault();
    });
});

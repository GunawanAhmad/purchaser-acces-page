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

    $(".select2.lang").trigger({
        type: "select2:select",
        params: { data: { text: $(".select2.lang option:selected").text() } },
    });
    $(".lang-select").on("select2:select", function (e) {
        $(".abrev-lang-head").html($(".select2.lang").val());
        $("#lang-head-tooltip")
            .attr("data-original-title", e.params.data.text)
            .attr("data-original-title", e.params.data.text)
            .tooltip("update")
            .tooltip("hide");
    });

    $(".select2").on("select2:open", function (e) {
        $(e.target).parent().toggleClass("rotate");
    });
    $(".select2").on("select2:close", function (e) {
        $(e.target).parent().toggleClass("rotate");
    });
});

$(document).ready(function () {
    $(".abrev-lang-head").html($(".select2.lang").val());
    $(".select2.lang").trigger({
        type: "select2:select",
        params: { data: { text: $(".select2.lang option:selected").text() } },
    });
});

$(".filter-select2").select2({
    minimumResultsForSearch: -1,
});

$(".dropdownnew2").select2({
    minimumResultsForSearch: -1,
    width: "100%",
});

$(".dropdownnew3").select2({
    minimumResultsForSearch: -1,
    width: "100%",
});
$(function () {
    $(".reset").click(function () {
        $(".filter-select2").select2("val", "");
        $(".dropdownnew").select2("val", "");
        $(".dropdownnew2").select2("val", "");
        $("[aria-controls=select2-selectfirst-container]").attr(
            "style",
            "border:1px solid #ced4da  !important"
        );
    });
});
$(function () {
    $(".reset").click(function (e) {
        e.preventDefault();
        $("#selectfirst").val("").trigger("change");
        $("#selectsecond").val("").trigger("change");

        $("#creator-filter-select").val("").trigger("change");
        $("#acces-filter-select").val("").trigger("change");

        $(".search").val("");
        $(".closeSearch").css("display", "none");
    });
    $(".closeSearch").click(function (e) {
        e.preventDefault();
        var valueSelect = $("#creator-filter-select")
            .find("option:selected")
            .val();

        var valueSelect2 = $("#acces-filter-select")
            .find("option:selected")
            .val();

        if (valueSelect == "" && valueSelect2 == "") {
            $(".search").val("");
            $(".reset").css("backgroundColor", "#f2f2f2");
            $(".reset").css("color", "#7f7f7f");
            $(".closeSearch").css("display", "none");
            $(".reset").css("display", "none");
        } else {
            $(".search").val("");
            $(".closeSearch").css("display", "none");
            $(".reset").css("backgroundColor", "#f2f2f2");
            $(".reset").css("color", "#7f7f7f");
            $(".reset").css("display", "block");
        }
    });
});

var category = document.querySelector(".div-category p");

var tes = category.innerHTML;

$(document).ready(function () {
    $(".filter-select2").trigger("change");
    $(".filter-select2").on("change", function () {
        if ($(this).val() != 0) {
            $(".reset").css("display", "block");
        } else {
            $(".reset").css("display", "none");
        }
    });
    $(".reset").on("click", function () {
        $(".reset").css("backgroundColor", "#f2f2f2");
        $(".reset").css("color", "#7f7f7f");
        $(".reset").css("display", "none");
    });
});

$(".search").on("input", function (e) {
    if (this.value.length < 1) {
        $(".closeSearch").css("display", "none");
        $(".reset").css("display", "none");
        return;
    }
    $(".reset").css("display", "block");
    $(".closeSearch").css("display", "block");
});
$(function () {
    $(".borkmark").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("fas fa-bookmark iconBorkmarkClick");
        $(this).toggleClass("fa-regular fa-bookmark color-custom");
    });
});
$(function () {
    $(".bg-rounded-borkmark").click(function (e) {
        e.preventDefault();
        $(e.target.children[0]).toggleClass(
            "fas fa-bookmark iconBorkmarkClick"
        );
        $(e.target.children[0]).toggleClass(
            "fa-regular fa-bookmark color-custom"
        );
    });
});
$(function () {
    $(".fa-heart ").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("fa-solid fa-heart iconHeartClick font-size-i");
        $(this).toggleClass("far fa-heart  text-gray-custom  font-size-i");
    });
});
$(function () {
    $(".icon-love").click(function (e) {
        e.preventDefault();
        let span = $(this).closest(".icon-love").children("span")[0];

        let getCountLove = $(this)
            .closest(".icon-love")
            .children("span")
            .text();
        let add = parseInt(getCountLove) + 1;
        let heart = $(this).children(".fa-heart")[0];
        let kurang = parseInt(getCountLove) - 1;
    });
});
// aspect ratio 1:1
// Set aspect ratio of box
var aspect_ratio = 1;
// Store the jQuery object for future reference
var $box = jQuery(".figure-content");

// Initial resize of .box
jQuery(document).ready(function ($) {
    $box.height($box.width() * aspect_ratio);
});
// Resize .box on browser resize
jQuery(window).resize(function () {
    $box.height($box.width() * aspect_ratio);
});

$(".select2-selection--single").on("click", function (e) {
    // var tes = this;
    // console.log($(".select2-selection--single").attr("aria-expanded") == "true");
    if ($(".select2-selection--single").attr("aria-expanded") == "true") {
        $("[aria-controls=select2-selectfirst-container]").attr(
            "style",
            "border:1px solid #7bce19 !important"
        );
    } else if (
        $(".select2-selection--single").attr("aria-expanded") == "false"
    ) {
        $("[aria-controls=select2-selectfirst-container]").attr(
            "style",
            "border:1px solid #ced4da  !important"
        );
    }
});

// aspect ratio 1:1
// Set aspect ratio of box
var aspect_ratio2 = 2 / 4;
// Store the jQuery object for future reference
var $box2 = jQuery(".figure-content-pin");

// Initial resize of .box2
jQuery(document).ready(function ($) {
    $box2.height($box2.width() * aspect_ratio2);
});
// Resize .box2 on browser resize
jQuery(window).resize(function () {
    $box2.height($box2.width() * aspect_ratio2);
});

var aspect_ratio3 = 1;
// Store the jQuery object for future reference
var $box3 = jQuery(".content-img-width");

// Initial resize of .box3
jQuery(document).ready(function ($) {
    $box3.height($box3.width() * aspect_ratio3);
});
// Resize .box3 on browser resize
jQuery(window).resize(function () {
    $box3.height($box3.width() * aspect_ratio3);
});

$(".copy").on("click", function (e) {
    e.preventDefault();
    $(".copy").attr("data-original-title", "Link copied!");
});

$(window).on("click", function (e) {
    if ($(".select2-selection--single").attr("aria-expanded") == "false") {
        $("[aria-controls=select2-selectfirst-container]").attr(
            "style",
            "border:1px solid #ced4da  !important"
        );
    }
});

$('button[data-toggle="tooltip"]').tooltip({
    animated: "fade",
    placement: "bottom",
    trigger: "click",
});

$(".lang-select").select2({
    dropdownCssClass: "navbar-dropdown",
});
$(".select2-footer").select2({
    dropdownCssClass: "footer-dropdown",
});
$(".abrev-text-1").html($(".lang").val());
$(".lang-select").change(function (e) {
    $(".abrev-text-1").html(e.target.value);
    let title = e.target.options[e.target.selectedIndex].innerHTML;
    $(".lang-container .btn").attr("data-original-title", "Language: " + title);
    e.preventDefault();
});

$(".select2").on("select2:open", function (e) {
    $(e.target).parent().toggleClass("rotate");
});
$(".select2").on("select2:close", function (e) {
    $(e.target).parent().toggleClass("rotate");
});

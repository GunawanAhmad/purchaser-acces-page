function profileSection() {
    //input counter number
    $("#nama-profil-input").keyup(function (e) {
        $("#nama-profil-input-help").html(this.value.length + " / " + 60);
    });

    //input profile image
    let $uploadCrop;
    function uploadProfileImg() {
        var isValidSize = true;
        function readFile(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                if (input.files[0].size > 1048576) {
                    isValidSize = false;
                    $(".modal .image-error-msg").html("Max 1MB");
                    return;
                }
                isValidSize = true;
                reader.onload = function (e) {
                    $(".upload-profile-img").addClass("ready");
                    $uploadCrop
                        .croppie("bind", {
                            url: e.target.result,
                        })
                        .then(function () {
                            console.log("jQuery bind complete");
                        });
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                return false;
            }
        }

        $uploadCrop = $("#upload-profile-img").croppie({
            viewport: {
                width: 250,
                height: 250,
                type: "circle",
            },
            enableExif: true,
        });

        $("#upload").on("change", function (e) {
            var _this = this;
            if (this.files) {
                var file, img;
                img = new Image();
                var objectUrl = URL.createObjectURL(this.files[0]);
                img.onload = function () {
                    if (this.height > 300 && this.width > 300) {
                        readFile(_this);
                        URL.revokeObjectURL(objectUrl);
                        if (
                            isValidSize &&
                            this.height > 320 &&
                            this.width > 320
                        ) {
                            $(".file-name").html(_this.files[0].name);
                            $(".modal .image-error-msg").html("");
                        }
                    } else {
                        $(".modal .image-error-msg").html(
                            "Min height 300px dan min width 300px"
                        );
                    }
                };
                img.src = objectUrl;
            }
        });

        $(".get-cropped-img").on("click", function (ev) {
            $uploadCrop
                .croppie("result", {
                    type: "canvas",
                    size: "viewport",
                })
                .then(function (resp) {
                    $("#profile-img").attr("src", resp);
                    fetch(resp)
                        .then((res) => res.blob())
                        .then((res) => console.log(res));
                });
        });
    }

    uploadProfileImg();

    //delete profile imag
    $(".profile-section #del-btn").click(function (e) {
        deleteConfirmation();
    });

    function deleteConfirmation() {
        document
            .querySelector("#confirm-delete-btn")
            .addEventListener("click", removeAtr);

        function removeAtr() {
            $("#profile-img").attr("src", "");
            $("#upload-profile-img").croppie("destroy");
            $(".file-name").html("No file selected");
            uploadProfileImg();
            document
                .querySelector("#confirm-delete-btn")
                .removeEventListener("click", removeAtr);
        }
    }

    $(document).ready(function () {
        const parentElement = document.getElementById("country-flag");
        const flag = new CountryFlag(parentElement);
        flag.selectByAlpha2("us");

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
        $(".tel-pick-container .select2").select2({
            templateResult: addUserPic,
            templateSelection: addUserPic,
        });
        let selectedTel = $(".tel-pick-container .select2").find(":selected");
        flag.selectByAlpha2($(selectedTel).attr("data-countryCode"));
        $(".value_result").text(
            $(selectedTel).attr("data-countryCode") +
                " (+" +
                $(selectedTel).attr("value") +
                ") "
        );
        $(".tel-pick-container .select2").on("select2:select", function (e) {
            flag.selectByAlpha2(
                $(e.params.data.element).attr("data-countryCode")
            );
            $(".value_result").text(
                $(e.params.data.element).attr("data-countryCode") +
                    " (+" +
                    $(e.params.data.element).attr("value") +
                    ") "
            );
        });
    });
}

profileSection();
function addUserPic(opt) {
    if (!opt.id) {
        return opt.text;
    }
    var optimage = $(opt.element).data("countrycode");
    if (!optimage) {
        return opt.text;
    } else {
        let node = document.createElement("span");
        let node2 = document.createElement("span");
        let node3 = document.createElement("p");
        node3.innerText = $(opt.element)
            .text()
            .replace(/(\r\n|\n|\r)/gm, "");
        node2.id = "country-flag";
        node.appendChild(node2);
        node3.style.marginLeft = "10px";
        node.appendChild(node3);
        let parentElement = node2;
        let flag = new CountryFlag(parentElement);
        flag.selectByAlpha2(optimage);
        node.style.display = "flex";
        node.style.alignItems = "center";
        return node;
    }
}

$(".loading-container").css("display", "none");
$(".abrev-lang-head").html($(".lang").val());
$(".lang-select").change(function (e) {
    $(".abrev-lang-head").html(e.target.value);
    let title = e.target.options[e.target.selectedIndex].innerHTML;
    $(".lang-container .btn").attr("data-original-title", "Language: " + title);
    e.preventDefault();
});

$(document).ready(function () {
    $(".abrev-lang-head").html($(".select2.lang").val());
    $(".select2.lang").trigger({
        type: "select2:select",
        params: { data: { text: $(".select2.lang option:selected").text() } },
    });
});

$(".lang-select").on("select2:select", function (e) {
    $(".abrev-lang-head").html($(".select2.lang").val());
    $("#lang-head-tooltip")
        .attr("data-original-title", e.params.data.text)
        .attr("data-original-title", e.params.data.text)
        .tooltip("update")
        .tooltip("hide");
});

$(".pass-switch").click(function (e) {
    e.preventDefault();
    var input = $(this).parent().find("input");
    if (input.attr("type") === "password") {
        input.attr("type", "text");
        $(this).html('<i class="fa-solid fa-eye"></i>');
    } else {
        input.attr("type", "password");
        $(this).html('<i class="fa-solid fa-eye-slash"></i>');
    }
});

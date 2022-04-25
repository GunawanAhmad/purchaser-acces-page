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

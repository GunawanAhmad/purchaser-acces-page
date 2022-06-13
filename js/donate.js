$(document).ready(function () {
    $(".youtube-section").hide();
    $(".gif-section").hide();
    $("input[type=radio][name=radio-media]").change(function () {
        if (this.value === "youtube") {
            $(".youtube-section").show();
            $(".gif-section").hide();
        } else {
            $(".youtube-section").hide();
            $(".gif-section").show();
        }
    });
});

$("#thumbnail-icon-modal").on("shown.bs.modal", function () {
    $(".grid").masonry({
        itemSelector: ".grid-items",
    });
});

$(".select2").select2();

$(function () {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});

$("textarea")
    .each(function () {
        this.setAttribute(
            "style",
            "height:" + this.scrollHeight + "px;overflow-y:hidden;"
        );
    })
    .on("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
        if (this.id === "message") {
            $("#message-counter").text(this.value.length + " " + " / 999");
        } else if (this.id === "yt-link") {
            $("#yt-preview").attr(
                "src",
                "https://www.youtube.com/embed/" + ytIdParser(this.value)
            );
        }
    });

$(".money-list button").click(function (e) {
    $("#money-input").val($(e.currentTarget).attr("data-amount"));
    $(".select2.currency").val($(e.currentTarget).attr("data-currency"));
    $(".select2.currency").trigger({
        type: "select2:select",
        params: {
            data: { text: $(".select2.currency option:selected").text() },
        },
    });
});

$(document).ready(function () {
    $(window).trigger("resize");
    $(".abrev-currency").html($(".select2.currency").val());
    $(".select2.currency").trigger({
        type: "select2:select",
        params: {
            data: { text: $(".select2.currency option:selected").text() },
        },
    });
});

$(".select2.currency").on("select2:select", function (e) {
    $(".abrev-currency").html($(".select2.currency").val());
    $("#currency-tooltip")
        .attr("data-original-title", e.params.data.text)
        .attr("data-original-title", e.params.data.text)
        .tooltip("update")
        .tooltip("hide");
});

$(".clear-icon-search").click(function () {
    $("#search_input").val("");
});

function ytIdParser(url) {
    var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
}

//record audio
const recordAudio = () => {
    return new Promise((resolve) => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", (event) => {
                audioChunks.push(event.data);
            });

            const start = () => {
                mediaRecorder.start();
            };

            const stop = () => {
                return new Promise((resolve) => {
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        const play = () => {
                            audio.play();
                        };

                        resolve({ audioBlob, audioUrl, play });
                    });

                    mediaRecorder.stop();
                });
            };

            resolve({ start, stop });
        });
    });
};

let recorder = null;
let audioData = null;
let recordBtn = $("#record-btn");
let recordText = $("#record-text");
let listenBtn = $("#listen-btn");
let deleteAudioBtn = $("#deleteAudio-btn");
let rerecordBtn = $("#rerecord-btn");
let audioDom = $("#audioDOM");
let interval = null;
async function waitUntil(recorder) {
    return await new Promise((resolve) => {
        let times = 6;
        interval = setInterval(() => {
            times = times - 1;
            recordText.text("Now recording... (00:0" + times + ")");
            recordBtn.addClass("active");
            if (times === 0) {
                resolve("foo");
                clearInterval(interval);
                recorder
                    .stop()
                    .then((audio) => {
                        stop(audio);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }, 1000);
    });
}

async function audio() {
    console.log("hei");
    recorder = await recordAudio();
    recorder.start();
    await waitUntil(recorder);
}

audioDom.on("ended", function () {
    listenBtn.html('<i class="fa-solid fa-play"></i>');
    console.log("finish");
    listenBtn.removeClass("active");
});
deleteAudioBtn.click(function () {
    audioDom.attr("src", audio.audioUrl);
    recordText.text("Record your voice");
    listenBtn.parent().addClass("hide");
    deleteAudioBtn.parent().addClass("hide");
});

listenBtn.click(() => {
    if (listenBtn.hasClass("active")) {
        listenBtn.removeClass("active");
        listenBtn.html('<i class="fa-solid fa-play"></i>');
        document.getElementById("audioDOM").pause();
    } else {
        listenBtn.addClass("active");
        listenBtn.html('<i class="fa-solid fa-pause"></i>');
        document.getElementById("audioDOM").play();
    }
});

function stop(audio) {
    recordBtn.prop("disabled", false);
    listenBtn.parent().removeClass("hide");
    rerecordBtn.parent().removeClass("hide");
    deleteAudioBtn.parent().removeClass("hide");
    recordBtn.removeClass("active");
    recordText.text("Re-record voice");
    audioData = audio;
    audioDom.attr("src", audio.audioUrl);
}

recordBtn.click((e) => {
    e.preventDefault();
    if (recordBtn.hasClass("active")) {
        clearInterval(interval);
        recorder
            .stop()
            .then((audio) => {
                stop(audio);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        listenBtn.parent().addClass("hide");
        rerecordBtn.parent().addClass("hide");
        deleteAudioBtn.parent().addClass("hide");
        recordBtn.addClass("active");
        audio();
    }
});

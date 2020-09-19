function initialize() {
    setTimeout(() => {
        $(".fc-today-button").text("Today");
    }, 100);
    $("body").on("click touchstart", function () {
        $(".fc-today-button").text("Today");
    })
}
$(initialize);
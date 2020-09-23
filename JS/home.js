function initialize() {
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target_offset = $(this.hash).offset() ? $(this.hash).offset().top : 0;
        var customoffset = 85;
        $('html, body').animate({
            scrollTop: target_offset - customoffset
        }, 500);
    });
}
$(initialize);
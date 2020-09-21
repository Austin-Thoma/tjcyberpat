function initialize() {
    var isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }

    $(document).on('mouseenter', '.pdf', function (event) {
        var newwidth = Math.max($(this).children(".label").get(0).scrollWidth, $(window).width() * .2);
        var off = $(this).children(".label").get(0).offsetWidth;
        var scroll = $(this).children(".label").get(0).scrollWidth;
        if (off < scroll) {
            $(this).css("width", newwidth + "px");
            $(this).children(".label").css("width", newwidth + "px");
        }
    }).on('mouseleave', '.pdf', function () {
        $(this).css("width", "20%");
        $(this).css("margin-left", "0vh");
        $(this).css("margin-right", "3%");
        $(this).children(".label").css("width", "20%");
        $(this).children(".label").css("margin-left", "0px");
    });

    var disable_click = false;
    $(window).scroll(function () {
        disable_click = true;
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
            disable_clickg = false;
        }, 250));
    });

    pdfviewer("#windows10", "Windows10");
    pdfviewer("#windows81", "Windows81");
    pdfviewer("#ubuntu", "Ubuntu");
    pdfviewer("#debian", "Debian");

    function pdfviewer(id, fold) {
        var sizep = parseInt(Math.min(Math.max($(window).height() * .28, $(id + " .pdf-wrap").width() * .2), $(window).height() * .45) + $(window).width() * .03);
        var nump;
        var viewp = parseInt($(id + " .pdf-wrap").width());
        var currp = 0;

        fetch('Lectures/' + fold + '/dir.txt')
            .then(response => response.text())
            .then(text => {
                text = text.split("\n");
                nump = 0;
                $(id + " .pdf-move").html("");
                viewp = parseInt($(id + " .pdf-wrap").width());
                currp = 0;
                $(id + " .pdf-move").css("transform", "translateX(" + currp + "%)");
                var append = '';
                for (i = 0; i < text.length; i++) {
                    if (text[i].split("/")[0] == fold) {
                        var name = text[i].split("/")[1].split(".pdf")[0];
                        dir = 'Lectures/' + text[i];
                        append += '<a href="' + dir + '" target="_blank"><div class="pdf"><img src="';
                        append += dir.replace(/.pdf/g, '.png') + '"><p class="label">' + name.replace(/_/g, ' ');
                        append += '</p></div></a>';
                        nump += 1;
                    }
                }
                $(id + " .pdf-move").append(append);
            })

        function moveLeftPdf() {
            currp += sizep;
            viewp -= sizep;
            $(id + " .pdf-move").css("transform", "translateX(" + currp + "px)");
        };

        function moveRightPdf() {
            currp -= sizep;
            viewp += sizep;
            $(id + " .pdf-move").css("transform", "translateX(" + currp + "px)");
        };

        $(id + ' .fa-chevron-left.pa').click(function () {
            if (viewp > $(id + " .pdf-wrap").width())
                moveLeftPdf();
        });

        $(id + ' .fa-chevron-right.pa').click(function () {
            if (viewp < nump * sizep - $(window).width() * .03)
                moveRightPdf();
        });

        setTimeout(() => {
            if (viewp <= $(id + " .pdf-wrap").width())
                $(id + ' .fa-chevron-left.pa').css("opacity", "0");
            else
                $(id + ' .fa-chevron-left.pa').css("opacity", "1");

            if (viewp >= nump * sizep - $(window).width() * .03)
                $(id + ' .fa-chevron-right.pa').css("opacity", "0");
            else
                $(id + ' .fa-chevron-right.pa').css("opacity", "1");
        }, 100);

        $("body").on('click', function () {
            if (viewp <= $(id + " .pdf-wrap").width())
                $(id + ' .fa-chevron-left.pa').css("opacity", "0");
            else
                $(id + ' .fa-chevron-left.pa').css("opacity", "1");

            if (viewp >= nump * sizep - $(window).width() * .03)
                $(id + ' .fa-chevron-right.pa').css("opacity", "0");
            else
                $(id + ' .fa-chevron-right.pa').css("opacity", "1");
        })

        $(window).on('resize', function () {
            sizep = parseInt(Math.min(Math.max($(window).height() * .28, $(id + " .pdf-wrap").width() * .2), $(window).height() * .45) + $(window).width() * .03);
            viewp = parseInt($(id + " .pdf-wrap").width());
            currp = 0;
            $(id + " .pdf-move").css("transform", "translateX(0%)");
        });
    }
}
$(initialize);
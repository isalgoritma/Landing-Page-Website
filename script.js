let videoTimer;
const FIXED_DURATION = 5;

const VIDEO_GOALS = [
    "Platform edukasi digital interaktif untuk mengenal kekayaan alam nusantara.", 
    "Kami menyajikan pengetahuan biodiversitas dalam bentuk cerita menarik dan visual yang memukau.", 
    "Lihat ekosistem laut dan darat Indonesia melalui fitur tur virtual 360 derajat.", 
    "Uji pengetahuanmu! Temukan ribuan fakta menarik dan kuis interaktif yang seru.", 
    "Pahami isu konservasi, mulai dari terumbu karang hingga satwa endemik langka.", 
    "Kenali lebih dekat spesies langka yang hanya ada di Indonesia melalui galeri kami.", 
    "Bergabunglah dengan komunitas kami, menjadi bagian aktif dalam aksi pelestarian alam.", 
];

function updateVideoContent(videoIndex) {
    const videoElement = $('#hero-video');
    
    const titles = videoElement.attr('data-video-titles').split(',').map(item => item.trim());
    
    const currentTitle = titles[videoIndex];
    const currentDuration = FIXED_DURATION;
    
    $('#video-title').text(currentTitle);
    
    if (VIDEO_GOALS[videoIndex]) {
        $('#video-desc').text(VIDEO_GOALS[videoIndex]);
    } else {
         $('#video-desc').text("Waktunya eksplorasi! Ayo kita jelajahi tujuan web Alam Bercerita.");
    }

    
    clearTimeout(videoTimer); 

    videoTimer = setTimeout(() => {
        playNextVideo(); 
    }, currentDuration * 1000); 
}


function playNextVideo() {
    const videoElement = $('#hero-video');
    const videoListString = videoElement.attr('data-video-list');
    
    const videoList = videoListString.split(',').map(item => item.trim()); 
    let currentIndex = parseInt(videoElement.attr('data-current-index')); 
    
    currentIndex = (currentIndex + 1) % videoList.length; 
    
    const nextVideo = videoList[currentIndex]; 

    videoElement.attr('src', nextVideo);
    videoElement.attr('data-current-index', currentIndex);
    
    videoElement[0].load(); 
    videoElement[0].play().then(() => {
        updateVideoContent(currentIndex);
    }).catch(error => {
        console.log("Error playing video:", error);
    });
}

$(document).ready(function() {

    if (!$.easing || !$.easing.easeInOutExpo) {
        $.easing.easeInOutExpo = function(x, t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
    }

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'easeInOutExpo'); 
        }
    });

    $(window).scroll(function() {

    });


    const videoElement = $('#hero-video');
    const videoListString = videoElement.attr('data-video-list');
    
    if (videoListString) { 
        const videoList = videoListString.split(',').map(item => item.trim());

        videoElement.attr('src', videoList[0]);
        videoElement.removeAttr('loop'); 
        
        videoElement[0].load(); 
        videoElement[0].play().then(() => {
            updateVideoContent(0);
        }).catch(error => {
            console.log("Initial video error: Pastikan semua file video tersedia dan atribut 'muted' ada.", error);
        });
    }


    function animateCounters() {
        $('.counter').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-target');

            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2500,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum).toLocaleString());
                },
                complete: function() {
                    $this.text(parseInt(countTo).toLocaleString());
                }
            });
        });
    }

    $.fn.visible = function() {
        var winTop = $(window).scrollTop();
        var winBottom = winTop + $(window).height();
        var elTop = this.offset().top;
        var elBottom = elTop + this.height();
        return (elBottom <= winBottom) && (elTop >= winTop - 200);
    };

    let countersAnimated = false;
    $(window).on('scroll load', function() { 
        if (!countersAnimated && $('.stats-section').visible()) {
            animateCounters();
            countersAnimated = true;
        }
    });

    if (!countersAnimated && $('.stats-section').visible()) {
        animateCounters();
        countersAnimated = true;
    }


    $('.btn').on('click', function(e) {
        if ($(this).hasClass('btn-primary-custom') || $(this).hasClass('btn-light-custom') || $(this).hasClass('btn-outline-custom')) {
            let ripple = $('<span class="ripple"></span>');
            let rect = this.getBoundingClientRect();
            let size = Math.max(rect.width, rect.height);
            let x = e.clientX - rect.left - (size / 2);
            let y = e.clientY - rect.top - (size / 2);

            ripple.css({
                width: size,
                height: size,
                top: y + 'px',
                left: x + 'px'
            });

            $(this).append(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });

});

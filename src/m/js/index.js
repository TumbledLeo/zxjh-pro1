$(function () {
    // 背景滑动
    /*
    TouchSlide({
        slideCell: "#app",
        delayTime: 500,
        startFun: function () {
            $('.nav').hide();
        },
        endFun: function (i) {

        }
    });
     */
    var swiperlg = new Swiper('.swiper-container-lg', {
        onSlideChangeEnd: function (swiper) {
            $('.nav li').removeClass('on').eq(swiper.activeIndex).addClass('on');
        }
    });

    $('.nav li').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var i = $(this).index();
        swiperlg.slideTo(i, 1000, false);

        $(this).addClass('on').siblings().removeClass('on');
        $('.nav').fadeOut();
    });

    var swiper2 = new Swiper('.wm .swiper-container', {
        scrollbar: '.wm .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        observe: true,
        observeParents: true,
        scrollbarHide: false,
    });
    var swiper3 = new Swiper('.fs .swiper-container', {
        scrollbar: '.fs .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        observe: true,
        observeParents: true,
        scrollbarHide: false,
    });

    var swiperdz = new Swiper('.dz .swiper-container', {
        scrollbar: '.dz .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        observe: true,
        observeParents: true,
        scrollbarHide: false,
    });

    var swiper4 = new Swiper('#mhjc .swiper-container', {
        scrollbar: '#mhjc .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        observe: true,
        observeParents: true,
        scrollbarHide: false,
    });
    var swiper5 = new Swiper('.zc .swiper-container', {
        scrollbar: '.zc .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        observe: true,
        observeParents: true,
        scrollbarHide: false,
    });
    var swiper6 = new Swiper('.zy .swiper-container', {
        scrollbar: '.zy .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        observe: true,
        observeParents: true,
        scrollbarHide: false,
    });

    var swiperjstextview = new Swiper('.js_textview .swiper-container', {
        scrollbar: '.js_textview .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true,
        roundLengths: true, //防止文字模糊
        scrollbarHide: false,
        scrollbarDraggable: true,
        observe: true,
        observeParents: true,
    });


    // 大图预览
    $('.js_img img').click(function () {
        var _src = $(this).attr('src');
        $('.js_bigimgview img').attr('src', _src);
        $('.js_bigimgview').fadeIn();
    });
    $('.js_close_bigimgview').click(function () {
        $('.js_bigimgview').hide();
    });
    // 文字预览
    $('.js_textview').hide(function () {
        $(this).addClass('text_show');
    });

    $('.js_text').click(function () {
        var i = $(this).parent().index();
        var text = $(this).text();
        if (text == '创作解析') {
            i += 3;
        }
        $('.js_textview .swiper-container').hide().eq(i).show();
        $('.js_textview').fadeIn();
    });
    $('.js_close_textview').click(function () {
        $('.js_textview').hide();
    });
//     音频
    var music = document.querySelector('#music');
    $('.js_music_ctrl').click(function () {
        if ($(this).hasClass('on')) {
            music.pause();
            $(this).removeClass('on');
        } else {
            music.play();
            $(this).addClass('on');
        }
    });

//    导航
    $('.menu').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.nav').fadeIn();
    });
    $('.nav').click(function (e) {
        // alert('222');
        e.preventDefault();
        e.stopPropagation();
        $(this).fadeOut();
    });

    var video = document.getElementById('video');

    video.onplay = function () {
        console.log('视频开始播放');
        music.pause();
    };
    video.onended = function () {
        console.log('视频播放完毕');
        music.play();
    };
    video.onpause = function () {
        console.log('视频暂停');
        music.play();
    };

    $('.video-img').click(function () {
        video.play();
        $(this).hide();
    });

    //  tab切换
    tabCtrl('#jmjs');
    tabCtrl('#wtcx');
    tabCtrl('#mhjc');
    tabCtrl('#czjx');

    // tab切换
    function tabCtrl(ele) {
        $(ele + ' .tabContents .tabContent').hide().eq(0).show();
        $(ele + ' .tabs .js_tab').eq(0).addClass('btn_cur');
        $(ele + ' .tabs .js_tab').click(function () {
            event.stopPropagation();
            event.preventDefault();
            if ($(this).hasClass('btn_cur')) {
                return;
            }

            $(this).addClass('btn_cur').siblings().removeClass('btn_cur');

            var me = $(this);
            var index = 0;

            $(ele + ' .tabs .js_tab').each(function (i) {
                if (me.get(0) === $(this).get(0)) {
                    index = i;
                }
            });
            $(ele + ' .tabContents .tabContent').hide().eq(index).fadeIn();
        });
    };

});
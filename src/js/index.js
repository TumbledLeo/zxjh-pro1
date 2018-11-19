var root = "http://www.chncpa.org/tianlu2018/";
// 加载
var loader = new resLoader({
    resources: [
        root + 'images/1.png',
        root + 'images/2.png',
        root + 'images/2_1.png',
        root + 'images/2_2.png',
        root + 'images/bg1.jpg',
        root + 'images/bg2.png',
        root + 'images/bg_czjx.jpg',
        root + 'images/bg_jmjq.jpg',
        root + 'images/bg_ldjc.jpg',
        root + 'images/bg_mtzs.jpg',
        root + 'images/bg_wtcx.jpg',
    ],
    onStart: function (total) {
        // 开始的回调
        // console.log('start:' + total);
    },
    onProgress: function (current, total) {
        // 加载中的回调
        // console.log(current + '/' + total);
        var percent = current / total * 100;
        $('.progressbar').css('width', percent + '%');
    },
    onComplete: function (total) {
        // 加载完的回调
        // console.log('加载完毕:' + total + '个资源');
        $('.js_start_layer').show();
        // if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
        //     new WOW().init();
        // }
        $('#progress').fadeOut(1500, function () {
            setTimeout(function () {
                $('.js_start_layer').addClass('show');
            }, 2300)
        });

    }
});
loader.start();


$(function () {
    // 背景滑动
    // TouchSlide({
    //     slideCell: "#app",
    //     delayTime: 500,
    //     startFun: function (i) {
    //         $('.js_content').hide();
    //     },
    //     endFun: function (i) {
    //         $('.js_content').eq(i).fadeIn(800);
    //     }
    // });

    var swiperlg = new Swiper('.swiper-container-lg');

    // 导航
    $('._window>.container').addClass('opc');
    $('._window>.container').eq(0).removeClass('opc');
    $('.nav_bg li').click(function () {
        var i = $(this).index();

        $('._window>.container').addClass('opc');
        swiperlg.slideTo(i, 1500, false);
        $(this).addClass('on').siblings().removeClass('on');

        setTimeout(function () {
            $('._window>.container').eq(i).removeClass('opc');
        }, 1000)

    });


    // 进入专题
    $('.js_going').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.js_start_layer').fadeOut();
    });
    // 返回首页
    $('.js_backhome').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.js_start_layer').fadeIn();
    });

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
    tabCtrl('#jmjs');
    tabCtrl('#wtcx');
    tabCtrl('#jcsx');
    tabCtrl('#czjx');
    // 创作解析
    $('.js_czjx').click(function (e) {
        e.preventDefault();
        var i = $(this).parent().index();
        $('.js_dialogText .zc_czjx').hide().eq(i).show();
        $('.js_dialogText').fadeIn();
    });
    $('.js_close_dialogText').click(function (e) {
        e.preventDefault();
        $('.js_dialogText').fadeOut();
    })
    // 舞美
    var swiperwm = new Swiper('#wm .swiper-container', {
        slidesPerView: 6,
        spaceBetween: 0,
        observeParents: true,
        observer: true
    });
    var wm_i = 0;
    $('.view img').eq(0).show().siblings().hide();
    $('.preview .swiper-slide').eq(wm_i).addClass('on');

    $('.preview .swiper-slide').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        wm_i = $(this).index();
        $('.view img').eq(wm_i).fadeIn().siblings().hide();
    });
    $('.wm_pre').click(function () {

        if (wm_i > 0) {
            wm_i--;
        }
        $('.preview .swiper-slide').eq(wm_i).addClass('on').siblings().removeClass('on');
        $('.view img').eq(wm_i).fadeIn().siblings().hide();
    });
    $('.wm_next').click(function () {
        if (wm_i < $('.view img').length) {
            wm_i++;
        }
        $('.preview .swiper-slide').eq(wm_i).addClass('on').siblings().removeClass('on');
        $('.view img').eq(wm_i).fadeIn().siblings().hide();
    })
    // 服饰 图片
    var swiperfs = new Swiper('#wtcx .fs .swiper-container', {
        scrollbar: '#wtcx .fs .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheelControl: true,
        scrollbarHide: false,
        scrollbarDraggable: true,
        observer: true,
        observeParents: true
    });

    // 亮点集萃
    var swiperldjc = new Swiper('#ldjc .swiper-container', {
        scrollbar: '#ldjc .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheelControl: true,
        scrollbarHide: false,
        scrollbarDraggable: true,
        observer: true,
        observeParents: true
    });
    // 精彩赏析
    var swiperpl = new Swiper('#jcsx .pl .swiper-container', {
        scrollbar: '#jcsx .pl .swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheelControl: true,
        scrollbarHide: false,
        scrollbarDraggable: true,
        observer: true,
        observeParents: true
    });

    // 大图预览
    $('.js_fs li').click(function () {
        var _src = $(this).children().attr('src');
        $('.js_bigimg').attr('src', _src);
        $('.js_big_image_wrap').fadeIn();
    });
    $('.js_close_bigimg').click(function (e) {
        e.preventDefault();
        $('.js_big_image_wrap').fadeOut();
    })
    // 音乐部分
    var music = document.querySelector('#music');
    $('#music_ctrl').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            music.pause();
        } else {
            $(this).addClass('on');
            music.play();
        }
    })

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
    }
});
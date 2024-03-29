// ==UserScript==
// @name         华电慕课自动刷
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @include      https://hbdldx.xuetangx.com/*
// ==/UserScript==


window.counter = 0;
window.currentTime = 0;
window.setInterval(function () {
    let current_video = $('video')[0];
    if(!current_video){
        return;
    }
    if (current_video.ended) {
        let next = null;
        let $pre_section = $(".section-video-name.video-active").parents('.tree-section-item').next();
        $pre_section.click();
        let $next_section = $pre_section.find('.tree-section-item__name:first');
        if ($next_section.find('i').length) {
            $next_section.find('i.el-icon-arrow-down').click();
            next = $next_section.next().find('.element-wrap');
        }

        if (!next) {
            // 展开章节
            let $chapter = $(".section-video-name.video-active").parents('.tree-chapter-item').next();

            if (!($chapter.find('.tree-section-item__name:first').length)) {

                $chapter.find('.tree-chapter-item__name:first').click();
            }
            // 获取第一节
            let $section = $chapter.find('.tree-section-item__name:first');
            if (!($section.next().find('.section-video-name').length)) {
                $section.click();
            }

            //获取视频按钮
            next = $section.next().find('.section-video-name span:last');
        }
        next.click();
    } else {
        $('li:contains("标清")').click();

        let $btn_speed = $('.xt_video_player_common_value:first').next();
        $btn_speed.find('li[data-speed=2]').click()

        let playPromise = current_video.play()
        if (playPromise !== undefined) {
            playPromise.then(() => {
                current_video.play();
            }).catch(()=> {

            });
        }
        if(current_video.currentTime!=0 && window.currentTime==current_video.currentTime){
            window.counter+=1;
            if(window.counter>=5){
                window.counter = 0;
                window.location.reload(true)
            }
        }else{
            window.currentTime = current_video.currentTime;
            window.counter = 0;
        }
    }
}, 1000);
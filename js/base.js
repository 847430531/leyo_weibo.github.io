/**
 * Created by admin on 2017/7/27.
 */
$(function () {


    // 顶部固定
    $(window).scroll(function(){
        if(scrollY>0){
            // 顶部固定
            $("header").css("backgroundColor","rgba(255,255,255,.9)");
            $("header").css("box-shadow","1px 1px #D0D0D0");
            //返回顶部出现
            $(".toTop").show();
            //console.log($(window).scrollTop());这个跟scrollY是一样的，就是滚动过的长度
        }
        if(scrollY<=0){
            $("header").css("box-shadow","none");
            //返回顶部消失
            $(".toTop").hide();
        }

    });
    //返回顶部触发
    $(".toTop").on("click",function () {
        // document.body.scrollTop=0;
        $(window).scrollTop(0);
    })



})
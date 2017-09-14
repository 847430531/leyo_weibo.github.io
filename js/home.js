/**
 * Created by admin on 2017/8/4.
 */
$(function () {
    $("#member").html($.cookie("user"));
    //home界面控制左右两侧不要超出底部
    $(window).scroll(function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var oNav_left = document.getElementById("leftnav");
        oNav_left.style.top = scrollTop + 50 + "px";
        $(".main_right").css("top", scrollTop + "px");
        //左侧导航栏
        if (scrollTop + oNav_left.offsetHeight > $(".main_center").height() + 10) {
            oNav_left.style.top = $(".main_center").height() - $("#leftnav").height() + 40 + "px";
        }
        //右侧账户信息
        if (scrollTop + oNav_left.offsetHeight > $(".main_center").height() + 110) {
            $(".main_right").css("top", $(".main_center").height() - $("#leftnav").height() + 98 + "px");
        }
    });

    //页面一加载就加载中间的信息
    /*$.ajax({
        type:"get",
        url:"",
        dataType:"",
        data:{sendTxt:$("#sendTxt")},
        success:function () {
            var send=new Send();
            //这个需要后台传进来
            send.userName="123";
            send.userImg="images/accountImg.jpg";
            send.sendTime="2017-8-7";
            send.sendContent="123321456654";
            send.sendImg="images/3.jpg";
            var str=send.bindDom();
            $(".main_center>.mainbox").prepend(str);
            //加载点赞数到时候记得加
        },
        error:function () {
            alert("中间信息加载错误！");
        }
    })*/

    //退出登录
    $("#logout").on("click",function () {
        $.removeCookie("user");
        window.location.href="index.html";
    })
    //发布微博输入多少字
    $("#sendTxt").on("keyup",function () {
        var sendCount=$("#sendTxt").val().length;
        $(".tips>i").html(sendCount);
    })
    //发布以后继续加载
    $("#sendbtn").on("click",function () {
        $.ajax({
            type:"get",
            url:"",
            dataType:"",
            data:{'sendTxt':$("#sendTxt").val()},
            success:function (data) {
                var send=new Send();
                //这个需要后台传进来
                send.userName="123";//data[i].username
                send.userImg="images/accountImg.jpg";
                send.sendTime="2017-8-7";
                send.sendContent="123321456654";
                send.sendImg="images/3.jpg";
                var str=send.bindDom();
                $(".main_center>.mainbox").prepend(str);
                $("#sendTxt").val("");
            },
            error:function () {
                alert("发布错误！");
            }
        })
    })
    // 点赞
    $(".clickLike").each(function (i) {
        //one只执行一次，on是绑定可以用很多次
        $(this).one("click",function () {
            var likeNum=parseInt($(this).children(0).html())+1;
            $(this).html("赞<i>"+likeNum+"</i>");
            $(this).css("color","#eb7350");
            //点赞后数据库相应增加
            $.ajax({
                type:"post",
                url:"",
                success:function () {

                },
                error:function () {

                }
            });
            //实现点击事件只绑定一次
            // $(this).unbind("click");
        })
    })
    //新发布的动态，有新的评论，但是这个是没有绑定事件的，所以看看能不能使用事件委托的方式实现
    //加载评论
    $(".clickComment").each(function (i) {
        $(this).on("click",function () {
            //显示隐藏评论框
            $(".comment").eq(i).toggle();
            //点击评论弹出其他人的评论，和自己的评论框
            $.ajax({
                type:"get",
                url:"",
                data:{'commentContent':$("#commentContent").val()},
                success:function () {
                    var str="";
                    str+='<div class="commentBox clearfix">';
                    str+='<img src="'+data.accountImg+'" alt="">';
                    str+='<textarea name="" id="commentContent" cols="68" rows="1"></textarea>';
                    str+='<button type="button" class="commentBtn">评论</button></div>';
                    str+='<div class="otherComment">';
                    str+='<div><img src="'+data.otherImg+'" alt="">';
                    str+='<a href="">'+data.otherusername+'</a>';
                    str+='<span>'+data.otherTime+'</span></div>';
                    str+='<div class="commentContent">';
                    str+='<p>'+data.otherContent+'</p></div></div>';
                    str+='<div class="otherComment">';
                    str+='<div><img src="'+data.otherSendImg+'" alt="">';
                    $(".comment").append(str);
                },
                error:function () {
                    alert("评论加载错误！");
                }
            })
        })
    })
    //鼠标经过显示用户信息
    $(".container_top>a,.container_top>img").each(function () {
        $(this).on("mouseover",function () {

        })
    })
})
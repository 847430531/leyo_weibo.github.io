/**
 * Created by admin on 2017/8/1.
 */
$(function () {
    //注册
    $("#reg_b").on("click",function () {
        $(".modal").css("display","block");
    })
    $("#reg_a").on("click",function () {
        $(".modal").css("display","block");
    })
    $(".close").on("click",function () {
        $(".modal").css("display","none");
    })
    // 判断输入格式正确与否
    /*$("#regusername").on("blur",function () {
        if ($("#regusername").val()==""){
            $("#regusername").css("border","1px solid red").attr("placeholder","帐号不允许为空！");
        }else{
            $("#regusername").css("border","1px solid green");
        }
    });
    $("#regpassword").on("blur",function () {
        if ($("#regpassword").val()==""){
            $("#regpassword").css("border","1px solid red").attr("placeholder","密码不允许为空！");
        }else{
            $("#regusername").css("border","1px solid green");
        }
    });
    $("#regpassword").on("blur",function () {
        if ($("#regpassword").val()==$("#regpassword1").val()){
            $("#regpassword1").css("border","1px solid red").attr("placeholder","密码不一致！");
        }else{
            $("#regusername").css("border","1px solid green");
        }
    });*/
    $("#regbtn").on("click",function (data) {
        $.ajax({
            type:"post",
            url:"",
            data:{'regusername':$("#regusername").val(),'regpassword':$("#regpassword").val(),'regpassword1':$("#regpassword1").val()},
            success:function () {
                if(data=="repeat"){
                    alert("用户名已被使用！请重新输入");
                }else{
                    alert("注册成功，请登录！");
                    $(".modal").css("display","none");
                }
            },
            error:function () {
                alert("注册失败！");
            }
        });
    })
    // 登录
    var sons = $(".login>.whitebox>.txt").children("a");
    sons.click(function (e) {
        e.preventDefault();
        sons.removeClass("cur");
    })
    sons.first().on("click",function () {
        $(".prilogin").slideDown();
        $(".phoneimg").slideUp();
    })
    sons.last().on("click",function () {
        $(".prilogin").slideUp();
        $(".phoneimg").slideDown();
    })
    //判断是否已经登录
    if($.cookie("user")){
        window.location.href="home.html";
    }
    //点击登录
    $("#login").click(function () {
        $.ajax({
            type:"get",
            url:"",
            data:{'username':$("#username").val(),'password':$("#password").val()},
            dataType:"json",
            success:function (data) {//这里的data是后台传进来的。比如说传进来一个1.
                //判断是否一周内免登陆,打勾
                if($("#expires").is(":checked")){
                    $.cookie("user",$("#login_user").val(),{
                        expires:7,
                    });
                }else{
                    $.cookie("user",$("#login_user").val());
                }
                if(data==1){//判断后台是不是返回一个1，是就登录成功
                    window.location="home.html";
                }
            },
            error:function () {
                alert("登录错误！");
            }
        })
    });

    // 轮播图
    var pic = [{src:"images/slider1.jpg", txt:" 庆祝中国人民解放军建立90周年，阅兵正在直播"},
        {src:"images/slider2.jpg", txt:" 背影"},
        {src:"images/slider3.jpg", txt:" 徐峥是傻逼"},
        {src:"images/slider4.jpg", txt:" 别具一格的图书馆"},
        {src:"images/slider5.jpg", txt:" 阅兵正在直播"}];
    for(var i = 0;i<pic.length;i++){
        // 添加图片
        $(".sliderbox>ul").append($("<li><img src='"+pic[i].src+"'></li>"));
        // 添加小圆点
        $(".circle").append($("<li></li>"));
    }
    // 当前小点变色还未处理完全
    $(".circle>li").first().addClass("current");
    var n=1,target=0;
    setInterval(function () {
        if(n>pic.length-1){
            n=0;
        }
        for(var i = 0;i<pic.length;i++ ){
            $(".circle>li").eq(i).removeClass("current");
        }
        $(".circle>li").eq(n).addClass("current");
        target=n*660;
        n++;
        $(".sliderbox").css("left",-target+"px");
        //文字描述
        $(".imgtxt").html(pic[n-1].txt);

    },3000);

    //右侧加载nba信息
    $.ajax({
        type:"get",
        url:"http://op.juhe.cn/onebox/basketball/nba?dtype=jsonp&key=60dcbd498fe9ee66bddc56848b6a4c16",
        dataType:"jsonp",
        success:function (data) {
            if (data.reason!="查询成功"){
                $(".news").html("亲，未查询到数据哦！");
            }else{
                var h2='<h2>'+data.result.title+'</h2>';
                $(".news").append(h2);
                for(var j = 0;j<data.result.list.length;j++){
                    for(var i = 0;i<data.result.list[j].tr.length;i++){
                        var str="";
                        str+='<div class="nabbox">';
                        str+='<img src="'+data.result.list[j].tr[i].player1logo+'" alt="">';
                        str+='<img src="'+data.result.list[j].tr[i].player2logo+'" alt="">';
                        str+='<a href="'+data.result.list[j].tr[i].link1url+'" target="_blank">'+data.result.list[j].tr[i].time+'</a>';
                        str+='<div><span>'+data.result.list[j].tr[i].player1+'VS'+data.result.list[j].tr[i].player2+'</span></div>';
                        str+='<span>'+data.result.list[j].tr[i].score+'</span>';
                        str+='</div>';
                        $(".news").append(str);
                    }
                }
            }


        },
        error:function () {
            alert("错误！");
        }
    });
    function news() {
        this.time="";
        this.title="";
        this.description="";
        this.picUrl="";
        this.url="";
    }
    news.prototype={
        bindDom:function () {
            var add="";
            add+='<div class="detail clearfix">';
            add+='<img src="'+this.picUrl+'" alt="">';
            add+='<div class="detail-content">';
            add+='<h4><a href="'+this.url+'" target="_blank">'+this.title+'</a></h4>';
            add+='<span>'+this.description+'</span>';
            add+='</div>';
            add+='<div class="info">';
            add+='<div class="fl">';
            add+='<a href="'+this.url+'">广财震惊部</a>';
            add+='<span>'+this.time+'</span>';
            add+='</div>';
            add+='<div class="fr">';
            add+='<span>评论：1235</span>';
            add+='</div></div></div>';
            return add;
        }
    }
    //加载中间新闻

        $.ajax({
            type:"get",
            url:"http://api.tianapi.com/keji/?key=6ee7e09483a8725ad268b10801a8fde2&num=5",
            success:function (data) {
                if(data.code!=200){
                    alert("api连接错误！");
                }
                var loadnew=new news();
                for(var i = 0;i<data.newslist.length;i++){
                    loadnew.time=data.newslist[i].ctime;
                    loadnew.title=data.newslist[i].title;
                    loadnew.description=data.newslist[i].description;
                    loadnew.picUrl=data.newslist[i].picUrl;
                    loadnew.url=data.newslist[i].url;
                    var add="";
                    add+=loadnew.bindDom();
                    $(".center").append(add);
                }
            },
            error:function () {

            }
        });
})

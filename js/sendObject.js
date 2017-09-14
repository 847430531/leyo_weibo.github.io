/**
 * Created by admin on 2017/8/7.
 */
// 发布信息
function Send() {
    //发布者照片
    this.userImg="";
    //发布者
    this.userName="";
    //发布事件
    this.sendTime="";
    //发布内容
    this.sendContent="";
    //发布照片
    this.sendImg="";
    //评论
    this.comment="";
    //点赞
    this.like=0;
}
Send.prototype={
    bindDom:function () {
        var str="";
        str+='<div class="main_container"><div class="container_top">';
        str+='<img src="'+this.userImg+'" alt="">';
        str+='<a href="">'+this.userName+'</a>';
        str+='<span>'+this.sendTime+'</span>';
        str+='</div><div class="container_bottom">';
        str+='<p>'+this.sendContent+'</p>';
        str+='<img src="'+this.sendImg+'" alt="">';
        str+='</div>';
        str+='<div class="like"><ul>';
        str+='<li><a href="javascript:void(0);">收藏</a></li>';
        str+='<li><a href="javascript:void(0);">转发</a></li>';
        str+='<li><a href="javascript:void(0);" class="clickComment">评论</a></li>';
        str+='<li><a href="javascript:void(0);" class="clickLike">赞<i>120</i></a></li>';
        str+='</ul></div></div>';
        return str;
    }
}

//评论
/*
function Comment() {

}
Comment.prototype={

}*/

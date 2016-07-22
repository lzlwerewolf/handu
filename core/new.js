/**
 * Created by Administrator on 2016/6/16.
 */
window.onload = function(){
    $(document).ready(function(){
        friendLink();//友情链接
        siteMapBound();//网站导航事件
        bottomBlack();//最下面黑色广告
        bannerScrollAppend();
        boundScrollNav();
        changeWay();//选择注册方式
        pushIdentiCode();
        initIdentiCode();//初始化验证码
        testMobileBand();//手机号注册方式
        testEmailBand();//检测邮箱注册方式
        dingyue();//订阅
        searchEvent();
        $(".codeBand").click(function(){
            initIdentiCode();
        })
    });
    document.onkeydown = capitalDown;// 大写锁定

}
//订阅按钮
function dingyue(){
    $("#dingyueSubmit").click(function(){
        var _regExpEmail =/^([0-9a-zA-Z_\.\-])+\@([a-zA-Z0-9\-])+\.([a-zA-Z0-9]){2,4}$/i;
        if(_regExpEmail.test($("#dingyueInput").val())){
            alert("订阅成功");
        }else{
            alert("邮箱格式不正确");
        }
    })
}
//创建验证码组合
var _codeArr = new Array;
function pushIdentiCode(){
    for(var i=0;i<10;i++){
        _codeArr.push(i);
    }
    for(var i=97;i<122;i++){
        _codeArr.push(String.fromCharCode(i));
    }
}
//初始化验证码
function initIdentiCode(){
    var _codeHtml ="";
    for(var i=0;i<4;i++){
        _codeHtml+=_codeArr[Math.floor(Math.random()*_codeArr.length)]
    }
    $(".codeBand").empty().append(_codeHtml);
}
//大写锁定,keycode
function capitalDown(e){
    var e = e||window.event;
    var capsLockKey = e.keyCode ? e.keyCode : e.which;
    if(capsLockKey==20){
        $(".capitalLock").hasClass("block")?$(".capitalLock").removeClass("block"):$(".capitalLock").addClass("block");
    }
}
//给手机号、验证码设置blur事件,还有注册按钮
function testMobileBand(){
    var i=false;//i是检测用户能否登陆的标志
    var _regExpMobile =/^(13|15|18)\d{9}$/i;
    var _regExpPsw =/^\w{8,16}$/i;
    //检测手机号格式
    $("#mobileInput").blur(function(){
        if(_regExpMobile.test($(this).val())!=true){
            $(this).siblings(".fontDarkRed").css({display:"block"}).text("手机号格式不正确");
            i=false;
        }else{
            $(this).siblings(".fontDarkRed").css({display:"none"});
            i=true;
        }
    });
    //检测密码格式
    $("#mobilePswInput").blur(function(){
        if(_regExpPsw.test($(this).val())!=true){
            $(this).siblings(".fontDarkRed").css({display:"block"}).text("密码长度不能小于8位，只支持字母数字下划线");
            i=false;
        }else{
            //若密码符合格式，则给确认密码框添加事件，来检测是否一样
            $(this).siblings(".fontDarkRed").css({display:"none"});
            i=true;
            $("#mobileConfirmPsw").blur(function(){
                if($(this).val()==$("#mobilePswInput").val()){
                    $(this).siblings(".fontDarkRed").css({display:"none"});
                    i=true;
                }else{
                    $(this).siblings(".fontDarkRed").css({display:"block"}).text("两次密码输入不一致");
                    i=false;
                }
            })
        }
    });
    $("#mobileCodeInput").blur(function(){
        if($(this).val()==$(".codeBand:eq(1)").text()){//因为codeBand有两个，手机验证码是第二个
            $(this).siblings(".fontDarkRed").css({display:"none"})
            i=true;
        }else{
            $(this).siblings(".fontDarkRed").css({display:"block"}).text("验证码错误");
            i=false;
        }
    })
    //用户点注册按钮时,检测是否同意了用户协议和是否完善了个人信息
    $("#mobileSubmitButton").click(function(){
        if(i && $(".checkbox:eq(1)").prop("checked")){
            newSuccess($("#mobileInput").val(),$("#mobilePswInput").val());
        }else if(i){
            alert("请同意用户协议");
        }else{
            alert("信息有误，请完善信息");
        }
    })
}
//邮箱注册方式的检测与注册按钮
function testEmailBand(){
    var i=false;//i是检测用户能否登陆的标志
    var _regExpEmail =/^([0-9a-zA-Z_\.\-])+\@([a-zA-Z0-9\-])+\.([a-zA-Z0-9]){2,4}$/i;
    var _regExpPsw =/^\w{8,16}$/i;
    //检测邮箱格式
    $("#emailInput").blur(function(){
        if(_regExpEmail.test($(this).val())!=true){
            $(this).siblings(".fontDarkRed").css({display:"block"}).text("邮箱格式不正确");
            i=false;
        }else{
            $(this).siblings(".fontDarkRed").css({display:"none"});
            i=true;
        }
    });
    //检测密码格式
    $("#pswInput").blur(function(){
        if(_regExpPsw.test($(this).val())!=true){
            $(this).siblings(".fontDarkRed").css({display:"block"}).text("密码长度不能小于8位，只支持字母数字下划线");
            i=false;
        }else{
            //若密码符合格式，则给确认密码框添加事件，来检测是否一样
            $(this).siblings(".fontDarkRed").css({display:"none"});
            i=true;
            $("#confirmPsw").blur(function(){
                if($(this).val()==$("#pswInput").val()){
                    $(this).siblings(".fontDarkRed").css({display:"none"});
                    i=true;
                }else{
                    $(this).siblings(".fontDarkRed").css({display:"block"}).text("两次密码输入不一致");
                    i=false;
                }
            })
        }
    });
    $("#codeInput").blur(function(){
        if($(this).val()==$(".codeBand:eq(0)").text()){//因为codeBand有两个，手机验证码是第二个
            $(this).siblings(".fontDarkRed").css({display:"none"})
            i=true;
        }else{
            $(this).siblings(".fontDarkRed").css({display:"block"}).text("验证码错误");
            i=false;
        }
    })
    //用户点注册按钮时,检测是否同意了用户协议和是否完善了个人信息
    $("#emailSubmitButton").click(function(){
        if(i && $(".checkbox:eq(0)").prop("checked")){
            newSuccess($("#emailInput").val(),$("#pswInput").val());
        }else if(i){
            alert("请同意用户协议");
        }else{
            alert("信息有误，请完善信息");
        }
    })
}
//注册成功
function newSuccess(_userName,_userPsw){
    $.ajax({
        url:"http://bokanappapi.sinaapp.com/HQNews/user/userregister.php",
        data:{username:_userName,password:_userPsw},
        dataType:"json",
        success:function(res){
            if(res.code == 200){
                window.location.href = "newSuccess.html";
            }else if(res.code ==400){
                alert("用户名已存在了，换一个吧");
            }
        },
        error:function(err){
            alert(err);
        }
    })
    /*var date=new Date();
    date.setTime(date.getTime()+30*60*1000);//30分钟后过期
    document.cookie = "user="+_userName+"&psw="+_userPsw+"&point="+0+";expires="+date;
    window.location.href = "newSuccess.html";*/
}
//用手机注册还是邮箱注册？
function changeWay(){
    $("#mobile").click(function(){
        $(this).addClass("select");
        $("#email").removeClass("select");
        $(".mobile").css({display:"block"});
        $(".email").css({display:"none"});
        $("#mobileBand").css({display:"block"});
        $("#emailBand").css({display:"none"});
    });
    $("#email").click(function(){
        $(this).addClass("select");
        $("#mobile").removeClass("select");
        $(".mobile").css({display:"none"});
        $(".email").css({display:"block"});
        $("#mobileBand").css({display:"none"});
        $("#emailBand").css({display:"block"});
    });
}
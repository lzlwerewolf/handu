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
        pushIdentiCode();
        initIdentiCode();
        loginTest();//登陆前先校验验证码和用户名
        login();
        $("#codeBand").click(function(){
            initIdentiCode();
        })
    })
}
//创建验证码
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
    $("#codeBand").empty().append(_codeHtml);
}
//登陆效验验证码和用户名
function loginTest(){
    var _regExpMobile =/^(13|15|18)\d{9}$/i;
    var _regExpEmail =/^([0-9a-zA-Z_\.\-])+\@([a-zA-Z0-9\-])+\.([a-zA-Z0-9]){2,4}$/i;
    $(".front").click(function(){
        $(this).css({display:"none"});
    });
    $("#username,#code").blur(function(){
        if((_regExpMobile.test($("#username").val())==true || _regExpEmail.test($("#username").val())==true) && $("#code").val()==$("#codeBand").text()){
            $(".errorBand").text("");
        }else if(_regExpMobile.test($("#username").val())==true || _regExpEmail.test($("#username").val())==true){
            $(".errorBand").text("验证码错误");
        }else{
            $(".errorBand").text("用户名格式错误");
        }
    });
}
function login(){
    $("#loginBtn").click(function(){
        var _password = $("#password").val();
        var _userName = $("#username").val();
        var cookie =true;
        $("#cookie").prop("checked")?cookie =true:cookie=false;
        loginSuccess(_userName,_password,cookie)
        });
}
function loginSuccess(_user,_psw,_cookie){
    var date = new Date();
    $.ajax({
        url:"http://bokanappapi.sinaapp.com/HQNews/user/userlogin.php",
        data:{username:_user,password:_psw},
        dataType:"json",
        success:function(res){
            if(res.code ==200){
                if(_cookie==true){
                    date.setTime(date.getTime()+30*3600);
                    document.cookie = "user="+_user+"&point=0&login;expires="+date;
                }else{
                    document.cookie = "user="+_user+"&point=0&login";
                }
                alert("登陆成功");
                window.location.href = "index.html"
            }else if(res.code ==400){
                alert("密码错误！");
            }
        },
        error:function(err){
            alert(err);
        }
    });
}
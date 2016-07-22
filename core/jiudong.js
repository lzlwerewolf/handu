/**
 * Created by ThinkPad on 2016/5/25.
 */
window.onload = function(){
    var _banner_login_nav= document.getElementById("banner_login_nav");
    var _banner_login_nav_item = document.getElementById("banner_login_nav_item");
    var _top = document.getElementById("top");
    var _grayLogin = document.getElementsByClassName("login")[0];
    var _exit = document.getElementById('exit');
    var _searchInput = document.getElementById("searchInput");
    var _searchButton = document.getElementById("searchButton");
    var _black = document.getElementById("black");
    var _userName = document.getElementById("userName");
    var _userPsw = document.getElementById("userPsw");
    var _identiCodeInput = document.getElementById("identiCodeInput");//验证码输入框
    var _identiCode = document.getElementById("identiCode");//验证码框
    var _codeArr = new Array;
    var _loginButton = document.getElementById("loginBtn");//登录按钮
    var _scrollNav_div = document.getElementsByClassName("scrollNav_div");
    var _navUl = document.getElementById("nav").getElementsByTagName("ul")[0];
    var _loginBtn = document.getElementsByClassName("loginBtn");
    var _newBtn = document.getElementsByClassName("new");
    var _recommed = document.getElementById("recommed");
    var _scrollNav = document.getElementById("scrollNav");
    var _newItem = document.getElementById("newItem");
    var _onsaleItem = document.getElementById("onsaleItem");
    var _proveItem = document.getElementById("proveItem");
    var _scroll = document.getElementById("scroll");
    var _lt = document.getElementById("lt");
    var _gt = document.getElementById("gt");
    var _left = 0;
    var _step = 0;
    var _timer = 0;
    getcookie();
    function getcookie() {
        if (document.cookie) {
            var _user = document.cookie.match(/\w+=\w+/g)[0].split("=")[1];
            var _point = document.cookie.match(/\w+=\w+/g)[1].split("=")[1];
            var _HTML = "<span style='color: #f60\;float:left'>免费会员<a href=\"/personalCenter.html\">" + _user + "</a>&nbsp;<a href='#'>积分：" + _point + "</a></span>" + "<span id='logOut'>退出</span>"
            _top.innerHTML = _HTML;
            _HTML = "<span class='hello' style='color:#f60''>亲爱的</span>"+"<a class='afterUser' href=\"/personalCenter.html\">"+_user+"</a><a href='#' class='afterPoint'>积分："+_point+"</a> ";
            _grayLogin.innerHTML=_HTML;
            var _logOut = document.getElementById("logOut");
            _logOut.onclick = function() {
                if (window.confirm("是否确定要注销？")) {
                    document.cookie = "user"+"="+_user+";expires="+new Date(0);
                    _top.innerHTML = "<span>您好，请<a href='#' class='loginBtn'>登录</a></span>&nbsp;&nbsp;&nbsp; <a href='#' class='new'>免费注册</a>"
                    _grayLogin.innerHTML = "<span class='hello'>Hi~你好!</span><span class='loginBtn'>请登录</span><a href='#' class='new'>免费注册&gt;</a><span class='xiaofei'>消费赚钱理财<br>放大货币价值</span>";
                    _loginBtn = document.getElementsByClassName("loginBtn");
                    _newBtn = document.getElementsByClassName("new");
                    boundEvent();
                }
            }
        }
    }

    //向验证码数组注入元素,0-9,a-z
    function pushIdentiCode(){
        for(var i=0;i<10;i++){
            _codeArr.push(i);
        }
        for(var i=97;i<122;i++){
            _codeArr.push(String.fromCharCode(i));
        }
    }
    pushIdentiCode();
    //搜索
    _searchButton.onclick = function(){
        var _keyWords = window.encodeURIComponent(document.getElementById("searchInput").value);
        search(_keyWords);
        function search(_keyWords){
            window.location.href= "/jiudong-list.html?key="+_keyWords;
        }
    }
    document.onkeydown = function(evt){
        var evt = evt||window.event;
        if(evt.keyCode==13){

            _searchButton.onclick();
        }
    }

    //登录成功
    function loginSuccess(_userNameValue,_point){
        _black.style.display = "none";
        var _HTML = "<span style='color: #f60\;float:left'>免费会员<a href=\"/personalCenter.html\">"+_userNameValue+"</a>&nbsp;<a href='#'>积分："+_point+"</a></span>"+"<span id='logOut'>退出</span>"
        _top.innerHTML = _HTML;
        _HTML = "<span class='hello' style='color:#f60''>亲爱的</span>"+"<a class='afterUser' href=\"/personalCenter.html\">"+_userNameValue+"</a><a href='#' class='afterPoint'>积分："+_point+"</a> ";
        _grayLogin.innerHTML=_HTML;
        document.cookie = "user="+_userNameValue+"&point="+_point;        //创建cookie
        var _logOut = document.getElementById("logOut");
        _logOut.onclick = function(){
            if(window.confirm("是否确定要注销？")){
                document.cookie = "user"+"="+_userNameValue+";expires="+new Date(0);
                _top.innerHTML ="<span>您好，请<a href='#' class='loginBtn'>登录</a></span>&nbsp;&nbsp;&nbsp; <a href='#' class='new'>免费注册</a>"
                _grayLogin.innerHTML = "<span class='hello'>Hi~你好!</span><span class='loginBtn'>请登录</span><a href='#' class='new'>免费注册&gt;</a><span class='xiaofei'>消费赚钱理财<br>放大货币价值</span>";
                _loginBtn = document.getElementsByClassName("loginBtn");
                _newBtn = document.getElementsByClassName("new");
                boundEvent();
            }
        }
        /*$('#black').css("display","none");
        $('#top').empty().append("<span>欢迎您，</span><a href='#'>"+_userNameValue+"</a>");
        $("div.login").empty().append("<span class='hello'>欢迎您！</span><a href='#'>"+_userNameValue+"</a>");*/
    }
    //初始化验证码
    function initIdentiCode(){
        var _codeHtml ="";
        _userName.value="";
        _userPsw.value="";
        _identiCodeInput.value="";
        for(var i=0;i<4;i++){
            _codeHtml+=_codeArr[Math.floor(Math.random()*_codeArr.length)]
        }
        _identiCode.value=_codeHtml;
    }
    //登录注册
    function boundEvent(){
        if(_loginBtn[0]){
            _loginBtn[0].onclick = function(){
                _black.style.display = "block";
                initIdentiCode();
            }
            _loginBtn[1].onclick = _loginBtn[0].onclick;
            _newBtn[1].onclick= _loginBtn[0].onclick;
            _newBtn[0].onclick= _loginBtn[0].onclick;
        }
        _exit.onclick=function(){
            this.parentNode.parentNode.style.display = "none";
        }
    }
    boundEvent();
    //banner图片滚动
    function bannerScroll(){
        window.clearTimeout(_timer);
        _scroll.style.left = _step+"px";

        _timer = window.setTimeout(bannerScroll,30);
        if(_step==-(_scroll.children.length-1)*584){
            _step=0;
        }
        if(_step%584==0){
            window.clearTimeout(_timer);
            _timer = window.setTimeout(bannerScroll,2000);
        }
        _step-=4;
    }bannerScroll();
    _scroll.onmouseover = function(){
            window.clearTimeout(_timer);
            _lt.style.zIndex =1;
            _gt.style.zIndex =1;
    }
    _scroll.onmouseout = function(){
        bannerScroll();
        _lt.style.zIndex =0;
        _gt.style.zIndex =0;
    }
    //F60导航鼠标事件
    _banner_login_nav_item.onmouseover = function (evt){
        var e = evt || window.event;
        _scrollNav.style.display = "block";
    }
    _scrollNav.onmouseout = function (evt){
        var e = evt || window.event;
        _scrollNav.style.display = "none";
    }
    _scrollNav.onmouseover = function (evt){
        var e = evt || window.event;
        _scrollNav.style.display = "block";
    }
    _banner_login_nav_item.onmouseout = function (evt){
        var e = evt || window.event;
        _scrollNav.style.display ="none";
    }
    //选项卡鼠标事件
    _newItem.onmouseover = function(evt){
        var e = evt || window.event;
        this.className = "selected l";
        _onsaleItem.className = "unselected l";
        _proveItem.className = "unselected l";
    }
    _onsaleItem.onmouseover = function(evt){
        var e = evt || window.event;
        this.className = "selected l";
        _newItem.className = "unselected l";
        _proveItem.className = "unselected l";
    }
    _proveItem.onmouseover = function(evt){
        var e = evt || window.event;
        this.className = "selected l";
        _onsaleItem.className = "unselected l";
        _newItem.className = "unselected l";
    }
    //推荐品牌
    createAjax('post','/core/jiudongImages',true,function(txt){
        var _imglist = txt.split("#");
        var _img ="";
        for(var i=0;i<_imglist.length/2;i++){
            _img = "<a href=\""+_imglist[i+_imglist.length/2]+"\"><img src=\""+_imglist[i]+"\"/></a>";
            _recommed.innerHTML+=_img;
        }
    },null);
    //导航栏以及bannerscroll导航
    createAjax('post','/core/category1.json',true,function(main){
        var _main = window.eval("("+main+")");
        var _html ="";
        var _scrollNavhtml ="";
        createAjax('post','/core/jiudong-string.json',true,function(follow){
            var _follow = window.eval("("+follow+")");
            appendBannerTitle(_follow["category"][0],_follow["category"][1]);//九东百货商场
            var _scrollNavNumL=0;
            var _scrollNavNumR=0;
            //创建导航栏
            function createNavigation(){
                var _li = "";
                for(var _m in _main["category"]){
                    for(var i=0;i<_main["category"][_m].length;i++){
                       if(_main["category"][_m][i][2]=="hot"){
                           //alert(_main["category"][_m][i]);
                           _li="<li><a href=\"jiudong-list.html?key="+_main["category"][_m][i][0]+"\">"+_main["category"][_m][i][0]+"</a></li>"
                           _navUl.innerHTML+=_li;
                       }
                    }
                }
            }
            createNavigation();
            //创建banner和scroll导航
            function bannerScrollNav(){
                for(var _m in _main["category"]){
                    for(var _f in _follow){
                        if(_m == _f){
                            _m=_follow[_f][0];
                        }
                    }
                    appendScrollNavLeft(_m,_follow["category"][1],_scrollNavNumL);//右边的橙色标题，三个参数为：主Json中的键名（已转中文）、从Json中的url、要添加的位置。
                    _scrollNavNumL++;
                    appendBannerNav(_m,_follow["category"][1]);//左边的白色超链接
                }
                for(var _m in _main["category"]){
                    for(var i=0;i<_main["category"][_m].length;i++){
                        appendScrollNavRight(_main["category"][_m][i][0],_main["category"][_m][i][0],_scrollNavNumR);
                    }
                    _scrollNavNumR++;
                }
            }
            bannerScrollNav();
        },null);
        function appendScrollNavLeft(_obj,_url,_num){
            _scrollNavhtml= "<a class=\"left\" href=\""+_url+"\">"+_obj+"</a>";
            _scrollNav_div[_num].innerHTML+=_scrollNavhtml;
        }
        function appendScrollNavRight(_obj,_url,_num){
            _scrollNavhtml= "<a class=\"right\" href=\"jiudong-list.html?key="+_url+"\">"+_obj+"</a><span>|</span>";
            _scrollNav_div[_num].innerHTML+=_scrollNavhtml;
        }
        function appendBannerTitle(_t,_url){
            _html = "<a class=\"banner_nav_title\" href=\""+_url +"\">"+[_t]+"</a>";
            _banner_login_nav_item.innerHTML+=_html;
        }
        function appendBannerNav(_i,_url) {
            _html = "<a class=\"banner_nav_item\" href=\""+_url+"\">"+[_i]+"</a>";
            _banner_login_nav_item.innerHTML += _html;
            }
    },null);
    //用户登录
    createAjax('post','/core/userinfo.json',true,function(info){
        var _json = window.eval("("+info+")");
        _loginButton.onclick = function(){
            alertStatus(checkInfo());
            function alertStatus(_status){
                switch (_status){
                    case 1:{
                        alert("登录成功");
                        break;
                    }
                    case 2:{
                        initIdentiCode();
                        alert("验证码错误");
                        break;
                    }
                    case 3:{
                        alert("密码不正确");
                        break;
                    }
                    case undefined:{
                        alert("用户名不存在");
                    }
                }
            }
            function checkInfo(){
                for(var key in _json){
                    var _userNameValue = _userName.value;
                    var _userPswValue = _userPsw.value;
                    var _identiCodeInputValue = _identiCodeInput.value;
                    var _identiCodeValue = _identiCode.value;
                    var _testUserName = /(<|>|\/)+/g;
                    if((_userNameValue==_json[key][0] || _userNameValue==_json[key][1] || _userNameValue==_json[key][2])&&!_testUserName.test(_userNameValue)){
                        if(_userPswValue==_json[key][3]){
                            if(_identiCodeInputValue==_identiCodeValue){
                                loginSuccess(_userNameValue,_json[key][4]);
                                return 1;
                            }else{
                                _userPsw.value="";
                                _identiCodeInput.value="";
                                return 2;//验证码错误
                            }
                        }else{
                            return 3;//密码不对
                        }
                    }
                }
            }

        }
    },null);
}
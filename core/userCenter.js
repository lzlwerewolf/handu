/**
 * Created by Administrator on 2016/6/19.
 */
window.onload = function(){
    $(document).ready(function(){
        searchEvent();//搜索按钮
        friendLink();//友情链接
        siteMapBound();//网站导航事件
        bottomBlack();//最下面黑色广告
        bannerScrollAppend();
        boundScrollNav();
        loginStatus();
        searchEvent();
        iGuessYouLike();//用户中心-猜你喜欢
        who();//用户中心-欢迎谁
        ilike();//我的收藏
        revisePsw();//修改密码
        select();
        reviseAdr();//修改地址
    })
}
function who(){
    if(document.cookie){
        var _userName = document.cookie.split("&")[0].match(/\w+=.+/g)[0].split("=")[1];
        $(".userName").append(_userName);
    }
}
function iGuessYouLike(){
    var arr = new Array();
    var random =0;
    for(var i=0;i<4;i++){
        random = Math.ceil(Math.random()*144+10000);
        arr.push(random);
    }
    createAjax("post","core/list.json",true,function(data){
        var _json = window.eval("("+data+")");
        var html ="";
        var k=0;
        for(var i in _json["category"]){
            for(var j=0;j<4;j++){
                if(i==arr[j]){
                    html +="<div class='innerItem'><a href='list.html?id="+i+"'><img src='"+_json["category"][i]["icon"][0]+"'/></a><p>"+_json["category"][i]["name"]+"</p><span>售价:</span><span class='fontDarkRed'>"+_json["category"][i]["price"]+"</span></div>";
                    if(k++>4){
                        break;
                    }
                }
            }
        }
        $("#screen").append(html);
    },null);

    $("#right").click(function(){
        var _width = parseInt(window.getComputedStyle(document.getElementById("screen"))["width"].split("px")[0]);
        var _left = parseInt(window.getComputedStyle(document.getElementById("screen"))["left"].split("px")[0]);
        if(_width+_left<=920){
            createAjax("post","core/list.json",true,function(data){
                var _json = window.eval("("+data+")");
                var html ="";
                var random=Math.ceil(Math.random()*144+10000);
                for(var i in _json["category"]){
                    if(i==random){

                        html +="<div class='innerItem'><a href='list.html?id="+i+"'><img src='"+_json["category"][i]["icon"][0]+"'/></a><p>"+_json["category"][i]["name"]+"</p><span>售价:</span><span class='fontDarkRed'>"+_json["category"][i]["price"]+"</span></div>";
                    }
                }
                $("#screen").append(html);
                $("#screen").css({width:"+=230"}).animate({left:"-=230"},2000);
            },null);
        }else{
            $("#screen").animate({left:"-=230"},2000);
        }

    });
    $("#left").click(function(){
        if(window.getComputedStyle(document.getElementById("screen"))["left"].split("px")[0]>=0){
            null;
        }else{
                $("#screen").animate({left:"+=230"},2000);

        }

    });
}

function ilike(){
    var arr = new Array();
    var random =0;
    for(var i=0;i<8;i++){
        random = Math.ceil(Math.random()*144+10000);
        arr.push(random);
    }
    createAjax("post","core/list.json",true,function(data){
        var _json = window.eval("("+data+")");
        var html ="";
        var k=0;
        for(var i in _json["category"]){
            for(var j=0;j<8;j++){
                if(i==arr[j]){
                    html +="<div class='item'><a href='list.html?id="+i+"'><img src='"+_json["category"][i]["icon"][0]+"'/></a><span class='nameBand'><input type='checkbox' class='checkItem'/><a href='list.html?id="+i+"'>"+_json["category"][i]["name"]+"</a></span><span class='priceBand'><span class='fontDarkRed'>"+_json["category"][i]["price"]+"</span><del>"+_json["category"][i]["price"]+"</del></span><span class='btnBand'><span class='deleteThis'></span><span></span><span id='_p'></span></span></div>";
                    if(k++>8){
                        break;
                    }
                }
            }
        }
        $(".itemBand").append(html);
        ilikeEvent();
    },null);
    function ilikeEvent(){
        //全选按钮添加事件。注意，判断if时，全选按钮的checked已经是true了，所以如下写。
        $("#all").click(function(){
            if($("#all").prop("checked")){
                $("input[type='checkbox']").prop({checked:true});
            }else{
                $("input[type='checkbox']").prop({checked:false});
            }
        });
        //如果用户手动全选，那么全选也要checked.
        $(".checkItem").click(function(){
            //返回下面8个checkbox中，没有被选中的元素在集合中的索引值，如果是-1，说明全都被选中，那么执行代码，否则。。
            if($(".checkItem:not(:checked)").index()==-1){
                $("#all").prop({checked:true});
            }else{
                $("#all").prop({checked:false});
            }
        });
        //删除
        $("#delete").click(function(){
           $(".checkItem:checked").closest(".item").remove();//remove整个div.item
            $("#number").text($(".itemBand .item:last-child").index()+1);//获取最后一个div.item在itemBand里的索引值，+1，即为共有几条记录
        });
        $(".deleteThis").click(function(){
            $(this).closest(".item").remove();
            $("#number").text($(".itemBand .item:last-child").index()+1);
        });
    }
}
function revisePsw(){
    var _regExpPsw =/^\w{8,16}$/i;


    $(".save").click(function(){
        var _userName = document.cookie.split("&")[0].match(/\w+=.+/g)[0].split("=")[1];
        var _userPsw = $("#pre").val();
        var _newPsw = $("#new").val();
        if($("#new").val()==$("#con").val()){
            $.ajax({
                url:"http://bokanappapi.sinaapp.com/HQNews/user/changepsd.php",
                data:{username:_userName,password:_userPsw,newpsd:_newPsw},
                dataType:"json",
                success:function(res){
                    if(res.code == 200){
                        alert("修改密码成功，请重新登录");
                        document.cookie = "user=;expires="+new Date(0);
                        window.location.href = "login.html";
                    }else if(res.code ==400){
                        alert("密码错误");
                    }
                },
                error:function(err){
                    alert(err);
                }
            })
        }

    })
}
function reviseAdr(){
    //添加地址
     var html="";
    $("#appendAdr").click(function(){
        $("#appendBand").css({display:"block"});
        $("#who").val("");
        $("#where").val("");
        $("#num").val("");
        $("#province").val("-请选择-");
        $("#city").val("-请选择-");
        $("#county").val("-请选择-");
    });
    //退出
    $("#appendBand .exit").click(function(){
        $("#appendBand").css({display:"none"});
    });
    //确定提交
    $("#submit").click(function(){
        html = "<tr><td>"+$("#who").val()+"</td><td>"+$("#province").val()+$("#city").val()+$("#county").val()+"</td><td>"+$("#where").val()+"</td><td>"+$("#num").val()+"</td><td><span class='rev'>修改</span>   <span class='del'>删除</span></td></tr>";
        $("table").append(html);
        $("#appendBand").css({display:"none"});
        //删除此条数据
        $(".del").click(function(){
            $(this).closest("tr").remove();
        });
    });
    //往省市县里面添加数据
    createAjax("post","core/cityName.json",true,city,null);
    function city(txt){
        var _province = document.getElementById("province");
        var _city = document.getElementById("city");
        var _county = document.getElementById("county");
        var _txt = window.eval("("+txt+")");
        console.log(_txt);
        var _option = null;

        for(var i=0;i<_txt["regions"].length;i++){
            _option += "<option id=\""+_txt["regions"][i].id+"\">"+_txt["regions"][i].name+"</option>";
        }
        _province.innerHTML += _option;

        var p=0 ;
        var c=0 ;
        _province.onchange = function(){
            var _list = _province.children;
            var _option = "<option id=\""+"-1\">"+"-请选择-"+"</option>";
            for(var i = 0;i<_list.length;i++) {
                if (_list[i].selected) {
                    if(i>0){
                        p = i-1;
                        for(var n =0;n<_txt["regions"][i-1]["regions"].length;n++){
                            _option += "<option id=\""+_txt["regions"][i-1]["regions"][n]["id"]+"\">"+_txt["regions"][i-1]["regions"][n]["name"]+"</option>";
                        }
                        _city.innerHTML = _option;
                        _county.innerHTML = "<option id=\"-2\">--请选择--</option>";
                        return;
                    }
                    else{
                        _city.innerHTML = "<option id=\"-1\">--请选择--</option>";
                        _county.innerHTML = "<option id=\"-2\">--请选择--</option>";
                    }
                }
            }
        }


        _city.onchange = function(){
            var _list = _city.children;
            var _option = "<option id=\""+"-2\">"+"-请选择-"+"</option>";
            for(var m =0;m<_list.length;m++){
                if(_list[m].selected){
                    if(m>0){
                        c = m-1;
                        for(var k = 0;k<_txt["regions"][p]["regions"][c]["regions"].length;k++){
                            _option += "<option id=\""+_txt["regions"][p]["regions"][c]["regions"][k]["id"]+"\">"+_txt["regions"][p]["regions"][c]["regions"][k]["name"]+"</option>";
                        }
                        _county.innerHTML = _option;
                        return;
                    }
                    else{
                        _county.innerHTML = "<option id=\""+"-2\">"+"-请选择-"+"</option>";
                    }
                }
            }
        }

    }
}
function select(){
    $("#my").click(function(){
        $("#myContent").css({display:"block"}).siblings(".right").css({display:"none"});
    });
    $("#ilike").click(function(){
        $("#ilikeContent").css({display:"block"}).siblings(".right").css({display:"none"});
    })
    $("#revisePsw").click(function(){
        $("#revisePswContent").css({display:"block"}).siblings(".right").css({display:"none"});
    })
    $("#reviseAdr").click(function(){
        $("#reviseAdrContent").css({display:"block"}).siblings(".right").css({display:"none"});
    })
}
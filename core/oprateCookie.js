/**
 * Created by Administrator on 2016/6/25.
 */
//������������ҳ�ϼ��빺�ﳵ��ť�ĵ���¼�
$("#cart").click(function(){
    //��ȡ����Ʒ��id���Լ��û�ѡ���size������
    var goodId = window.location.href.split("?id=")[1];
    var size = $(".select").text();
    var number = parseInt($("#number").val());
    //���ﳵ��Ϣ����30��
    var date = new Date();
    date.setDate(date.getDate()+30);
    var _cookie = document.cookie;
    //_item���������������
    var _item =null;
    //_new������������ÿ����Ʒ��Ϣ
    var _new ="";
    if(_cookie.indexOf("list=")==-1){//�桤��Ʒ�����ﳵ�ĵ�һ����Ʒ
        var first = "list="+"{id:"+goodId+",number:"+number+",size:'"+size+"'}";
        document.cookie = first+";expires="+date;
    }else if(_cookie.indexOf("list=")>-1){
        if(_cookie.indexOf(goodId)==-1){//���й��ﳵ�������ظ���Ʒ,ҲҪ����װcookie
            //ȡ��ÿ����Ʒ������"{id:"",size:"",number:""}"
            var _list1 = _cookie.match(/\{.+\}/g)[0].split("$");
            //������Щ��Ʒ�����������¼���һ�����ַ���
            for(var k=0;k<_list1.length;k++){
                _new +="$"+_list1[k];
            }
            //���Ѹ�����Ʒ��Ϣ�����ַ���,����cookie,�����ʱ����
            _new+="${id:"+goodId+",number:"+number+",size:'"+size+"'}";
            document.cookie = "list="+_new+";expires="+date;
            _new="";
        }else if(_cookie.indexOf(goodId)>-1){//����Ʒ�Ѵ���,��cookie�һأ�ת��Ϊ���󣬸���number���Ը�ֵ����������ӡ�
            var _list = _cookie.match(/\{.+\}/g)[0].split("$");
            //����������Ʒ���ҵ�id��ͬ����һ��������������,�ø�����Ϣ�滻ԭ����
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                if(_item["id"]==goodId){
                    number = _item["number"]+number;
                    var jsonStr = "{id:"+goodId+",number:"+number+",size:'"+size+"'}";
                    _list[i]=jsonStr;
                }
                //��ÿ��ǰ�涼���Ϸָ��������°�cookieװ��ȥ
                _new +="$"+_list[i];
                document.cookie ="list="+ _new+";expires="+date;
            }
        }
    }
});
//------------------------------------�����ķָ���-----------------------------------
//-----------------------------------������һԤ�Լ�----------------------------------
//�������ڹ��ﳵҳ�����cookie,�������
function appendCart(){
    if(document.cookie){
        var _cookie =document.cookie;
        try{
            //ȡ��ÿ����Ʒ������"{id:"",size:"",number:""}"
            var _list = _cookie.match(/\{.+\}/g)[0].split("$");
            var _item=null;
            //�������������Ʒ��Ϣ��obj���ͣ�
            var arr =new Array();
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                arr.push(_item);
            }
            //�������
            createAjax("post","core/list.json",true,function(data){
                var _json = window.eval("("+data+")");
                var html ="";
                for(var i in _json["category"]){
                    for(var j=0;j<arr.length;j++){
                        if(i==arr[j]["id"]){
                            html +="<div class='inner'><div class='img l'><img src='"+_json["category"][i]["icon"][0]+"'/></div><div class='name l'><a href='detail.html?id="+i+"'>"+_json["category"][i]["name"]+"</a></div><div class='size l'><span>"+arr[j]["size"]+"</span></div><div class='price l'><span>"+_json["category"][i]["price"]+"</span></div><div class='num l'><span class='sub'>-</span><span class='goodNum'>"+arr[j]["number"]+"</span><span class='plus'>+</span></div><div class='all l'><span>��"+arr[j]["number"]*_json["category"][i]["price"].split("��")[1]+"</span></div><div id='del"+i+"'></div></div>";
                        }
                    }
                }
                $("#content").append(html);
                //�����ɺ󣬰��¼���ɾ�����Ӽ�
                cartBound();
                //������Ʒ�������ܼ۸�ĺ���
                update();
            },null);
        }catch(e){
            //�������try,catch,���ﳵ����Ϣ��ɾ���������ҳ��ᱨ��
            //���catch���˴���˵�����ﳵû��Ϣ��ɾ������cookie
            //Ҳ������ɾ����������ж�һ��cookie.match(/\{.+\}/g)�Ƿ���ڣ������ھ�ɾ��cookie
            document.cookie = "list=;expires="+ new Date(0);
            alert("�޹��ﳵ��Ϣ");
        }
    }
}
//����¼�
function cartBound(){
    //ɾ��
    $(".inner div:last-child").click(function(){
        if(window.confirm("�Ƿ�ȷ��ɾ����������?")){
            $(this).closest(".inner").remove();
            var _cookie = document.cookie;
            var _item=null;
            //ɾ����ť��id��del10xxx
            var domId = $(this).attr("id").split("del")[1];
            var _new ="";
            var _list = _cookie.match(/\{.+\}/g)[0].split("$");
            var date = new Date();
            date.setDate(date.getDate()+30);
            for(var i=0;i<_list.length;i++){
                _item=window.eval("("+_list[i]+")");
                if(_item["id"]==domId){;
                    _list[i]="";
                    //��һ��ܼӷָ�����������һ��$��������continue�����´�ѭ��
                    continue;
                }
                //��ÿ����Ϸָ��������°�cookieװ��ȥ
                _new +="$"+_list[i];
            }
            document.cookie = "list="+_new+";expires="+date;
            //�����������ܼ�
            update();
        }
    });
    //�Ӽ�
    $(".sub").click(function(){
        $(this).siblings(".goodNum").text()<=1?null:$(this).siblings(".goodNum").text($(this).siblings(".goodNum").text()-1);
        $(this).closest(".inner").children(".all").children("span").text("��"+$(this).siblings(".goodNum").text()*$(this).closest(".inner").children(".price").children("span").text().split("��")[1]);
        update();
    });
    $(".plus").click(function(){
        $(this).siblings(".goodNum").text(parseInt($(this).siblings(".goodNum").text())+1);
        $(this).closest(".inner").children(".all").children("span").text("��"+$(this).siblings(".goodNum").text()*$(this).closest(".inner").children(".price").children("span").text().split("��")[1]);
        update();
    });
    //�ύ
    $("#submit").click(function(){
        submit();
    })
}
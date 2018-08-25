// $.ajax({
//     url:"../list.json",
//     type:"get",
//     success:function(data){
//         console.log(data);
//     }
// });


var data = [];

//第几批抽奖
var times = 0;

var ids=new Array();
var xinm=new Array();
var phone=new Array();

var nametxt=$('.name');
var phonetxt=$('.phone');

//抽奖清单人数
var pcount=0;
var runing=true;
//剩余抽奖人数
var remainder=0;
var num=0;
var t;
//抽奖人数
var quantity=0;

//输入人数点击确定
function confirm(){
    quantity = $("#pnum").val();
    if(quantity > 0){
        $(".pnumwrapper").hide();
        $(".actionwrapper").show();
        $(".messagewrapper").show();
        $(".remainnum").html(quantity);
        $(".confirmnum").html(0);
        remainder=quantity;
    }else{
        alert("请输入抽奖人数");
    }
    
}

function startmp3play(){
    $("#startaudio")[0].play();
}

function startmp3pause(){
    $("#startaudio")[0].pause();
}

function successmp3play(){
    $("#successaudio")[0].load();
    $("#successaudio")[0].play();
}

function successmp3pause(){
    $("#successaudio")[0].pause();
}


function init(){
    times++;
    contructor(500);
    var phonenum = null;
    data.forEach(function(item){
        xinm.push(item.name);
        phonenum = item.phone.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
        phone.push(phonenum);
        ids.push(item.id);
    });
    
    pcount=xinm.length-1;
}
/**
 * 构造虚拟数据
 */
function contructor(vnum){
    for(var i = 1; i <= vnum;i++){
        obj = {};
        obj.id = i;
        obj.name = "张三"+i;
        
        if(i % 10 < 10 && i % 10 >= 0){
            obj.phone = "9999999999"+i;
        }

        if(i % 100 < 100 && i % 100 >= 10){
            obj.phone = "999999999"+i;
        }

        if(i % 1000 < 1000 && i % 1000 >= 100){
            obj.phone = "99999999"+i;
        }
        //r=Math.floor(Math.random()*8);
        //obj.phone = "1"+r+"2"+r+"1"+(r+1)+"2"+r+"23"+r;
        data.push(obj);
    }
}

//重置抽奖
function reset(){
    times++;
    $(".pnumwrapper").show();
    $(".actionwrapper").hide();
    $(".messagewrapper").hide();
    $("#pnum").val(null);
    num = 0;
    remainder = 0;
    runing = true;
    $("table.list>tbody").remove();
    $("#startaudio")[0].pause();
    $("#successaudio")[0].pause();
    $("#startaudio")[0].load();
    $("#successaudio")[0].load();
    nametxt.html("姓名");
    phonetxt.html("电话");
    $('#btntxt').removeClass('stop').addClass('start');
    $('#btntxt').html('开始');
    pcount=xinm.length-1;
    clearInterval(t);
    t=0;
}

//开始抽奖
function start(){
    if(remainder < 1){
        alert("抽奖完毕");
        return;
    }
    if(remainder > pcount+1){
        alert("抽奖人数多于名单人数");
        return;
    }
    startmp3play();
    successmp3pause();
    if(runing){
        runing=false;
        $('#btntxt').removeClass('start').addClass('stop');
        $('#btntxt').html('停止');
        startNum()
    }else{
        runing=true;
        $('#btntxt').removeClass('stop').addClass('start');
        $('#btntxt').html('开始');
        stop();
        print();
    }
}
function startNum(){
    rand = pcount;
    if(rand == 1)
        rand++;
    num=Math.floor(Math.random()*rand);
    nametxt.html(xinm[num]);
    phonetxt.html(phone[num]);
    t=setTimeout(startNum,0);
}
function stop(){
    startmp3pause();
    successmp3play();
    pcount=xinm.length-1;
    clearInterval(t);
    t=0;
}
/**
 * 打印中奖者，从剩下数据中去除中将者
 */
function print(){
    if(remainder >= 1){
        if(xinm.length === 1)
            num = 0;
        $('.list').prepend("<tr><td style='width:20%'>"+remainder+"</td><td style='width:30%'>"+xinm[num]+"</td><td style='width:50%'>"+phone[num]+"</td></tr>");
        // console.log("num is :"+num);
        // console.log("remainder is :"+num);
        //send2back({"times":times,"id":ids[num],"name":xinm[num],"phone":phone[num]});
        console.log("第"+times+"批--"+ids[num]+"--"+xinm[num]+" -- "+phone[num]);
        xinm.splice($.inArray(xinm[num],xinm),1);
        phone.splice($.inArray(phone[num],phone),1);
        ids.splice($.inArray(ids[num],ids),1);
        remainder=remainder-1;
        $(".remainnum").html(remainder);
        $(".confirmnum").html(quantity-remainder);
    }
}
init();
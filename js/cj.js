var data = [];
var pridedata = [];

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

//当前抽取的奖项
var currentPrideId = 0;

//打印顺序 默认是从奖项的末尾开始选择而不是选择一等奖开始
var printorder = false;
/**
 * 选择奖项
 */
function chosepride(itemId){
    itemId = parseInt(itemId);
    currentPrideId = itemId;
    item = pridedata[itemId-1];
    if($("#pride"+itemId).hasClass("pridebtn-has")){
        alert("您已经抽过该奖项了");
        return;
    }
    
    $(".pride-img-wrapper img").attr("src",item.pridePic);
    $(".pride-img-wrapper img").show();
    
    for(var i = 1; i <= pridedata.length;i++){
        if(i == itemId)
            continue;
        $("#pride"+i).hide();
    }

    quantity = parseInt(item.prideNum);
    if(quantity > 0){
        // $(".pnumwrapper").hide();
        // $(".actionwrapper").show();
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
    //加载奖项
    pridedata = getPride();
    pridedata.forEach(function(prideitem){
        divtmp = '<div class="aword-btn pridebtn" id="pride'+prideitem.id+'" onselectstart="return false;" onclick="chosepride('+prideitem.id+')">'+prideitem.prideItem+'</div>';
        $(".prideitemwrapper").append(divtmp);
        // prideitem.prideNum;
        // prideitem.pridePic;
    });
    
    //加载中奖者清单
    data = getData();
    //contructor(500);
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

function showPrideItemBtn(){
    for(var i = 1; i <= pridedata.length;i++){
        prideItem = $("#pride"+i);
        if(prideItem.css("display") === "none"){
            prideItem.show();
        }else{
            if(remainder !==  parseInt(pridedata[i-1].prideNum))
                prideItem.removeClass("pridebtn").addClass("pridebtn-has");
        }
    }
    $(".pride-img-wrapper img").hide();
}

//重置抽奖
function reset(){
    if(remainder > 0 && quantity - remainder > 0)
        return;

    showPrideItemBtn();
    times++;
    // $(".pnumwrapper").show();
    // $(".actionwrapper").hide();
    $(".messagewrapper").hide();
    num = 0;
    remainder = 0;
    runing = true;
    // $("table.list>tbody").remove();
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
function print(prideId){
    if(remainder >= 1){
        if(xinm.length === 1)
            num = 0;
        
        temtr = "<tr><td style='width:20%'><span class='hot hot"+currentPrideId+"'>"+currentPrideId+"</span></td><td style='width:30%'>"+xinm[num]+"</td><td style='width:50%'>"+phone[num]+"</td></tr>";

        if(times === 1 && currentPrideId === 1){
            printorder = true;  // 打印顺序 true为正序说明第一个开始抽的是一等奖  false为逆序说明第一个开始抽的是末尾的奖项
        }
            
        if(printorder){
            $('.list').append(temtr);
        }else{
            $('.list').prepend(temtr);
        }
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

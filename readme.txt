1.使用之前先导入用户数据到list.js中
    1.1使用http://www.bejson.com/json/col2json/网页工具将excel转为json数据。
    在使用该工具时要将序号改为id，名称改为name,电话改为phone（必须）
    1.2将json数据拷贝到list.js中的origindata变量下。例如 ：
        var origindata = [
            {"id":"1","name":"喻宙","phone":"13808230923"},
            {"id":"2","name":"张武卓","phone":"15198122858"},
            {"id":"3","name":"韦小波","phone":"15802831533"},
            {"id":"4","name":"朱旭波","phone":"18780588806"},
            {"id":"5","name":"邓香琪","phone":"13981125631"},
        ];
2.创建奖项文件prideitem.js，将奖项配置写入prideConfig变量下，例如：
id必须从1开始，第一项必须是一等奖，prideItem是奖项展示名称，prideNum是该奖项抽取人数，pridePic是奖项图片，地址必须能够获取到（一般来说和img目录下图片要对应）
    var prideConfig = [
    {
        id:"1",
        prideItem:"一等奖",
        prideNum:"2",
        pridePic:"img/pride1.png"
    },
    {
        id:"2",
        prideItem:"二等奖",
        prideNum:"3",
        pridePic:"img/pride2.jpg"
    },
    {
        id:"3",
        prideItem:"三等奖",
        prideNum:"3",
        pridePic:"img/pride3.jpg"
    }
];

3.音乐配置文件在asset目录下，cj.mp3是抽奖开始时的音乐，success.mp3是成功后播放的音乐
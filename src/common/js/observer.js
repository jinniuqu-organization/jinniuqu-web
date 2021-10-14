/*
    $on:事件绑定
        $on(事件名称,回调函数)

        1个事件名称上面可能会绑定多个函数


        事件名称与函数之间的关系：key:[]

        1、
            首先判断当前事件名称是否存在,如果事件名称存在则直接将当前函数push到当前数组中去

            如果不存在则创建一个数组，然后在将当前函数push到数组中去



    $emit:事件触发
        $emit(事件名称,params)


        触发事件的时候需要触发当前事件身上所以的函数


        1、判断当前当前事件名称是否存在，如果不存在则什么也不用干 直接return；

        2、如果存在的情况下,获取到当前事件名称所对应的所有函数，遍历执行

        3、如果第二次参数存在的情况下，调用函数的时候将第二个参数传递进去






    $off:事件解绑
        $off(事件名称,需要解绑的函数)

        如果没有传递第二个参数则解绑所以事件
        如果传递了第二个参数则解绑指定函数


        1、首先判断当前事件名称是否存在，如果不存在 直接return
        2、如果事件名称存在，则判断第二值是否存在，如果存在则将这个函数从数组中移除，如果不存在直接将数组清空


*/


let EventList = {
   //key:[]
}


const $on = (EventName,cb)=>{

    if(!(EventList[EventName])){

        EventList[EventName] = [];
    }
    EventList[EventName].push(cb);
}


const $emit = (EeventName,params)=>{
    if(!EventList[EeventName])return;

    let EventLists = EventList[EeventName];
    EventLists.map((cb)=>{
        params?cb(params):cb();
    })
}

const $off = (EventName,callback)=>{
   if(EventList[EventName]){
       let EventListsOff = EventList[EventName];
       if(callback){
            EventList[EventName] =  EventListsOff.filter((cb)=>{
                return cb != callback;
            })
       }else{
            EventList[EventName].length = 0;
       }
   }
}

const  setCookie = function(name, value){ 
    //设置名称为name,值为value的Cookie
    var expdate = new Date();   //初始化时间
    expdate.setTime(expdate.getTime() + 30 * 60 * 1000);   //时间单位毫秒
    document.cookie = name+"="+value+";expires="+expdate.toGMTString()+";path=/";
   //即document.cookie= name+"="+value+";path=/";  时间默认为当前会话可以不要，但路径要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！
}

const getCookie = function(c_name){
//判断document.cookie对象里面是否存有cookie
     var c_start,c_end,c_name;
    if (document.cookie.length>0){
    c_start=document.cookie.indexOf(c_name + "=")
        //如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
    if (c_start!=-1){ 
        c_start=c_start + c_name.length+1 
        c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
           return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}

export default {
    $on,
    $emit,
    $off,
    setCookie,
    getCookie
}
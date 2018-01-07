// /**
//  * Created by Ambrose on 2017/12/13.
//  */
// // 注册
// Vue.component('my-component', {
//     template: '<h3>{{orderID}}</h3>'
// });
//
// // 创建根实例
// new Vue({
//     el: '#example'
// });
//

function getCurrentStyle(node) {
    var style  = null;
    if(window.getComputedStyle) {
        style = window.getComputedStyle(node, null);
    }else{
        style = node.currentStyle;
    }
    return style;
}

var myOrders= {
    '#123456':{
        drinks: [
            {
                name: "Apple Juice",
                size: "L",
                account: "3",
                ingredients:[]
            },
            {
                name: "Orange Juice",
                size: "M",
                account: "3",
                ingredients:[]
            }
        ],
    done: false },
    '#123458':{
        drinks: [
            {
                name: "Apple Juice",
                size: "L",
                account: "3",
                ingredients:[]
            },
            {
                name: "Orange Juice",
                size: "M",
                account: "3",
                ingredients:[]
            },
            {
                name: "DIY",
                size: "L",
                account: "2",
                ingredients:[
                    {ingredient:["Apple","Orange","Cherry"]},
                    {ingredient:["Apple","Orange","Cherry"]}
                ]
            }
        ],
        done: false }
};

var myCurrentOrder= myOrders['#123456'];
var currentOrderID = '#123456';

var vm2 = new Vue({
    el:'#right',
    data:{
        order:myCurrentOrder,
        ID:currentOrderID
    },
    methods:{
        finish: function(){
            this.order.done = true;
            var allDone = true;
            for (e in myOrders){
                if(!myOrders[e].done){
                    document.getElementById("detailed_order").style['animation'] = 'updateContent 0.5s ease-in-out infinite';
                    document.getElementById("detailed_order").style['-webkit-animation'] = 'updateContent 0.5s ease-in-out infinite';
                    setTimeout(function () {
                        vm2.order = myOrders[e];
                        vm2.ID = e;
                    }, 300);
                    allDone = false;
                    break;
                }
            }
            if(allDone){
                this.order = "";
                this.ID = "";
            }
        }
    }
});

var isPressed = false;
var currentEle = null;
var originalTop = 0;
var orderID;

var vm = new Vue({
    el:'#left',
    data:{
        orders: myOrders,
        top:0
    },
    methods:{
        enter: function(ID) {
            if(ID != vm2.ID){
                document.getElementById("detailed_order").style['animation'] = 'updateContent 0.5s ease-in-out infinite';
                document.getElementById("detailed_order").style['-webkit-animation'] = 'updateContent 0.5s ease-in-out infinite';
                setTimeout(function () {
                    vm2.ID = ID;
                    vm2.order = myOrders[ID];
                }, 300)
            }
            isPressed = true;
            currentEle = document.getElementsByClassName("order_unit "+ID)[0];
            originalTop = currentEle.getBoundingClientRect().top;
        }
    }
});

move = function (e) {
    if(isPressed){
        var height = parseInt(getCurrentStyle(currentEle).height);
        var centerY = currentEle.getBoundingClientRect().top + height/2;
        var offsetY = event.clientY - centerY;
        currentEle.style['transform'] = 'translateY('+offsetY/2+'px'+')';
        currentEle.style['opacity'] = Math.max(1 - Math.abs(originalTop - currentEle.getBoundingClientRect().top)*4/height, 0);
        if(Math.abs(originalTop - currentEle.getBoundingClientRect().top) > height/4 ){
            vm2.finish();
            isPressed = false;
        }
    }
};

up = function (e) {
    isPressed = false;
    currentEle.style['transform'] = "";
    currentEle.style['opacity'] = 1;
};

document.onmousemove = move;
document.onmouseup = up;
document.addEventListener('webkitAnimationIteration', function () {
    document.getElementById("detailed_order").style['animation'] = 'updateContent 0.5s ease-in-out infinite paused';
    document.getElementById("detailed_order").style['-webkit-animation'] = 'updateContent 0.5s ease-in-out infinite paused';
});
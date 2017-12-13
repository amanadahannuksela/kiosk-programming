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
                    this.order = myOrders[e];
                    this.ID = e;
                    allDone = false;
                    break;
                }
            }
            if(allDone){
                this.order = "";
                this.ID = "";
            }
            // console.log(this.order)
        }
    }
});

var vm = new Vue({
    el:'#left',
    data:{
        orders: myOrders
    },
    methods:{
        enter: function(ID) {
            vm2.ID = ID;
            vm2.order = myOrders[ID];
        }
    }

});

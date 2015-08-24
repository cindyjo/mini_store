
var myAppModule = angular.module('myApp', ['ngRoute']);
myAppModule.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/customers.html'
    })
    .when('/orders',{
        templateUrl: 'partials/orders.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

myAppModule.factory('customerFactory', function() {
    var customers =[];    
    var factory={};

    factory.getCustomers = function(callback){
        callback(customers);
    }

    factory.addCustomers = function(data){
        customers.push(data);
    }

    factory.removeCustomer = function(data){
        customers.splice(data,1);
    }
    return factory;
});

myAppModule.controller('customersController', function(customerFactory){
    this.customers = [];
    
    that = this;
    customerFactory.getCustomers(function(data){
        that.customers = data;
    }); 

    this.addCustomers = function(data) {
        this.error_message = '';

        if(!this.newCustomer){
            this.error_message = "Error! name cannot be empty";
            this.newCustomer=null;
            return false;
        }  

        for(var i =0; i < this.customers.length; i++){
            if(this.customers[i].name === this.newCustomer.name){
                this.error_message = "Error! cannot enter duplicate";
                this.newCustomer=null;
                return false;
            }
        }
        
        this.newCustomer.created_date = new Date();
        customerFactory.addCustomers(this.newCustomer);

        this.newCustomer=null;      
    };
    this.removeCustomer = function(customer) {
        customerFactory.removeCustomer(this.customers.indexOf(customer));
    };  
});

myAppModule.factory('orderFactory', function() {
    var orders = [];
    var factory ={};

    var products = [
        {name: 'Nike Shoes'},
        {name: 'Black Belts'},
        {name: 'Ice Creams'},
        {name: 'Candies'}
    ];

    factory.getProducts = function(callback){
        callback(products);
    };

    factory.addOrders = function(data){
        orders.push(data);
    };
    factory.getOrders = function(callback){
        callback(orders);
    };
    
    return factory;
})

myAppModule.controller('ordersController', function(orderFactory){
    
    that=this;
    orderFactory.getProducts(function (data){
        that.products = data;
    })

    orderFactory.getOrders(function(data){
        that.orders = data;
    }); 

    this.addOrders = function(data) {
        this.error_message = '';

        if(!this.newOrder){
            this.error_message = "Error! cannot be empty";
            this.Order=null;
            return false;
        }  
        
        this.newOrder.created_date = new Date();
        orderFactory.addOrders(this.newOrder);

        this.newOrder=null;      
    };
})





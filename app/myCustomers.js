(function () {
    'use strict';
    angular.module('myCustomers', []);
    angular.module('myCustomers').controller('CustomerCtrl', ['customerService', CustomerController]);
    function CustomerController(customerService) {
        var self = this;
        self.title = 'Customer Controller';
        self.customers = [];
        self.customer = null;
        self.selectCustomer = selectCustomer;

        activate();
        function activate() {
            customerService.getData().then(function (data) {
                self.data = data;
                self.customers = data.value;
            });
        };

        function selectCustomer(val) {
            self.customer = val;
        }

    };
    angular.module('myCustomers').factory('customerService', ['$http', '$q', customerService])
    function customerService($http, $q) {
        var service = {
            getData: getItems
        };
        return service;

        function getItems() {
            //var items = [
            //    { CustomerID: 'CUST01', CompanyName: 'Company Name 1', ContactName: 'Contact Name 1' },
            //    { CustomerID: 'CUST03', CompanyName: 'Company Name 3', ContactName: 'Contact Name 3' },
            //    { CustomerID: 'CUST10', CompanyName: 'Company Name 10', ContactName: 'Contact Name 10' },
            //    { CustomerID: 'CUST02', CompanyName: 'Company Name 2', ContactName: 'Contact Name 2' },
            //];
            //return $q.when(items);
            var url = 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers';
            var d = $q.defer();
            $http.get(url).success(d.resolve).error(d.reject);
            return d.promise;

        };
    };

    angular.module('myCustomers').directive('customerCard', ['$window', customerCard]);
    function customerCard($window) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                user: '='
            },
            //templateUrl: 'customerCardTemplate.html'
            templateUrl: 'app/myCustomersCard.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();
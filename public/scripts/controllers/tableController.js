(function () {
    'use strict';

    var module = angular.module('pageControllers');

    module.controller('TableController', ['$scope', '$http', '$routeParams', '$location',
        function ($scope, $http, $routeParams, $location) {
			$scope.orders = [{
				name: "Hello World",
				type: "Lunch Special",
				strength: "Hot",
				curry: "Butter Chicken",
				drink: "Mango Lassi",
				naan: "Butter",
				extras: "-",
				price: 14,
				paid: true
			}];
			
			$scope.spiceValues = [3,2,1];
			$scope.spiceLabels = ['Hot', 'Medium', 'Mild'];
			$scope.spiceColours = ['#F61D0E','#F09D00','#018941'];
			
			$scope.paidValues = [34, 234];
			$scope.paidLabels = ['Paid', 'Oweing'];
			$scope.paidColours = ['#018941','#F61D0E'];
			
			$scope.curryValues = [[34, 234]];
			$scope.curryLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I'];
			$scope.curryColours = ['#018941','#F61D0E'];
			
			$scope.getDate = function() {
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1;

				var yyyy = today.getFullYear();
				if(dd<10){
					dd='0'+dd
				} 
				if(mm<10){
					mm='0'+mm
				} 
				return dd+'/'+mm+'/'+yyyy;
			};
			
			$scope.getTotal = function(orders) {
				var total = 0;
				for (var i = 0; i < orders.length; i++) {
					total += orders[i].price;
				}
				return total;
			};
		}
	]);
}());
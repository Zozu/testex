var app = angular.module("testex", ['ui.router'])
	.run(function ($state) {
        $state.go('main');
    });
function HomeController() {
    var vm = this;

    vm.title = 'Home';
}

angular
    .module('app')
    .controller('HomeController', HomeController);
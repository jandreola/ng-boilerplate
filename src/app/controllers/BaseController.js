function BaseController() {
    var vm = this;

    // Basic Page links
    vm.navigation = [
         { name: 'Home', link: '#!' },
         { name: 'Another Page', link: '#!/another-page' }
    ];
}

angular
    .module('app')
    .controller('BaseController', BaseController);
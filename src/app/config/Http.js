function Http($httpProvider){
    /*
     * This provide some default adjudtments on all
     * http requests made through angular. Change setting as necessary
     * https://docs.angularjs.org/api/ng/provider/$httpProvider
     */
    
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
}

angular
    .module('app')
    .config(Http);

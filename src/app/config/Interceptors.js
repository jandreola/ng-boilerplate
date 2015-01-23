function Interceptors($httpProvider){

    /*
     * Interceptors are functions that modifies
     * outcoming and incoming ajax calls
     */
    $httpProvider.interceptors.push('LoadingSpinnerService');
}

angular
    .module('app')
    .config(Interceptors);

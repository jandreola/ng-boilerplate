/*
 * Constants can be used in Controllers, Services, Directives, etc
 * it doesn't polute global scope 
 */
angular
    .module('app')
    .constant('API_URL', 'YOUR_API_URL_GOES_HERE')
    .constant('VIEWS', '/views/')
    .constant('CDN_URL', 'YOUR_CDN_URL_GOES_HERE');

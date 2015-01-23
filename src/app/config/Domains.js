function Domains($sceDelegateProvider, API_URL){

    /* 
     * List of authorized domains to allow Angular
     * to communicate through ajax
     */
    var whitelist = [
        'self',
        API_URL
    ];


    /*
     * List of blocked urls to avoid unwanted
     * ajax calls
     */    
    var blacklist = [];


    /*
     * Set arrays in SCE provider
     * https://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
     */    
    $sceDelegateProvider.resourceUrlWhitelist(whitelist);
    $sceDelegateProvider.resourceUrlBlacklist(blacklist);
}

angular
    .module('app')
    .config(Domains);

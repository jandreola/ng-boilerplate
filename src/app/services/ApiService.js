/**
 * Api service is responsible for communicating with
 * backend resources using json
 */
function ApiService($resource, $rootScope, API_URL){

    var api = $resource(
        /* Map our api url structure
         * Ex: /teams/2/players/3, where /team would be
         * the resource with all teams, /2 is the team id
         * to get more info, /players is a nested resource from
         * teams with all players in that team and /3 is the
         * player id to get or post info.
         */
        API_URL + '/:action/:id/:item/:item_id',
        { 
            /* default query attributes goes here ex: language: 'en' */
        },
        {
            /* available http methods to that resource */
            get: {method: 'JSONP', params: {callback: 'JSON_CALLBACK'}},
            post: {method: 'POST'},
            put: {method: 'PUT'}
            /* Delete method is also available, not need to declare it here */
        }
    );

    return api;

}

angular
    .module('app')
    .factory('ApiService', ApiService);

/*
 * The following service dispatch events when an
 * ajax request is sent and when its response is received
 * This can be used to display a loading spinner on screen
 */
function LoadingSpinnerService($q, $rootScope){
    var numLoadings = 0;

    // Array to hold timeouts' id
    var timing = [];

    return {
        'request': request,
        'response': responseFn,
        'responseError': responseError
    };

    function request(config){
        numLoadings++;

        // Show loader
        if(numLoadings <= 1) {

            // Create a timeout and assign the id into
            // timing array
            timing[numLoadings] = setTimeout(function(){
                $rootScope.$broadcast("loader_show");
            }, 200);
        }

        return config || $q.when(config);
    }

    function responseFn(response) {

        /*
         * If the response comes before the specified
         * time in the timeout function this will
         * clear that timeout avoiding it to happen.
         * This is to avoid displaying a loader for
         * requests that take less than 200ms
         */
        clearTimeout(timing[numLoadings]);


        if ((--numLoadings) === 0) {
            // Hide loader
            $rootScope.$broadcast("loader_hide");
        }

        return response || $q.when(response);
    }

    function responseError(response){
        if (!(--numLoadings)) {

            // Hide loader
            $rootScope.$broadcast("loader_hide");
        }

        return $q.reject(response);
    }
}

angular
    .module('app')
    .factory('LoadingSpinnerService', LoadingSpinnerService);

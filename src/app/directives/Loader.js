/**
 * This directive must be used as an attribute
 *                                        |
 *                                        V
 * Ex: <img src="MY_SPINNING_ICON.gif" loader/>
 */
function Loader($rootScope) {
    return function ($scope, element, attrs) {
        $scope.$on("loader_show", function () {
            return $(element).fadeIn(600);
        });
        return $scope.$on("loader_hide", function () {
            return $(element).fadeOut(600);
        });
    };
}

angular
    .module('app')
    .directive('loader', Loader);

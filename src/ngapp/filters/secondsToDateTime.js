'strict mode';

module.exports = function($sce){
    'ngInject';

    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
};

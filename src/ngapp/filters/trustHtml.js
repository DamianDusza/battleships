'strict mode';

module.exports = function($sce){
    'ngInject';

    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    };
};

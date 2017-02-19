'strict mode';

module.exports = function () {
    'ngInject';

    return function (object) {
        var count = 0;

        for (var i in object) {
            count++;
        }
        return count;
    }
};
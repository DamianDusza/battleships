'strict mode';

export default function config(
    $locationProvider,
    $stateProvider,
    $urlRouterProvider,
    $qProvider,
    localStorageServiceProvider,
    $compileProvider
) {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
    $qProvider.errorOnUnhandledRejections(false);
    $urlRouterProvider.otherwise("/");
    $compileProvider.debugInfoEnabled(false);
    localStorageServiceProvider.setPrefix('battleships');

    $stateProvider
        .state({
            name : 'menu',
            url: '/',
            template: '<menu-container></menu-container>'
        })
        .state({
            name : 'prepare',
            url: '/prepare',
            template: '<prepare-container></prepare-container>'
        })
        .state({
            name : 'game',
            url: '/game',
            template: '<game-container></game-container>'
        })
};
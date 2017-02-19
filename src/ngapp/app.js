'strict mode';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import animateCss from 'animate.css/animate.css';
import localStorage from 'angular-local-storage';

import appConfig from './app.config';
import appRun from './app.run';

import '../theme/styles/core.less';

import { spinner } from './components/layout/spinner/comp';

import { UserService } from './services/user';
import { GameService } from './services/game';

import { menuContainer } from './containers/menu/comp';
import { prepareContainer } from './containers/prepare/comp';
import { gameContainer } from './containers/game/comp';

import { startForm } from './components/startForm/comp';
import { prepare } from './components/prepare/comp';
import { game } from './components/game/comp';


angular.module('App', [
    uirouter,
    localStorage
])
    .config(appConfig)
    .run(appRun)

    .service('UserService', UserService)
    .service('GameService', GameService)

    .component('spinner', spinner)
    .component('menuContainer', menuContainer)
    .component('startForm', startForm)
    .component('prepareContainer', prepareContainer)
    .component('prepare', prepare)
    .component('gameContainer', gameContainer)
    .component('game', game)
    


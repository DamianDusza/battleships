'strict mode';

import styles from './styles.less';
import partial from './tpl.html';

export let gameContainer = {
    template: partial,
    transclude: true,
    controller: class GameContainerCtrl {
        constructor() {
            'ngInject';

        }
    }
};
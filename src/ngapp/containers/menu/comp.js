'strict mode';

import styles from './styles.less';
import partial from './tpl.html';

export let menuContainer = {
    template: partial,
    transclude: true,
    controller: class menuContainerCtrl {
        constructor() {
            'ngInject';

        }
    }
};
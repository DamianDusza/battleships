'strict mode';

import styles from './styles.less';
import partial from './tpl.html';

export let prepareContainer = {
    template: partial,
    transclude: true,
    controller: class PrepareContainerCtrl {
        constructor() {
            'ngInject';

        }
    }
};
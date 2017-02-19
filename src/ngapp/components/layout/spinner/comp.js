'strict mode';

import styles from './styles.less';
import partial from './tpl.html';

export let spinner = {
    template: partial,
    controller: class SpinnerCtrl {
    }
};
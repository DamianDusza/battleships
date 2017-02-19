'strict mode';

import styles from './styles.less';
import partial from './tpl.html';

/**
 * startForm Component
 * @namespace Components
 */
export let startForm = {
    template: partial,
    transclude: true,
    controller: class StartFormCtrl {

        constructor(UserService, $state) {
            'ngInject';

            this.UserService = UserService;
            this.$state = $state;
        }

        $onInit() {}

        /**
         * @name submit
         * @desc Submit user form
         * @param {$valid} boolean form valid status
         * @returns {void}
         */
        submit($valid) {
            if (!$valid) {
                return false;
            }

            this.UserService.setUserName(this.userName);
            this.$state.go('prepare');
        }
    }
};
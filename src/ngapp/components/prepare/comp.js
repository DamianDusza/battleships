'strict mode';

import styles from './styles.less';
import partial from './tpl.html';

/**
 * prepare Component
 * @namespace Components
 */
export let prepare = {
    template: partial,
    transclude: true,
    controller: class PrepareCtrl {
        constructor(UserService, GameService, $state) {
            'ngInject';

            this.UserService = UserService;
            this.GameService = GameService;
            this.$state = $state;
        }

        $onInit() {
            this.getUserName();
            this.getGameConfig();
        }

        /**
         * @name getUserName
         * @desc fetch user name from UserService, redirect to menu if user name doesn't exists
         * @returns {void}
         */
        getUserName() {
            this.userName = this.UserService.getUserName()
            if (!this.userName) {
                this.$state.go('menu');
            }
        }

        /**
         * @name getGameConfig
         * @desc fetch game config from GameService
         * @returns {void}
         */
        getGameConfig() {
            this.config = this.GameService.getConfig(true);
            this.grid = JSON.parse(JSON.stringify(this.config.grid.array));
            this.ships = JSON.parse(JSON.stringify(this.config.ships));
        }

        /**
         * @name placeShipStart
         * @desc choose ship to place from ships object
         * @param {integer} shipIndex key in ships object
         * @returns {void}
         */
        placeShipStart(shipIndex) {
            let ship = this.ships[shipIndex];

            if (ship.amount > 0) {
                this.activeShip = ship;
                this.activeShip.index = shipIndex;
            }
        }

        /**
         * @name showShipPlacement
         * @desc validates ship placement
         * @param {string} rowKey row key
         * @param {integer} cellKey cell key
         * @returns {boolean} result
         */
        validateShipPlacement(rowKey, cellKey) {
            if (typeof this.activeShip != 'undefined' && this.activeShip) {
                this.activeShip.error = this.isPlacementTaken(rowKey, cellKey, this.activeShip.size);

                return this.activeShip.error;
            }
        }

        /**
         * @name placeShipEnd
         * @desc place ships on chosen position
         * @param {string} rowKey row key
         * @param {integer} cellKey cell key
         * @returns {void}
         */
        placeShipEnd(rowKey, cellKey) {
            if (typeof this.activeShip != 'undefined' && this.activeShip) {
                if (!this.isPlacementTaken(rowKey, cellKey, this.activeShip.size, true)) {
                    this.ships[this.activeShip.index].amount = this.ships[this.activeShip.index].amount - 1;
                    this.activeShip = false;

                    this.clearBoard();

                    if (!this.isAnyShipLeft()) {
                        this.config.userGrid = this.grid;
                        this.GameService.setConfig(this.config);

                        this.ready = true;
                    }
                }
            }
        }

        /**
         * @name isPlacementTaken
         * @desc validates if ship can be placed on chosen position
         * @param {string} rowKey  row key
         * @param {integer} cellKey  cell key
         * @param {integer} size ship cell size
         * @param {place} boolean if true ship wiil be placed :optional, default: false
         * @returns {boolean} result
         */
        isPlacementTaken(rowKey, cellKey, size, place = false) {
            this.clearBoard();
            cellKey = parseInt(cellKey);

            let startCell = cellKey;
            let endCell = cellKey + size;
            let grid = this.grid;

            for (let i = startCell; i < endCell; i++) {
                if (typeof (grid[rowKey][i]) != 'undefined') {
                    if (grid[rowKey][i].taken == true) {
                        return true;
                    }
                    grid[rowKey][i].active = true;
                } else {
                    return true;
                }
            }

            if (typeof place != 'undefined' && place) {
                for (let i = startCell; i < endCell; i++) {
                    grid[rowKey][i].taken = true;
                }
            }

            return false;
        }

         /**
         * @name isAnyShipLeft
         * @desc check if any free ship has left
         * @returns {boolean} result
         */
        isAnyShipLeft() {
            let response = false;
            angular.forEach(this.ships, function (ship, index) {
                if (ship.amount > 0) {
                    response = true;
                }
            });

            return response;
        }

        /**
         * @name clearBoard
         * @desc clear every inactive cell on grid
         * @returns {void}
         */
        clearBoard() {
            let grid = this.grid;

            angular.forEach(grid, function (elem, row) {
                angular.forEach(grid[row], function (elem, cell) {
                    grid[row][cell].active = false;
                });
            });
        }
    }
};
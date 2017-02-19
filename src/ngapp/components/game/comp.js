'strict mode';

import styles from './styles.less';
import partial from './tpl.html';

export let game = {
    template: partial,
    transclude: true,
    controller: class GameCtrl {
        constructor(UserService, GameService, $state, $timeout) {
            'ngInject';

            this.UserService = UserService;
            this.GameService = GameService;
            this.$state = $state;
            this.$timeout = $timeout;
            this.isUserTurn = true;
            this.strikeCount = 0;
            this.totalPoints = 0;
            this.userPoints = 0;
            this.aiPoints = 0;
        }

        $onInit() {
            this.getUserName();
            this.getGameConfig();

            let totalPoints = this.totalPoints;
            angular.forEach(this.config.ships, function(ship, index){
                totalPoints = totalPoints + (ship.size * ship.amount)
            });
            this.totalPoints = totalPoints;

            let allPlaced = false;
            while (allPlaced == false) {
                let randRow = Math.floor(Math.random() * this.config.grid.h.length);
                let randCell = Math.floor(Math.random() * this.config.grid.v.length);
                let row = this.config.grid.h[randRow];
                let cell = this.config.grid.v[randCell];

                let nextShip = this.getNextShipToPlace();
                if (nextShip) {
                    if (!this.isPlacementTaken(row, cell, nextShip.size, true)) {
                        this.config.ships[nextShip.index].amount = this.config.ships[nextShip.index].amount - 1;
                    }
                } else {
                    allPlaced = true;
                }
            }
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
            this.config = this.GameService.getConfig();
            this.userGrid = this.config.userGrid;
            this.aiGrid = JSON.parse(JSON.stringify(this.config.grid.array));
        }

         /**
         * @name getNextShipToPlace
         * @desc return next free ship to be placed
         * @returns {object} ship object
         */
        getNextShipToPlace() {
            let output = false;
            angular.forEach(this.config.ships, function (ship, index) {
                if (ship.amount > 0) {
                    ship.index = index;
                    output = ship;
                }
            });

            return output;
        }

        /**
         * @name shoot
         * @desc check if user target is successfull or not and manage turn
         * @param {string} rowKey row key
         * @param {integer} cellKey cell key
         * @returns {void}
         */
        shoot(rowKey, cellKey) {
            if (this.isUserTurn) {
                let grid = this.aiGrid;
                let target = grid[rowKey][cellKey];
                
                if (target.taken && !target.shoot) {
                    this.userStrikeCount = this.userStrikeCount + 1;
                    this.userPoints = this.userPoints + 1;
                } else {
                    this.aiTurn();
                }

                target.shoot = true;

                this.isEnd();
            }
        }

        /**
         * @name aiTurn
         * @desc choose next target and shoot
         * @returns {void}
         */
        aiTurn() {
            self = this;
            self.isUserTurn = false;
            self.strikeCount = 0;

            let shoot = true;
            let target = {};
            while (shoot == true) {
                let grid = self.userGrid;
                let randRow = Math.floor(Math.random() * self.config.grid.h.length);
                let randCell = Math.floor(Math.random() * self.config.grid.v.length);
                let row = self.config.grid.h[randRow];
                let cell = self.config.grid.v[randCell];
                target = grid[row][cell];
                if (target.shoot == false) {
                    shoot = false;
                }
            }


            self.$timeout(function () {
                if (target.taken && !target.shoot) {
                    self.strikeCount = self.strikeCount + 1;
                    self.aiPoints = self.aiPoints + 1;
                    self.aiTurn();
                } else {
                    self.$timeout(function () {
                        self.userTurn();
                    }, 800)
                }

                target.shoot = true;
            }, 800)

            this.isEnd();
        }

        /**
         * @name userTurn
         * @desc reset settings for user turn
         * @returns {void}
         */
        userTurn() {
            this.isUserTurn = true;
            this.strikeCount = 0;
        }


        /**
         * @name isEnd
         * @desc check if any ships has left and set endState
         * @returns {void}
         */
        isEnd() {
            if(this.aiPoints >= this.totalPoints){
                this.endState = 'loose';
            }else if(this.userPoints >= this.totalPoints){
                this.endState = 'won';
            }
        }


        /**
         * @name isPlacementTaken
         * @desc check if grid cell is taken or free
         * @returns {void}
         */
        isPlacementTaken(rowKey, cellKey, size, place) {
            let startCell = parseInt(cellKey);
            let endCell = cellKey + size;
            let grid = this.aiGrid;

            for (let i = startCell; i < endCell; i++) {
                if (typeof (grid[rowKey][i]) != 'undefined') {
                    if (grid[rowKey][i].taken == true) {
                        return true;
                    }
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
    }
};
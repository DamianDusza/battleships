'strict mode';

export class GameService {

    constructor(localStorageService) {
        'ngInject'

        this.localStorageService = localStorageService;

        this.config = {
            grid: {
                array : [],
                size: 50,
                h: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                v: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            },
            ships: [{
                amount: 1,
                name: 'Battleship',
                size: 4
            }, {
                amount: 2,
                name: 'Cruiser',
                size: 3
            }, {
                amount: 3,
                name: 'Destroyer',
                size: 2
            }, {
                amount: 4,
                name: 'Submarine',
                size: 1
            }]
        };

        this.setGrid();
    }

    /**
     * @name setGrid
     * @desc build grid Array based on config
     * @returns {void}
     */
    setGrid() {
        let hGrid = this.config.grid.h;
        let vGrid = this.config.grid.v;
        let gridArray = {};

        hGrid.forEach(function (row, index) {
            gridArray[row] = {}
            vGrid.forEach(function (cell, index) {
                gridArray[row][cell] = {
                    taken: false,
                    shoot: false
                }
            });
        });

        this.config.grid.array = gridArray;
    }

    /**
     * @name setConfig
     * @desc save config to localStorage
     * @param {object} config object
     * @returns {void}
     */
    setConfig(config){
        this.localStorageService.set('gameConfig', config);
    }
    
    /**
     * @name getConfig
     * @desc save config to localStorage
     * @param {boolean} if true then new clear config will be returned
     * @returns {object} config object
     */
    getConfig(newConfig) {
        if(typeof newConfig != 'undefined' && newConfig){
            return this.config;
        }else{
            let config = this.localStorageService.get('gameConfig');
            return config ? config : this.config;
        }
    }
}
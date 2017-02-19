'strict mode';

export class UserService {
    
    constructor(localStorageService) {
        'ngInject'

        this.localStorageService = localStorageService;
    }

    /**
     * @name setUserName
     * @desc save user name to localStorage
     * @param {string} user name
     * @returns {void}
     */
    setUserName(userName){
        this.localStorageService.set('userName', userName);
    }

    /**
     * @name getUserName
     * @desc return user name from localStorage
     * @returns {string} user name
     */
    getUserName(){
        return this.localStorageService.get('userName');
    }
}
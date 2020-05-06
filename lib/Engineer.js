const Engineer = require("./Engineer.js");

class Enginn extends Employee{

    constructor(name, id, email, officeNumber){
        super(name,id,email);
        this.officeNumber = officeNumber;
    }

    getRole(){
        return "Manager"
    }

    getOfficeNumber(){
        return this.officeNumber;
    }


}

module.exports = Manager;
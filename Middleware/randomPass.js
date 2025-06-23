

const randomPass=()=>{

    let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&*';

    let strLength = string.length;
    let mypass = "";

    for(var i=0; i<7; i++){
            let myPosi = Math.floor(Math.random()*strLength);
            mypass+=string.charAt(myPosi);
    }
    return mypass;
}

module.exports=randomPass;
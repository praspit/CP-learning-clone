export function valid_name(name) {
    //can contain only letters, numbers, and underscores
    //must start with a letter
    //must be at least 3 characters long
    //must be at most 20 characters long
    return /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(name);
}

export function generate_tag() {
    // generate 4 digit code
    let code = Math.floor(Math.random() * 10000);
    if(code >= 100 && code < 1000){
        return '0' + code.toString()
    }else if(code >= 10 && code < 100){
        return '00' + code.toString()
    }else if(code >= 0 && code < 10){
        return '000' + code.toString()
    }
    return code.toString()
}

export function valid_tag(tag) {
    // is the string all numbers?
    return /^[0-9]{4}$/.test(tag) && tag.length == 4;
}
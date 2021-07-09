
const getSmartyStreetsCodeMessage = (matchCode) => {
    switch(matchCode) {
        case 'D':
            return 'Address found, but secondary address is needed (apartment, suite, box number) to match a specific address.';
        default:
            return '';
    }
}

const getUspsCodeMessage = (matchCode) => {
    if(matchCode.indexOf('H') !== -1) {
        return 'Address found, but secondary address is needed (apartment, suite, box number) to match a specific address.';
    }

    return '';
}

export {
    getSmartyStreetsCodeMessage,
    getUspsCodeMessage
}
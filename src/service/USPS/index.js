
import { addressToXml, xmlToAddress } from '../../helpers/xmlHelper';
import axios from 'axios';

const validateUsAddress = async (address, callback) => {
    let xmlString = addressToXml(address);

    if(!xmlString) {
        callback();
        return;
    }

    let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${xmlString}`;

    try {
        let result = await axios.get(url);

        console.log(result);
        callback(xmlToAddress(result.data));
    } catch(error) {
        console.error(error);
    }
}

export {
    validateUsAddress
}
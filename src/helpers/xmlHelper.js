
import * as parser from 'parse-address';
import credentials from '../data/credentials';
import { getUspsCodeMessage } from '../helpers/matchCode';

const buildAddress1 = (parsedAddress) => {
    let address1 = "";

    if(parsedAddress.sec_unit_num) { address1 += parsedAddress.sec_unit_num; }
    if(parsedAddress.sec_unit_type) { address1 += " " + parsedAddress.sec_unit_type; }

    return address1;
}

const buildAddress2 = (parsedAddress) => {
    let address2 = ""

    address2 += (parsedAddress.number) ? parsedAddress.number : "";
    address2 += (parsedAddress.prefix) ? " " + parsedAddress.prefix : "";
    address2 += (parsedAddress.street) ? " " + parsedAddress.street : "";
    address2 += (parsedAddress.type) ? " " + parsedAddress.type : "";

    return address2;
}

const addressToXml = (addressStr) => {
    const parsedAddress = parser.parseLocation(addressStr);

    if(!parsedAddress) { return; }

    console.log(parsedAddress);

    let xmlString = `<AddressValidateRequest USERID="${credentials.usps}">` +
                        '<Revision>1</Revision>' +
                        '<Address ID="0">' +
                            `<Address1>${buildAddress1(parsedAddress)}</Address1>` +
                            `<Address2>${buildAddress2(parsedAddress)}</Address2>` +
                            `<City>${(parsedAddress.city) ? parsedAddress.city : ""}</City>` +
                            `<State>${(parsedAddress.state) ? parsedAddress.state : ""}</State>` +
                            `<Zip5>${(parsedAddress.zip) ? parsedAddress.zip : ""}</Zip5>` +
                            `<Zip4>${(parsedAddress.plus4) ? parsedAddress.plus4 : ""}</Zip4>` +
                        '</Address>' +
                    '</AddressValidateRequest>';
                            
    console.log(xmlString);

    return xmlString;
}

const xmlToAddress = (xmlString) => {
    let domparser = new DOMParser();
    let xml = domparser.parseFromString(xmlString, 'text/xml');

    console.log(xml);

    // check for errors
    let error = xml.getElementsByTagName('Error');
    if(error && error.length > 0) {
        let errorDescription = error[0].getElementsByTagName('Description')[0].innerHTML;
        return {
            'error': true,
            'description': errorDescription
        };
    }

    let address = "";
    
    if(xml.getElementsByTagName('Footnotes').length > 0) { address += `${getUspsCodeMessage(xml.getElementsByTagName('Footnotes')[0].innerHTML)}\n`}
    if(xml.getElementsByTagName('Address2').length > 0) { address += `${xml.getElementsByTagName('Address2')[0].innerHTML} `; }
    if(xml.getElementsByTagName('Address1').length > 0) { address += `${xml.getElementsByTagName('Address1')[0].innerHTML} `; }
    if(xml.getElementsByTagName('City').length > 0) { address += `${xml.getElementsByTagName('City')[0].innerHTML} `; }
    if(xml.getElementsByTagName('State').length > 0) { address += `${xml.getElementsByTagName('State')[0].innerHTML} `; }
    if(xml.getElementsByTagName('Zip5').length > 0) { address += `${xml.getElementsByTagName('Zip5')[0].innerHTML}-`; }
    if(xml.getElementsByTagName('Zip4').length > 0) { address += `${xml.getElementsByTagName('Zip4')[0].innerHTML}`; }

    return [address];
} 

export {
    addressToXml,
    xmlToAddress
}
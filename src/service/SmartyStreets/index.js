
import * as SmartyStreetsSDK from "smartystreets-javascript-sdk";
import mockData from '../../data/mockData';
import credentials from "../../data/credentials";

const getSuggestions = (address, callback) => {
    const SmartyStreetsCore = SmartyStreetsSDK.core;
    const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

    let authId = credentials.smartyStreets.authId;
    let authToken = credentials.smartyStreets.authToken;
    const creds = new SmartyStreetsCore.StaticCredentials(authId, authToken);

    let clientBuilder = new SmartyStreetsCore.ClientBuilder(creds);
    let client = clientBuilder.buildUsAutocompleteClient();

    let lookup = new Lookup(address);

    // client.send(lookup)
    //     .then((response) => {
    //         console.log(response);
    //         callback(response.result);
    //     })
    //     .catch(console.log);


    console.log("Mock data from SmartyStreets getSuggestions service: ", mockData);
    callback(mockData.result);
}

const validateUsAddress = (address, callback) => {
    const SmartyStreetsCore = SmartyStreetsSDK.core;
    const Lookup = SmartyStreetsSDK.usStreet.Lookup;

    let authId = credentials.smartyStreets.authId;
    let authToken = credentials.smartyStreets.authToken;
    const creds = new SmartyStreetsCore.StaticCredentials(authId, authToken);

    let clientBuilder = new SmartyStreetsCore.ClientBuilder(creds);
    let client = clientBuilder.buildUsStreetApiClient();

    let lookup = new Lookup(address);

    console.log(lookup);

    client.send(lookup)
        .then((response) => {
            console.log(response);
            callback(response.lookups[0].result);
        })
        .catch(console.log);
}


export { 
    getSuggestions,
    validateUsAddress
};

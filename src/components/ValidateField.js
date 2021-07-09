import React from 'react';
import * as SmartyStreetsService from '../service/SmartyStreets';
import * as UspsService from '../service/USPS';
import { getSmartyStreetsCodeMessage } from '../helpers/matchCode';

const validateUsingSmartyStreets = (address, addressPaneId) => {
    SmartyStreetsService.validateUsAddress(address, (result) => {
        console.log("Validate address result: ", result);
        const addressPane = document.getElementById(addressPaneId);

        if(!result || result.length === 0) {
            addressPane.innerText = "Invalid address";
        } else {
            addressPane.innerText = "Suggested address(es):";

            let list = document.createElement("ul");
            list.className = "list-unstyled";

            for(let i = 0; i < result.length; i++) {
                let listItem = document.createElement("li");
                listItem.innerText = `${getSmartyStreetsCodeMessage(result[i].analysis.dpvMatchCode)}\n${result[i].deliveryLine1} ${result[i].lastLine}`;

                list.appendChild(listItem);
            }

            addressPane.appendChild(list);
        }
               
        addressPane.style.display = "block";
    });
}

const validateUsingUsps = (address, addressPaneId) => {
    UspsService.validateUsAddress(address, (result) => {
        const addressPane = document.getElementById(addressPaneId);

        if(!result) {
            addressPane.innerText = "Invalid Address";
        }
        else if(result.error) {
            addressPane.innerText = result.description;
        } else {
            addressPane.innerText = "Suggested address(es):";

            let list = document.createElement("ul");
            list.className = "list-unstyled";

            for(let i = 0; i < result.length; i++) {
                let listItem = document.createElement("li");
                listItem.innerText = result[i];

                list.appendChild(listItem);
            }

            addressPane.appendChild(list);
        }

        addressPane.style.display = "block";
    });
}

const ValidateField = ({service}) => {
    const inputId = "address-text-field-" + Math.floor(Math.random() * 10000);
    const addressPaneId = "address-pane-" + Math.floor(Math.random() * 10000);

    const validateAddress = () => {
        const addressField = document.getElementById(inputId);
        const address = addressField.value;
        console.log("service: ", service);
        console.log("Validating address: ", address);

        if(!address) {
            return;
        }

        if(service === "smartyStreets") {
            validateUsingSmartyStreets(address, addressPaneId);
        } else if(service === "usps") {
            validateUsingUsps(address, addressPaneId);
        }
    }

    return (
        <div className="input">
            <input className="form-control" id={inputId} placeholder="Address"></input>
            <button 
                type="button"
                className="btn btn-light validate-btn"
                onClick={e => {
                    e.preventDefault();
                    validateAddress();
                }}>Validate Address</button>
            <div id={addressPaneId} className="addressPane"></div>
        </div>
    )
}

export default ValidateField


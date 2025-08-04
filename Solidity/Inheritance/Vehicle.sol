
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Vehicle {
    string public  brand;

    constructor(string memory _brand) {
        brand = _brand;
    }

    function description() public virtual  returns (string memory){
        return "This is a vehicle";
    }
}
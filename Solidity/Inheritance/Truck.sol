
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Vehicle.sol";

contract Truck is Vehicle {
    uint numWheels;

    constructor(string memory _brand, uint _numWheels) Vehicle(_brand) {
        numWheels = _numWheels;
    }

    function description() public pure override  returns (string memory) {
        return "Hi I am a car";
    }
}
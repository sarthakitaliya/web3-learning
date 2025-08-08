// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeETH is Ownable {

    constructor() Ownable(msg.sender) {}

    function mint(uint256 amount) public {
        payable(msg.sender).transfer(amount);
    }

    function burnedOnOtherSide(uint256 amount) public {
    }

    function depositHappendOnOtherSide() public {
        // Function to accept ETH deposits
    }
}
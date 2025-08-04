// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Money {
    uint public  toatalMoney;

    function deposite() public payable {
        toatalMoney += msg.value;
    }

    function drain(address payable  ad) public {
        payable(ad).transfer(toatalMoney);
        toatalMoney = 0;
    }
}
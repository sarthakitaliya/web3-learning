// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SerCoin is ERC20{

    address stackingContract;
    address owner;

    constructor(address _stackingContract) ERC20("SerCoin","SER") {
        stackingContract = _stackingContract;
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public{
        require(msg.sender == stackingContract);
        _mint(to, amount);
    }

    function updateStakingContract(address add) public {
        require(msg.sender == stackingContract);
        stackingContract = add;
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LockUSDT {
    address public usdtAddress;
    mapping(address => uint256) public lockedBalances;  

    constructor(address _usdtAddress) {
        usdtAddress = _usdtAddress;
    }
    
    function deposit(uint256 amount) public {
        require(IERC20(usdtAddress).allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        IERC20(usdtAddress).transferFrom(msg.sender, address(this), amount);
        lockedBalances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {
        require(lockedBalances[msg.sender] >= amount, "Insufficient locked balance");
        lockedBalances[msg.sender] -= amount;
        IERC20(usdtAddress).transfer(msg.sender, amount);
    }
}

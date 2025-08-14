// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract StakingContract {
    mapping(address => uint) public balances;
    mapping(address => uint) public unclaimedRewards;
    mapping(address => uint) public lastUpdateTime;
    mapping(address => uint) public rewards;
    address SerCoin;

    function stake() public payable {
        require(msg.value > 0);
        if (lastUpdateTime[msg.sender] == 0) {
            lastUpdateTime[msg.sender] = block.timestamp;
        } else {
            unclaimedRewards[msg.sender] =
                (block.timestamp - lastUpdateTime[msg.sender]) *
                balances[msg.sender];
            lastUpdateTime[msg.sender] = block.timestamp;
        }
        balances[msg.sender] += msg.value;

        // SerCoin.delegatecall(abi.encodeWithSignature("mint(address, uint256)", "msg.sender, msg.value / 2"));
        unclaimedRewards[msg.sender] += msg.value / 2;
    }

    function unstake(uint256 amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance");

        unclaimedRewards[msg.sender] =
            (block.timestamp - lastUpdateTime[msg.sender]) *
            balances[msg.sender];
        lastUpdateTime[msg.sender] = block.timestamp;

        // payable(msg.sender).transfer(amount);
        balances[msg.sender] -= amount;
    }

    function claimReward() public payable {
        // uint currentReward = unclaimedRewards[_address];
        uint updateTime = lastUpdateTime[msg.sender];
        uint newReward = (block.timestamp - updateTime) * balances[msg.sender];
        unclaimedRewards[msg.sender] += newReward;
    
        //transfer coin

        unclaimedRewards[msg.sender] = 0;
        lastUpdateTime[msg.sender] = block.timestamp;
    }

    function getRewards(address _address) public view returns (uint256) {
        uint currentReward = unclaimedRewards[_address];
        uint updateTime = lastUpdateTime[_address];
        uint newReward = (block.timestamp - updateTime) * balances[_address];
        return currentReward + newReward;
    }

    function balanceOf(address _address) public view returns (uint256) {
        return balances[_address];
    }
}

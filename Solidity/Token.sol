
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    address public owner;
    mapping ( address => uint ) public balances;
    mapping (address => mapping (address => uint)) public allowances;
    uint256 public totalSupply;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function approve(address _spender, uint256 amount) public returns (bool success){
        allowances[msg.sender][_spender] = amount;
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
        uint allowance = allowances[_from][msg.sender];
        require(allowance >= _value);

        uint balance = balances[_from];
        require(balance >= _value);

        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;

        return  true;
    } 

    //mint
    function mint(address to, uint256 amount) public onlyOwner {
        balances[to] += amount;
        totalSupply += amount;
    }

    function mintTo(uint amount, address to) public onlyOwner {
        balances[to] += amount;
        totalSupply += amount;
    }
    
    //burn
    function burn(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
    }
    //transfer
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
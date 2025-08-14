// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/SerCoin.sol"; 

contract TestContract is Test {
    SerCoin s;

    function setUp() public {
        s = new SerCoin(address(this));
    }

    function testInitialSupply() public view {
        assert(s.totalSupply() == 0);
    }
    
    function test_RevertWhen_MintFails() public {
        vm.startPrank(0x47DeD6E23B210a8178101E69176801DC17aACEAe);

        vm.expectRevert();
        s.mint(0x47DeD6E23B210a8178101E69176801DC17aACEAe, 100);
    }

    function testMint() public {
        s.mint(0x47DeD6E23B210a8178101E69176801DC17aACEAe, 100);
        assert(s.balanceOf(0x47DeD6E23B210a8178101E69176801DC17aACEAe) == 100);
    }

    function testChangeStackingContract() public{
        s.updateStakingContract(0x47DeD6E23B210a8178101E69176801DC17aACEAe);
        vm.startPrank(0x47DeD6E23B210a8178101E69176801DC17aACEAe);
        s.mint(0x47DeD6E23B210a8178101E69176801DC17aACEAe, 100);

        assert(s.balanceOf(0x47DeD6E23B210a8178101E69176801DC17aACEAe) == 100);
    }
}

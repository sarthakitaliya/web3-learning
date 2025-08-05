// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/SerCoin.sol";

contract TestSerCoin is Test {
    SerCoin c;
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function setUp() public {
        c = new SerCoin();
    }

    function  testMint() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "Minting failed");
        assertEq(c.balanceOf(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F), 0, "Minting failed");

        c.mint(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 50);
        assertEq(c.balanceOf(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F), 50, "Minting failed");
    }

    function testTransfer() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "Minting failed");

        vm.expectEmit(true, true, false, true);
        emit Transfer(address(this), 0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 50);

        c.transfer(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 50);
        assertEq(c.balanceOf(address(this)), 50, "Transfer failed");
        assertEq(c.balanceOf(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F), 50, "Transfer failed");

        // changing the sender to the contract address
        // to simulate a transfer from another address
        vm.prank(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F);
        c.transfer(address(this), 50);
        assertEq(c.balanceOf(address(this)), 100, "Transfer back failed");
        assertEq(c.balanceOf(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F), 0, "Transfer back failed");
    }

    function testApprove() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "Minting failed");
        
        vm.expectEmit(true, true, false, true);
        emit Approval(address(this), 0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 50);

        c.approve(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 50);
        assertEq(c.allowance(address(this), 0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F), 50, "Approval failed");

        vm.prank(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F);
        c.transferFrom(address(this), 0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 10);
        assertEq(c.balanceOf(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F), 10, "Transfer from approved address failed");
        assertEq(c.balanceOf(address(this)), 90, "Transfer from approved address failed");
    }

    function test_RevertWhen_TransferExceedsApproval() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "Minting failed");
        c.approve(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 50);

        vm.prank(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F);
        vm.expectRevert();
        c.transferFrom(address(this), 0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 60);
    }
    
    function test_RevertWhen_TransferExceedsBalance() public {
        c.mint(address(this), 100);
        assertEq(c.balanceOf(address(this)), 100, "Minting failed");

        vm.expectRevert();
        c.transfer(0x90591fceCa4335B88Ca82fA3402dE21Ff94f6E7F, 200);
    }
}

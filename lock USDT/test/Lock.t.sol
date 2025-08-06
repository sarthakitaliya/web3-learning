// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/USDT.sol";
import "../src/LockUSDT.sol";

contract TestContract is Test {
    USDT usdt;
    LockUSDT lockUSDT;

    function setUp() public {
        usdt = new USDT();
        lockUSDT = new LockUSDT(address(usdt));
    }

    function testDepositndWithdraw() public{
        usdt.mint(0x2966473D85A76A190697B5b9b66b769436EFE8e5, 200);
        vm.startPrank(0x2966473D85A76A190697B5b9b66b769436EFE8e5);
        usdt.approve(address(lockUSDT), 200);

        lockUSDT.deposit(200);
        assertEq(usdt.balanceOf(0x2966473D85A76A190697B5b9b66b769436EFE8e5), 0);
        assertEq(usdt.balanceOf(address(lockUSDT)), 200);

        lockUSDT.withdraw(100);

        assertEq(usdt.balanceOf(0x2966473D85A76A190697B5b9b66b769436EFE8e5), 100);
        assertEq(usdt.balanceOf(address(lockUSDT)), 100);
    }
}

    
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/Staking.sol";

contract TestContract is Test {
    StakingContract s;

    function setUp() public {
        s = new StakingContract();
    }

    function testStake() public {
        s.stake{value: 200}();
        assert(s.balanceOf(address(this)) == 200);
    }

    function testUnstake() public {
        s.stake{value: 200}();
        s.unstake(100);
        assert(s.balanceOf(address(this)) == 100);
    }

    function test_RevertWhen_UnstakeFail() public {
        s.stake{value: 200}();
        vm.expectRevert();
        s.unstake(300);
    }
}

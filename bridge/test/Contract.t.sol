// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/WHino.sol";

contract TestContract is Test {
    WHino c;

    function setUp() public {
        c = new WHino();
    }
}

// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// import openzeppelin contracts
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// create a contract for the token with name IsraelToken and symbol ISL
contract IsraelToen is ERC20 {
    constructor() ERC20("IsraelToken", "ISL") {
        _mint(msg.sender, 1000000000000000000);
    }
}


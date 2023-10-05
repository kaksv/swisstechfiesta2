// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Storage {
    uint256 private data;

    constructor(uint256 initialData) {
        data = initialData;
        
    }

    function setData(uint256 newValue) public {
        data = newValue;
        
    }

    function getData() public view returns (uint256) {
        return data;
    }
}
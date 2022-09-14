/**
 *Submitted for verification at BscScan.com on 2022-09-14
 */

/**
 *Submitted for verification at BscScan.com on 2022-09-13
 */

pragma solidity ^0.8.2;

import "hardhat/console.sol";

contract Token {
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowance;
    uint public totalSupply = 1000000000 * 10**18;
    string public name = "MAYLO";
    string public symbol = "MAYLO";
    uint public decimals = 18;
    address public owner;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function balanceOf(address owner) public returns (uint) {
        console.log("owner: ", owner, "balances[owner]", balances[owner]);
        return balances[owner];
    }

    function transfer(address to, uint value) public returns (bool) {
        require(balanceOf(msg.sender) >= value, "balance too low");
        balances[to] += value;
        balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint value
    ) public returns (bool) {
        require(balanceOf(from) >= value, "balance too low");
        /* console.log(
            "allowance[from][msg.sender] = ",
            allowance[from][msg.sender]
        );
        console.log("Value = ", value); */
        require(allowance[from][msg.sender] >= value, "allowance too low");
        balances[to] += value;
        balances[from] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        /* console.log(
            "allowance[msg.sender][spender] = ",
            allowance[msg.sender][spender]
        ); */
        emit Approval(msg.sender, spender, value);
        return true;
    }
}

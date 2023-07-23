// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract YieldNftTokenLock {
    IERC20 public token;
    address public _admin;

    event TokensTransferred(address indexed to, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == _admin, "Only admin can call this function");
        _;
    }

    constructor() {
        token = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
        _admin = 0x01Fc1c8905FFE1BbBCDF8Cf30CEb68D3Dd4DBb65;
    }

    function setAdmin(address adminAddress) external onlyAdmin {
        _admin = adminAddress;
    }


    function relinquishOwnership() external onlyAdmin {
        _admin = address(0);
    }


    function transferTokens(address _to, uint256 _amount) external onlyAdmin {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount must be greater than zero");

        require(token.transfer(_to, _amount), "Token transfer failed");

        emit TokensTransferred(_to, _amount);
    }

    function withdrawLock(
        address _to,
        uint256 _amount
    ) external returns (bool) {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount must be greater than zero");

        bool success = false;

      
      
            require(token.transfer(_to, _amount), "Token transfer failed");

            emit TokensTransferred(_to, _amount);
            success = true;
  

        return success;
    }
}

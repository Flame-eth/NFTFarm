// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract YieldNftTokenLock {
    IERC20 public token;
    address public _admin;

    struct Withdrawal {
        address user;
        uint256 amount;
        uint256 timestamp;
        string txType;
    }

    Withdrawal[] public withdrawalRecord;

    event TokensTransferred(address indexed to, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == _admin, "Only admin can call this function");
        _;
    }

    constructor() {
        token = IERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
        _admin = 0xdb339be8E04Db248ea2bdD7C308c5589c121C6Bb;
    }

    function setAdmin(address adminAddress) external onlyAdmin {
        _admin = adminAddress;
    }

    function getAdmin() external view returns (address) {
        return _admin;
    }

    function relinquishOwnership() external onlyAdmin {
        _admin = address(0);
    }

    function getBalance() external view onlyAdmin returns (uint256) {
        return token.balanceOf(address(this));
    }

    function transferTokens(address _to, uint256 _amount) external onlyAdmin {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount must be greater than zero");

        require(token.transfer(_to, _amount), "Token transfer failed");

        emit TokensTransferred(_to, _amount);
    }

    function withdrawLock(
        address _to,
        uint256 _amount,
        string memory _txType
    ) external returns (bool) {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount must be greater than zero");

        bool success = false;

        Withdrawal memory newWithdrawal = Withdrawal({
            user: _to,
            amount: _amount,
            timestamp: block.timestamp,
            txType: _txType
        });
        withdrawalRecord.push(newWithdrawal);

        if (msg.sender != _admin) {
            require(token.transfer(_to, _amount), "Token transfer failed");

            emit TokensTransferred(_to, _amount);
            success = true;
        }

        return success;
    }

    function getWithdrawalRecord() external view returns (Withdrawal[] memory) {
        return withdrawalRecord;
    }
}

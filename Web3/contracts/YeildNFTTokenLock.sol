pragma solidity ^0.8.0;

import "./IERC20.sol";

contract YeildNFTTokenLock {
  

    IERC20 public token;
    address public admin;

    event StakeLocked(address indexed user, uint256 amount);
    event PledgeLocked(address indexed user, uint256 amount, uint256 lockDuration);
    event TokensTransferred(address indexed to, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
        admin = msg.sender;
    }

    function stakeLock(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(stakeLocks[msg.sender].isLocked == false, "Tokens are already locked");

        // Transfer tokens to the contract
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        // Store the lock details
        StakeLock memory newLock = StakeLock({
            amount: _amount,
            isLocked: true
        });
        stakeLocks[msg.sender] = newLock;

        emit StakeLocked(msg.sender, _amount);
    }

    function pledgeLock(uint256 _amount, uint256 _lockDuration) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(_lockDuration > 0, "Lock duration must be greater than zero");

        // Transfer tokens to the contract
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        // Store the lock details
        PledgeLock memory newLock = PledgeLock({
            amount: _amount,
            lockDuration: _lockDuration,
            releaseTime: block.timestamp + _lockDuration,
            isLocked: true
        });
        pledgeLocks[msg.sender].push(newLock);

        emit PledgeLocked(msg.sender, _amount, _lockDuration);
    }

    function releasePledgeLock(uint256 _index) external {
        require(_index < pledgeLocks[msg.sender].length, "Invalid index");
        PledgeLock storage lock = pledgeLocks[msg.sender][_index];
        require(lock.isLocked, "Tokens are already released");
        require(lock.releaseTime <= block.timestamp, "Tokens are still locked");

        // Transfer the tokens back to the user
        require(token.transfer(msg.sender, lock.amount), "Token transfer failed");

        // Update the lock status
        lock.isLocked = false;
    }

    function transferTokens(address _to, uint256 _amount) external onlyAdmin {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount must be greater than zero");

        // Transfer tokens to the specified address
        require(token.transfer(_to, _amount), "Token transfer failed");

        emit TokensTransferred(_to, _amount);
    }
}

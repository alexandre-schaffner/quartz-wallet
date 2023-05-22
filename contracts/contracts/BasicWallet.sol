// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "erc4337/contracts/core/BaseAccount.sol";
import "erc4337/contracts/interfaces/UserOperation.sol";
import "erc4337/contracts/core/EntryPoint.sol";
import "hardhat/console.sol";


contract BasicWallet is BaseAccount {
    using ECDSA for bytes32;

    address public owner;

    mapping(address sender => bool canValidate) public privileges;

    IEntryPoint private immutable _entryPoint;

    constructor(address _owner, IEntryPoint _entryPointSingleton) {
        privileges[_owner] = true;
        _entryPoint = _entryPointSingleton;
    }

    receive() external payable {}

    // Allows BaseAccount to call entryPoint
    function entryPoint() public view override returns (IEntryPoint) {
        return _entryPoint;
    }

    // Swaps the owner key
    function setPrivilege(address user, bool privilege) external {
        require(
            privileges[msg.sender] || msg.sender == address(this),
            "Sender not owner"
        );
        privileges[user] = privilege;
    }

    // External function for calling _call, can only be called by owner or entrypoint
    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        require(
            privileges[msg.sender] || msg.sender == address(entryPoint()),
            "not from entrypoint"
        );

        _call(dest, value, func);
    }

    // Calls function from wallet.
    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    // Validation logic, here if owner is signer of userOperation.
    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        bytes32 hash = userOpHash.toEthSignedMessageHash();

        if (!privileges[hash.recover(userOp.signature)])
            return SIG_VALIDATION_FAILED;
        return 0;
    }
}

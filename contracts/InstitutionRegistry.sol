// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title InstitutionRegistry
/// @notice Simple registry of approved issuing institutions.
contract InstitutionRegistry {
    address public owner;

    struct Institution {
        string name;
        bool active;
    }

    mapping(address => Institution) private institutions;

    event InstitutionRegistered(address indexed account, string name);
    event InstitutionStatusUpdated(address indexed account, bool active);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerInstitution(address account, string calldata name) external onlyOwner {
        institutions[account] = Institution({name: name, active: true});
        emit InstitutionRegistered(account, name);
    }

    function setInstitutionStatus(address account, bool active) external onlyOwner {
        require(bytes(institutions[account].name).length != 0, "Not registered");
        institutions[account].active = active;
        emit InstitutionStatusUpdated(account, active);
    }

    function isActive(address account) external view returns (bool) {
        return institutions[account].active;
    }

    function getInstitution(address account) external view returns (Institution memory) {
        return institutions[account];
    }
}


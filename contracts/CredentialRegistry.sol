// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CredentialRegistry
/// @notice Minimal registry for hashed academic credentials anchored on-chain.
contract CredentialRegistry {
    struct CredentialRecord {
        bytes32 hash;
        address issuer;
        uint64 issuedAt;
        bool revoked;
    }

    mapping(bytes32 => CredentialRecord) private credentials;

    event CredentialIssued(bytes32 indexed id, bytes32 hash, address indexed issuer);
    event CredentialRevoked(bytes32 indexed id, address indexed issuer);

    function issue(bytes32 id, bytes32 hash) external {
        require(credentials[id].issuedAt == 0, "Already issued");
        credentials[id] = CredentialRecord({
            hash: hash,
            issuer: msg.sender,
            issuedAt: uint64(block.timestamp),
            revoked: false
        });
        emit CredentialIssued(id, hash, msg.sender);
    }

    function revoke(bytes32 id) external {
        CredentialRecord storage record = credentials[id];
        require(record.issuedAt != 0, "Unknown id");
        require(record.issuer == msg.sender, "Only issuer");
        require(!record.revoked, "Already revoked");
        record.revoked = true;
        emit CredentialRevoked(id, msg.sender);
    }

    function get(bytes32 id) external view returns (CredentialRecord memory) {
        return credentials[id];
    }
}


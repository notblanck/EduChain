// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title CertificateRegistry
/// @notice On-chain registry for hashed academic certificates. Only the owner can issue.
contract CertificateRegistry {
    address public owner;

    struct CertRecord {
        bool exists;
        address issuer;
        uint64 issuedAt;
    }

    mapping(bytes32 => CertRecord) private _certs;

    event CertificateIssued(bytes32 indexed hash, address indexed issuer, uint64 issuedAt);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Store a certificate hash on-chain. Reverts if already issued.
    function issueCertificate(bytes32 hash) external onlyOwner {
        require(!_certs[hash].exists, "Already issued");
        _certs[hash] = CertRecord({
            exists: true,
            issuer: msg.sender,
            issuedAt: uint64(block.timestamp)
        });
        emit CertificateIssued(hash, msg.sender, uint64(block.timestamp));
    }

    /// @notice Returns true if the given hash was previously issued.
    function verifyCertificate(bytes32 hash) external view returns (bool) {
        return _certs[hash].exists;
    }

    /// @notice Returns detailed record for a certificate hash.
    function getCertificate(bytes32 hash)
        external
        view
        returns (bool exists, address issuer, uint64 issuedAt)
    {
        CertRecord memory r = _certs[hash];
        return (r.exists, r.issuer, r.issuedAt);
    }
}

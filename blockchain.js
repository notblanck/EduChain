// Simplified Blockchain Implementation for Academic Credentials
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingCredentials = [];
    }

    createGenesisBlock() {
        return {
            index: 0,
            timestamp: Date.now(),
            credentials: [],
            previousHash: '0',
            hash: this.calculateHash({
                index: 0,
                timestamp: Date.now(),
                credentials: [],
                previousHash: '0'
            }),
            nonce: 0
        };
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    calculateHash(block) {
        const dataString = JSON.stringify(block);
        // Simple hash function (in production, use SHA-256)
        let hash = 0;
        for (let i = 0; i < dataString.length; i++) {
            const char = dataString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }

    mineBlock(block) {
        // Assign hash (no proof-of-work to keep UI responsive; chain still immutable via hashing)
        block.hash = this.calculateHash(block);
        return block;
    }

    addCredential(credential) {
        const credentialData = {
            id: credential.credentialId,
            studentName: credential.studentName,
            institution: credential.institution,
            degree: credential.degree,
            field: credential.field,
            issueDate: credential.issueDate,
            timestamp: Date.now(),
            hash: this.generateCredentialHash(credential)
        };

        this.pendingCredentials.push(credentialData);
        
        // Mine block if we have credentials to add
        if (this.pendingCredentials.length >= 1) {
            this.minePendingCredentials();
        }

        return credentialData;
    }

    generateCredentialHash(credential) {
        const data = `${credential.credentialId}${credential.studentName}${credential.institution}${credential.degree}${credential.issueDate}`;
        return this.calculateHash({ data });
    }

    minePendingCredentials() {
        const newBlock = {
            index: this.chain.length,
            timestamp: Date.now(),
            credentials: [...this.pendingCredentials],
            previousHash: this.getLatestBlock().hash,
            nonce: 0
        };

        newBlock.hash = this.calculateHash(newBlock);
        const minedBlock = this.mineBlock(newBlock);
        
        this.chain.push(minedBlock);
        this.pendingCredentials = [];
        
        return minedBlock;
    }

    verifyCredential(hashOrId) {
        // Search through all blocks
        for (let block of this.chain) {
            for (let credential of block.credentials) {
                if (credential.hash === hashOrId || credential.id === hashOrId) {
                    return {
                        valid: true,
                        credential: credential,
                        blockIndex: block.index,
                        blockHash: block.hash,
                        timestamp: block.timestamp
                    };
                }
            }
        }
        return { valid: false };
    }

    getAllCredentials() {
        const credentials = [];
        for (let block of this.chain) {
            credentials.push(...block.credentials);
        }
        return credentials.reverse(); // Most recent first
    }

    getBlockHeight() {
        return this.chain.length;
    }

    getTotalCredentials() {
        return this.getAllCredentials().length;
    }

    // Validate chain integrity
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== this.calculateHash(currentBlock)) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Initialize blockchain instance
const blockchain = new Blockchain();

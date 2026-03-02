// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
    const credentialForm = document.getElementById('credentialForm');
    const verifyForm = document.getElementById('verifyForm');
    const credentialsList = document.getElementById('credentialsList');
    const verificationResult = document.getElementById('verificationResult');
    const blockHeight = document.getElementById('blockHeight');
    const totalCredentials = document.getElementById('totalCredentials');

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('issueDate').value = today;

    // Update blockchain status
    function updateBlockchainStatus() {
        blockHeight.textContent = blockchain.getBlockHeight();
        totalCredentials.textContent = blockchain.getTotalCredentials();
    }

    // Display credentials
    function displayCredentials() {
        const credentials = blockchain.getAllCredentials();
        
        if (credentials.length === 0) {
            credentialsList.innerHTML = '<p class="empty-state">No credentials issued yet</p>';
            return;
        }

        credentialsList.innerHTML = credentials.map(cred => `
            <div class="credential-item">
                <h3>${cred.degree}</h3>
                <div class="credential-meta">
                    <div class="meta-item">
                        <strong>Student:</strong>
                        ${cred.studentName}
                    </div>
                    <div class="meta-item">
                        <strong>Institution:</strong>
                        ${cred.institution}
                    </div>
                    <div class="meta-item">
                        <strong>Field:</strong>
                        ${cred.field}
                    </div>
                    <div class="meta-item">
                        <strong>Issue Date:</strong>
                        ${new Date(cred.issueDate).toLocaleDateString()}
                    </div>
                </div>
                <div class="hash">
                    Hash: ${cred.hash}
                </div>
            </div>
        `).join('');
    }

    // Handle credential form submission
    credentialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const credential = {
            studentName: document.getElementById('studentName').value.trim(),
            institution: document.getElementById('institution').value.trim(),
            degree: document.getElementById('degree').value.trim(),
            field: document.getElementById('field').value.trim(),
            issueDate: document.getElementById('issueDate').value,
            credentialId: document.getElementById('credentialId').value.trim()
        };

        // Show loading state
        const submitBtn = credentialForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mining Block...';
        submitBtn.disabled = true;

        // Simulate mining delay
        setTimeout(() => {
            try {
                const result = blockchain.addCredential(credential);
                
                // Show success message
                showNotification('Credential issued successfully!', 'success');
                
                // Reset form
                credentialForm.reset();
                document.getElementById('issueDate').value = today;
                
                // Update display
                displayCredentials();
                updateBlockchainStatus();
                
                // Show the credential hash
                showNotification(`Credential Hash: ${result.hash}`, 'info');
            } catch (error) {
                showNotification('Error issuing credential: ' + error.message, 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 1000);
    });

    // Handle verification form submission
    verifyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const hashOrId = document.getElementById('verifyHash').value.trim();
        
        if (!hashOrId) {
            showNotification('Please enter a hash or credential ID', 'error');
            return;
        }

        verificationResult.className = 'verification-result loading';
        verificationResult.style.display = 'block';
        verificationResult.innerHTML = '<p>Verifying credential...</p>';

        // Simulate verification delay
        setTimeout(() => {
            const result = blockchain.verifyCredential(hashOrId);

            if (result.valid) {
                verificationResult.className = 'verification-result valid';
                verificationResult.innerHTML = `
                    <h3>✅ Credential Verified</h3>
                    <p>This credential is valid and recorded on the blockchain.</p>
                    <div class="credential-details">
                        <div class="detail-item">
                            <strong>Student Name:</strong>
                            <span>${result.credential.studentName}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Institution:</strong>
                            <span>${result.credential.institution}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Degree:</strong>
                            <span>${result.credential.degree}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Field:</strong>
                            <span>${result.credential.field}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Issue Date:</strong>
                            <span>${new Date(result.credential.issueDate).toLocaleDateString()}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Block Index:</strong>
                            <span>${result.blockIndex}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Block Hash:</strong>
                            <span style="font-family: monospace; font-size: 0.9rem;">${result.blockHash}</span>
                        </div>
                        <div class="detail-item">
                            <strong>Credential Hash:</strong>
                            <span style="font-family: monospace; font-size: 0.9rem;">${result.credential.hash}</span>
                        </div>
                    </div>
                `;
            } else {
                verificationResult.className = 'verification-result invalid';
                verificationResult.innerHTML = `
                    <h3>❌ Credential Not Found</h3>
                    <p>The credential with the provided hash or ID could not be found on the blockchain.</p>
                    <p style="margin-top: 10px; font-size: 0.9rem;">Please verify that you entered the correct hash or credential ID.</p>
                `;
            }
        }, 500);
    });

    // Simple notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
            word-wrap: break-word;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initialize display
    displayCredentials();
    updateBlockchainStatus();

    // Validate blockchain integrity on load
    if (!blockchain.isChainValid()) {
        console.error('Blockchain integrity check failed!');
        showNotification('Warning: Blockchain integrity check failed!', 'error');
    }
});

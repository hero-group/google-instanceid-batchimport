const fetch = require('node-fetch');

module.exports = (fcmServerKey) => {
    const baseUrl = 'https://iid.googleapis.com';

    function getAuthorizationHeaders() {
        return {
            'Authorization': 'key=' + fcmServerKey
        }
    }

    return {
        batchImport: async (application, sandbox, apnsTokens) => {
            sandbox = sandbox !== false;
            if (typeof apnsTokens === 'string') {
                apnsTokens = [apnsTokens];
            }
            const url = baseUrl + '/iid/v1:batchImport';
            const payload = {
                application,
                sandbox,
                apns_tokens: apnsTokens
            };
            return fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: Object.assign({
                    'Content-Type': 'application/json'
                }, getAuthorizationHeaders())
            });
        }
    };
};
# google-instanceid-batchimport

Lightweight client implementing only the `batchImport` method of the Google Instance ID
service. This is useful for mapping one or more (up to 100) APNs tokens to GCM/FCM
tokens. See: https://developers.google.com/instance-id/reference/server#create_registration_tokens_for_apns_tokens

## Installation

```shell script
npm install --save google-instanceid-batchimport
```

## Usage
```ecmascript 6
const BatchImportService = require('google-instanceid-batchimport');
const service = BatchImportService(FCM_SERVER_KEY);
service.batchImport(
    'com.mydomain.myapp',
    true,
    [
        'apnstoken1',
        'apnstoken2',
        // ... etc    
    ]
).then(response => {
    if (response.status === 200) {
        return response.json();    
    }
    throw new Error(`Request returned ${response.status}`);
}).then(data => {
    for (let token of data.results) {
        console.log(`${token.apns_token} mapped to ${token.registration_token}`);    
    }
});
```

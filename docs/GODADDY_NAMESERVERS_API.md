# GoDaddy: set nameservers via API

You can **set or reset** domain nameservers programmatically using the GoDaddy Domains API. Two options:

- **v1** – `PATCH /v1/domains/{domain}` (simpler; no customer ID).
- **v2** – `PUT /v2/customers/{customerId}/domains/{domain}/nameServers` (returns 202; poll for status).

**Credentials:** Create an API key at [developer.godaddy.com/keys](https://developer.godaddy.com/keys). Use **Key** and **Secret** in the `Authorization` header.

**Limitation:** Nameserver updates on **protected or high-value** domains may require 2FA; the API does not support 2FA, so those domains can only be updated in the GoDaddy UI. You may get `409 The given domain is not eligible to have its nameservers changed`.

---

## Option 1: PATCH (v1)

**Endpoint:** `PATCH https://api.godaddy.com/v1/domains/{domain}`

**Headers:**
- `Authorization: sso-key YOUR_KEY:YOUR_SECRET`
- `Content-Type: application/json`

**Body:** At least two apex nameservers (FQDN).

```json
{
  "nameServers": [
    "ns-487.awsdns-60.com",
    "ns-1498.awsdns-59.org",
    "ns-1927.awsdns-48.co.uk",
    "ns-1003.awsdns-61.net"
  ]
}
```

**Example (inquiry.institute → Route 53):**

```bash
export GODADDY_KEY="your_key"
export GODADDY_SECRET="your_secret"

curl -X PATCH "https://api.godaddy.com/v1/domains/inquiry.institute" \
  -H "Authorization: sso-key $GODADDY_KEY:$GODADDY_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "nameServers": [
      "ns-487.awsdns-60.com",
      "ns-1498.awsdns-59.org",
      "ns-1927.awsdns-48.co.uk",
      "ns-1003.awsdns-61.net"
    ]
  }'
```

Success: **200** with no body. Errors: **409** (domain not eligible), **422** (e.g. fewer than two nameservers).

**Reset to GoDaddy default nameservers:** Use GoDaddy’s default NS list in the same body (you can get them from the domain in the UI or from GoDaddy’s docs). There is no special “reset” endpoint; you just send the desired nameservers.

---

## Option 2: PUT (v2)

**Endpoint:** `PUT https://api.godaddy.com/v2/customers/{customerId}/domains/{domain}/nameServers`

**Headers:** Same as above.

**Body:** Same `nameServers` array.

**Response:** **202 Accepted**. Poll status with:

`GET https://api.godaddy.com/v2/customers/{customerId}/domains/{domain}/actions/DOMAIN_UPDATE_NAME_SERVERS`

`customerId` is your GoDaddy shopper ID (see account/profile or the API whoami/shopper endpoints if available).

---

## References

- [GoDaddy Domains API](https://developer.godaddy.com/doc/endpoint/domains)
- [Swagger (Domains)](https://developer.godaddy.com/swagger/swagger_domains.json) – `DomainUpdate` (v1), `DomainNameServerUpdateV2` (v2)

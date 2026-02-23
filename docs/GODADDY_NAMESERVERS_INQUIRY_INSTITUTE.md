# Point inquiry.institute at Route 53 (GoDaddy)

Domains are registered at **GoDaddy**. To finish the Route 53 migration and use the new hosted zone in the custodian account, set the domain’s nameservers in GoDaddy to the Route 53 delegation set below.

## Nameservers to use (new zone in custodian account)

- `ns-487.awsdns-60.com`
- `ns-1498.awsdns-59.org`
- `ns-1927.awsdns-48.co.uk`
- `ns-1003.awsdns-61.net`

**Hosted zone ID:** `Z0160339H8UNP018AYAN` (admin/custodian account)

## Steps in GoDaddy

1. Sign in at [GoDaddy Domain Portfolio](https://dcc.godaddy.com/control/portfolio).
2. Select **inquiry.institute** (or the domain you’re moving).
3. Open **DNS** → **Nameservers**.
4. Choose **“I'll use my own nameservers”** (custom nameservers).
5. Enter the four nameservers above (one per line if prompted).
6. **Save** and **Continue**.

If **Domain Protection** is on, complete the verification (SMS, authenticator, or email) when prompted.

## After saving

- Updates often apply within an hour; allow up to 48 hours for full propagation.
- DNS for the domain will then be served from the new Route 53 zone (custodian account).
- Verify with: `dig NS inquiry.institute +short` — you should see the four `ns-487` / `ns-1498` / `ns-1927` / `ns-1003` nameservers.

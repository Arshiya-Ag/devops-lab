# BIND DNS — Unexpected Referral Caused by Incorrect NS Record

## Overview

An internal DNS resolution issue was identified in the Nova Systems environment when queries for `ns1.nova.test` failed through the recursive DNS resolver.

Investigation revealed an incorrectly associated NS record in the parent `nova.test` zone, resulting in an unintended DNS delegation.

## Environment

- **Operating System:** Rocky Linux
- **DNS Software:** BIND9
- **Primary DNS:** `10.88.20.10` (NS1)
- **Secondary DNS:** `10.88.20.11` (NS2)
- **Recursive Resolver:** `10.88.20.100`
- **Affected Zone:** `nova.test`

## Symptoms

Queries for `ns1.nova.test` through the internal recursive resolver returned `SERVFAIL`.

Direct queries to NS1 returned `NOERROR` with an empty Answer section and an unexpected referral:

```dns
ns1.nova.test.  IN NS ns2.nova.test.
```

Instead of returning the expected A record:

```dns
ns1.nova.test.  IN A 10.88.20.10
```

## Root Cause

The issue was caused by an NS record without an explicitly defined owner name in the parent zone file.

### Incorrect Configuration

```dns
@       IN NS  ns1.nova.test.
ns1     IN A   10.88.20.10
        IN NS  ns2.nova.test.
ns2     IN A   10.88.20.11
```

In BIND zone files, a record without an explicit owner inherits the previous owner name.

As a result, the second NS record was associated with `ns1.nova.test` rather than the `nova.test` zone apex.

This unintentionally created a delegation for `ns1.nova.test`, preventing NS1 from returning the expected authoritative A record.

## Resolution

The zone file was corrected by explicitly assigning both corporate NS records to the zone apex using `@`.

### Correct Configuration

```dns
@       IN NS  ns1.nova.test.
ns1     IN A   10.88.20.10
@       IN NS  ns2.nova.test.
ns2     IN A   10.88.20.11
```

After the correction was applied, authoritative and recursive DNS resolution returned the expected results.

## Verification

The following tests confirmed that the issue was resolved:

| Test | Result |
|---|---|
| Query NS1 directly for `ns1.nova.test` | `NOERROR` |
| NS1 authoritative response | `10.88.20.10` |
| NS1 response flag | `aa` |
| Query internal recursive resolver | `NOERROR` |
| Recursive response | `10.88.20.10` |
| Recursive response flag | `ra` |
| Unexpected referral | No longer observed |

The recursive resolver also returned a reduced TTL, confirming that DNS caching continued functioning normally.

## Prevention

To avoid similar issues:

- Explicitly define owner names for important DNS records.
- Use `@` when assigning records to the zone apex.
- Validate zone files before applying configuration changes.
- Check authoritative DNS responses after modifying NS records.
- Verify SOA serial synchronization between primary and secondary servers.
- Maintain configuration backups and track DNS changes through Git.

## Conclusion

The incident was caused by incorrect DNS record ownership rather than a failure of the recursive resolver.

Correcting the NS record restored authoritative resolution and eliminated the unexpected delegation.

The incident highlights the importance of DNS zone-file syntax, proper record ownership, and interpreting DNS response sections during troubleshooting.

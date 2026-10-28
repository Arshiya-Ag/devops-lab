# NS1 — Primary DNS Server

NS1 is the primary authoritative DNS server for the Nova Systems internal network, running BIND9 on Rocky Linux.

It manages the corporate forward and reverse DNS zones, providing hostname resolution and reverse lookups for internal services.

DNS changes are maintained on NS1 and synchronized with NS2 through restricted zone transfers and DNS NOTIFY.

The server also manages delegation for the `dev.nova.test` subdomain, directing DNS resolvers to NS2 using NS and glue records.

NS1 operates as an authoritative-only DNS server, with recursive queries handled separately by the internal caching resolver.

## Configuration

- **IP Address:** `10.88.20.10`
- **Forward Zone:** `nova.test`
- **Reverse Zone:** `20.88.10.in-addr.arpa`
- **Secondary DNS:** `10.88.20.11` (NS2)
- **Delegated Zone:** `dev.nova.test`
- **Zone Transfers:** Restricted to NS2
- **DNS NOTIFY:** Enabled
- **Recursion:** Disabled
- **Internal Recursive Resolver:** `10.88.20.100`

## Maintenance

DNS zone changes are applied on NS1 and synchronized with NS2 using SOA serial updates.

Nameserver records for the corporate zone are explicitly associated with the zone apex to prevent unintended DNS delegation.

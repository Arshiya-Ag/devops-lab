# NS1 — Primary DNS Server

NS1 is the primary authoritative DNS server for the Nova Systems internal network, running BIND on Rocky Linux.

It manages forward and reverse DNS resolution for the internal network. DNS records are maintained on NS1 and synchronized with the secondary nameserver (NS2) to provide redundancy and maintain DNS availability during primary-server outages.

## Configuration

- **IP Address:** `10.88.20.10`
- **Forward Zone:** `nova.test`
- **Reverse Zone:** `20.88.10.in-addr.arpa`
- **Secondary DNS:** `10.88.20.11` (NS2)
- **Zone Transfers:** Restricted to NS2
- **DNS NOTIFY:** Enabled
- **Recursion:** Disabled

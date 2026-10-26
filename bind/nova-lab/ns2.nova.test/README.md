# NS2 — Secondary DNS Server

NS2 is the secondary authoritative DNS server for the Nova Systems internal network, running BIND on Rocky Linux.

It maintains synchronized copies of the forward and reverse DNS zones hosted on NS1 through zone transfers. NS2 provides DNS redundancy by continuing to serve authoritative queries when the primary nameserver is unavailable.

## Configuration

- **IP Address:** `10.88.20.11`
- **Forward Zone:** `nova.test`
- **Reverse Zone:** `20.88.10.in-addr.arpa`
- **Primary DNS:** `10.88.20.10` (NS1)
- **Zone Transfers:** Received from NS1
- **DNS NOTIFY:** Received from NS1
- **Recursion:** Disabled

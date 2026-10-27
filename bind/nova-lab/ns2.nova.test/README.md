# NS2 — Secondary & Development DNS Server

NS2 is an authoritative DNS server for the Nova Systems internal network, running BIND9 on Rocky Linux.

It operates as the secondary DNS server for the corporate forward and reverse zones, maintaining synchronized copies of the records hosted on NS1 through zone transfers.

In addition to providing DNS redundancy, NS2 acts as the primary authoritative server for `dev.nova.test`, a delegated subdomain used to manage the company's development resources.

The Development zone is maintained independently, with its own SOA record, nameserver configuration, and DNS records for internal development services.

## Configuration

- **IP Address:** `10.88.20.11`
- **Secondary Forward Zone:** `nova.test`
- **Secondary Reverse Zone:** `20.88.10.in-addr.arpa`
- **Primary Zone:** `dev.nova.test`
- **Parent Primary DNS:** `10.88.20.10` (NS1)
- **Zone Transfers:** Received from NS1 for corporate zones
- **DNS NOTIFY:** Received from NS1
- **Development Records:** Git, CI, and documentation services
- **Recursion:** Disabled

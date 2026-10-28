# Nova Systems — DNS Infrastructure

## Overview

Nova Systems is a fictional company created to simulate the design, deployment, and administration of DNS infrastructure in a business environment.

The project focuses on building a reliable internal DNS infrastructure using **BIND9 on Rocky Linux**, with separate authoritative and recursive DNS services.

The environment provides forward and reverse DNS resolution, primary-secondary replication, subdomain delegation, and recursive caching. It also serves as a practical environment for infrastructure changes, service availability testing, and DNS troubleshooting.

## Infrastructure

The environment consists of three Rocky Linux machines connected through an isolated virtual network.

| Hostname | Role | IP Address |
|---|---|---|
| NS1 | Primary Authoritative DNS | `10.88.20.10` |
| NS2 | Secondary DNS / Development DNS | `10.88.20.11` |
| CLIENT | Recursive Caching DNS Resolver | `10.88.20.100` |

- **Operating System:** Rocky Linux
- **DNS Software:** BIND9
- **Network:** `10.88.20.0/24`

## DNS Architecture

### Corporate DNS

The corporate DNS infrastructure manages two authoritative zones:

- **Forward Zone:** `nova.test`
- **Reverse Zone:** `20.88.10.in-addr.arpa`

NS1 maintains the primary copies of both zones, while NS2 receives updates through zone transfers and DNS NOTIFY.

This architecture provides authoritative DNS redundancy and allows NS2 to continue serving existing records during temporary outages of NS1.

### Development DNS

The Development Department operates under a separate DNS zone:

- **Child Zone:** `dev.nova.test`
- **Primary Authoritative Server:** NS2 (`10.88.20.11`)

The parent zone delegates authority for `dev.nova.test` to NS2 using NS and glue records.

The child zone maintains its own SOA record and DNS records, independently of the corporate zone.

NS2 therefore operates as a secondary authoritative server for the corporate zones and a primary authoritative server for the Development zone.

### Recursive DNS Resolution

CLIENT operates as an internal recursive caching DNS resolver.

A BIND static-stub configuration allows the resolver to discover the private `nova.test` namespace through NS1 and NS2.

The resolver follows DNS referrals to locate records within the delegated `dev.nova.test` zone, allowing applications to resolve internal hostnames without directly contacting individual authoritative servers.

DNS responses are cached to reduce repeated lookups. Recursive and cache access is restricted to the authorized internal network.

NS1 and NS2 remain non-recursive, separating authoritative DNS responsibilities from recursive resolution.

## DNS Records

The infrastructure includes records for corporate applications, email, and development resources.

| Hostname | Record | Value |
|---|---|---|
| `app.nova.test` | A | `10.88.20.31` |
| `dashboard.nova.test` | CNAME | `app.nova.test` |
| `mail.nova.test` | A | `10.88.20.40` |
| `git.dev.nova.test` | A | `10.88.20.70` |
| `ci.dev.nova.test` | A | `10.88.20.71` |
| `docs.dev.nova.test` | CNAME | `git.dev.nova.test` |

Reverse DNS records are maintained separately for the corporate network.

## Configuration and Management

The infrastructure has been configured and tested for:

- Authoritative forward and reverse DNS resolution.
- Primary-secondary zone synchronization using AXFR and DNS NOTIFY.
- IP-restricted zone transfers.
- Authoritative DNS availability during primary-server outages.
- Application IP migration and DNS record management.
- Subdomain delegation using NS and glue records.
- Independent corporate and development DNS zones.
- Recursive resolution using static-stub configuration.
- DNS caching and TTL behavior.
- Recursive access controls for internal clients.
- SOA serial management and DNS troubleshooting.

Configuration files and infrastructure changes are maintained in Git.

## Troubleshooting

The project also documents DNS incidents encountered during configuration and operation.

- [Unexpected DNS Referral Caused by Incorrect NS Record](incidents/ns1-unexpected-referral/README.md)

## Repository Structure

```text
nova-lab/
├── README.md
├── ns1/
│   ├── README.md
│   └── named.conf and zone files
├── ns2/
│   ├── README.md
│   └── named.conf and zone files
├── client/
│   ├── README.md
│   └── named.conf
└── incidents/
    └── ns1-unexpected-referral/
        └── README.md
```

## Project Scope

This infrastructure runs in an isolated virtual lab and is intended for practical Linux administration, DNS management, and infrastructure troubleshooting.

The project will continue to evolve as additional DNS services and infrastructure improvements are implemented.

**Note:** This is a simulated internal environment, not a production deployment.

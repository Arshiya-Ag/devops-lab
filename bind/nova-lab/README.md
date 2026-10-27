# Nova Systems — DNS Infrastructure

## Overview

Nova Systems is a fictional company created to simulate the design, deployment, and management of DNS infrastructure in a business environment.

This project focuses on building a reliable internal DNS infrastructure using **BIND9 on Rocky Linux**, providing authoritative name resolution, forward and reverse DNS, and service redundancy.

The environment is also designed to explore DNS zone management, replication, delegation, and troubleshooting as the company's infrastructure expands.

## Infrastructure

The environment consists of two authoritative DNS servers and a client machine connected through an isolated virtual network.

| Hostname | Role | IP Address |
|---|---|---|
| NS1 | Primary DNS Server | `10.88.20.10` |
| NS2 | Secondary DNS / Development DNS Server | `10.88.20.11` |
| CLIENT | DNS Testing Client | `10.88.20.100` |

- **Operating System:** Rocky Linux
- **DNS Software:** BIND9
- **Network:** `10.88.20.0/24`

## DNS Architecture

### Corporate DNS

The main corporate DNS infrastructure manages two zones:

- **Forward Zone:** `nova.test`
- **Reverse Zone:** `20.88.10.in-addr.arpa`

NS1 maintains the primary copies of both zones, while NS2 receives updates through zone transfers and DNS NOTIFY.

This arrangement provides authoritative DNS redundancy and allows NS2 to continue serving records during temporary outages of NS1.

### Development DNS

The Development Department operates under a separate DNS zone:

- **Child Zone:** `dev.nova.test`
- **Primary Authoritative Server:** NS2 (`10.88.20.11`)

The parent `nova.test` zone delegates authority for `dev.nova.test` to NS2 using an NS record and a corresponding glue record.

The child zone has its own SOA record and is managed independently of the corporate zone.

NS2 therefore serves two roles: secondary for the corporate DNS zones and primary for the Development DNS zone.

## DNS Records

The infrastructure includes DNS records for internal services, applications, and development resources.

| Hostname | Record | Value |
|---|---|---|
| `app.nova.test` | A | `10.88.20.31` |
| `dashboard.nova.test` | CNAME | `app.nova.test` |
| `mail.nova.test` | A | `10.88.20.40` |
| `git.dev.nova.test` | A | `10.88.20.70` |
| `ci.dev.nova.test` | A | `10.88.20.71` |
| `docs.dev.nova.test` | CNAME | `git.dev.nova.test` |

Reverse DNS records are maintained separately for the internal network.

## Configuration and Management

The DNS infrastructure has been configured and tested for:

- Authoritative forward and reverse DNS resolution.
- Primary-secondary zone replication using AXFR and DNS NOTIFY.
- Restricted zone transfers and disabled recursive queries.
- DNS availability during temporary primary-server outages.
- Application IP migration with corresponding DNS record updates.
- Parent-child zone delegation using NS and glue records.
- Independent management of corporate and development DNS zones.
- SOA serial synchronization and DNS troubleshooting.

Configuration files are version-controlled using Git to track infrastructure changes and maintain historical versions.

## Repository Structure

- **`ns1/`** — Primary DNS server configuration and documentation.
- **`ns2/`** — Secondary DNS server and Development DNS configuration.

## Project Scope

This infrastructure operates in an isolated virtual lab and is intended for practical Linux system administration and infrastructure management.

The project will continue to evolve as additional DNS services, operational improvements, and troubleshooting exercises are introduced.

**Note:** This is a simulated internal environment, not a production deployment.

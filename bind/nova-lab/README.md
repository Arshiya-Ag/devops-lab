# Nova Systems — DNS Infrastructure

## Overview

Nova Systems is a fictional company created to simulate the deployment and administration of DNS infrastructure in a business environment.

The goal of this project is to build and maintain a reliable internal DNS infrastructure using **BIND on Rocky Linux**, following real-world Linux system administration practices.

The environment is designed to provide authoritative name resolution, support forward and reverse DNS lookups, and maintain service availability through multiple DNS servers.

Beyond the initial deployment, the project focuses on managing DNS changes, maintaining synchronization between servers, troubleshooting configuration issues, and understanding how DNS services behave during failures.

## Infrastructure

The environment consists of two authoritative DNS servers and a client machine, operating within an isolated network.

| Hostname | Role | IP Address |
|---|---|---|
| NS1 | Primary DNS Server | `10.88.20.10` |
| NS2 | Secondary DNS Server | `10.88.20.11` |
| CLIENT | DNS Testing Client | `10.88.20.100` |

**Operating System:** Rocky Linux  
**DNS Software:** BIND  
**Network:** `10.88.20.0/24`

## DNS Architecture

The infrastructure manages two DNS zones:

- **Forward Zone:** `nova.test` — Resolves hostnames to IP addresses.
- **Reverse Zone:** `20.88.10.in-addr.arpa` — Resolves IP addresses to hostnames.

NS1 acts as the primary source of DNS records. NS2 maintains synchronized copies of both zones through zone transfers and DNS NOTIFY.

This design allows NS2 to continue responding to authoritative DNS queries during temporary outages of the primary server.

To limit unnecessary access, recursive DNS queries are disabled, and zone transfers from NS1 are restricted to NS2.

## Project Objectives

This project aims to develop practical experience in:

- Deploying and configuring authoritative DNS servers on Linux.
- Managing forward and reverse DNS zones.
- Working with DNS resource records, including A, PTR, CNAME, MX, NS, and TXT.
- Configuring primary-secondary DNS replication and automatic zone synchronization.
- Implementing access restrictions for zone transfers.
- Testing DNS redundancy and service availability during server outages.
- Managing DNS record changes without disrupting existing services.
- Troubleshooting DNS resolution, zone transfers, and synchronization issues.
- Documenting infrastructure configurations and tracking changes using Git.

## Repository Structure

```text
nova-lab/
├── README.md
├── ns1.nova.test/
│   ├── README.md
│   └── Configuration files
└── ns2.nova.test/
    ├── README.md
    └── Configuration files
```

Each server directory contains its relevant BIND configuration and documentation.

## Project Scope

The infrastructure runs in an isolated virtual lab and is intended for learning, experimentation, and improving practical Linux administration skills.

The project will continue to evolve through DNS configuration changes, troubleshooting exercises, and infrastructure improvements, with the aim of building a deeper understanding of how DNS services are managed in real-world environments.

**Note:** This is a simulated internal infrastructure, not a production deployment.

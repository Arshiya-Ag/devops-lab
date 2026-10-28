# CLIENT — Recursive DNS Resolver

CLIENT operates as the internal recursive caching DNS resolver for Nova Systems, running BIND9 on Rocky Linux.

It provides DNS resolution for the company's private namespace without requiring applications to contact individual authoritative nameservers.

A BIND static-stub zone allows the resolver to discover `nova.test` through NS1 and NS2. The resolver follows DNS delegations to locate authoritative records within the `dev.nova.test` zone.

DNS responses are cached to reduce repeated queries and improve resolution efficiency. Recursive and cache access are restricted to the authorized internal network.

NetworkManager configures the machine to use its local BIND resolver as the default DNS service.

## Configuration

- **IP Address:** `10.88.20.100`
- **DNS Role:** Recursive Caching Resolver
- **Private DNS Namespace:** `nova.test`
- **Zone Discovery:** Static-stub
- **Authoritative Servers:** `10.88.20.10` (NS1), `10.88.20.11` (NS2)
- **Recursion:** Enabled
- **Recursive Access:** `10.88.20.0/24` and localhost
- **Cache Access:** `10.88.20.0/24` and localhost
- **Default DNS Server:** `127.0.0.1`
- **Network Configuration:** NetworkManager

## DNS Resolution

The resolver handles requests for corporate and development hostnames by consulting the appropriate authoritative DNS servers.

It follows parent-child zone delegations, caches successful and negative DNS responses, and returns non-authoritative recursive answers to permitted clients.

Authoritative DNS services remain separate on NS1 and NS2.

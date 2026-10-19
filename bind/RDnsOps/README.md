# RDnsOps — Rocky Linux Caching DNS

Role: Caching-only recursive DNS resolver

Host-only IP: 192.168.241.111

DNS software: BIND (named)

## Configuration files

- /etc/named.conf
- /etc/sysconfig/named
- /etc/named.rfc1912.zones

## Important settings

BIND runs in IPv4-only mode using the -4 startup option.

## Validation

sudo named-checkconf

dig @127.0.0.1 kernel.org A

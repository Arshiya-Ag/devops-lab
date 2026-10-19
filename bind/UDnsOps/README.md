# UDnsOps — Ubuntu Caching DNS

Role: Caching-only recursive DNS resolver

Host-only IP: 192.168.241.110

DNS software: BIND9

## Configuration files

- /etc/bind/named.conf.options
- /etc/bind/named.conf.local
- /etc/default/named

## Important settings

BIND runs in IPv4-only mode using the -4 startup option.

## Validation

sudo named-checkconf
dig @127.0.0.1 kernel.org A

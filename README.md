# DevOps Lab

A personal repository documenting my journey in Linux System Administration and DevOps.

This repository contains configuration files, infrastructure projects, and troubleshooting notes from hands-on work with Ubuntu and Rocky Linux.

## Currently Implemented

### DNS — BIND9

- **[UDnsOps](bind/UDnsOps/):** Ubuntu-based caching DNS server.
- **[RDnsOps](bind/RDnsOps/):** Rocky Linux-based caching DNS server.
- **[Nova Systems](bind/nova-lab/):** Simulated enterprise DNS infrastructure featuring authoritative DNS servers, forward and reverse DNS, zone transfers, redundancy, subdomain delegation, and recursive DNS caching.

### Web Servers

- **[NOVA — Apache](apache/nova-lab/):** Rocky Linux-based Apache HTTP Server infrastructure hosting multiple websites with HTTPS and HTTP-to-HTTPS redirection.
- **[NOVA — Nginx](nginx/nova-lab/nginx-webserver):** Rocky Linux-based Nginx web server hosting multiple websites using server blocks.

### Load Balancing & High Availability

- **[NOVA — Nginx LB1 (Primary)](nginx/nova-lab/nginx-lb1/):** Rocky Linux-based Nginx HTTPS reverse proxy and load balancer (`10.88.20.35`) balancing traffic across the Apache (`10.88.20.21`) and Nginx (`10.88.20.22`) backends, with Keepalived (`MASTER`, VIP `10.88.20.20/24`) for failover and `lsyncd` syncing `/etc/nginx/` and `/etc/pki/tls/` to `lb2`.
- **[NOVA — Nginx LB2 (Backup)](nginx/nova-lab/nginx-lb2/):** Backup Rocky Linux-based Nginx HTTPS reverse proxy and load balancer (`10.88.20.36`) with Keepalived configuration for high-availability failover.

### Troubleshooting

- [BIND SERVFAIL — IPv6 Connectivity Issue](bind/UDnsOps/incident-servfail.md)
- [BIND — Unexpected DNS Referral Caused by Incorrect NS Record](bind/nova-lab/incidents/ns1-unexpected-referral/README.md)

## Planned Technologies

- **Containers:** Docker, Docker Compose
- **Automation:** Bash, Python, Ansible
- **Linux Services:** systemd, logging, backups
- **Infrastructure:** Networking, security, monitoring

## Goal

Develop practical Linux administration and DevOps skills by building, maintaining, and troubleshooting realistic infrastructure environments.

The repository will continue to evolve as new technologies, configurations, and projects are implemented.

# DevOps Lab

A personal repository documenting my journey in Linux System Administration and DevOps.

This repository contains configuration files, infrastructure projects, and troubleshooting notes from hands-on work with Ubuntu and Rocky Linux.

## Currently Implemented

### DNS — BIND9

- **[UDnsOps](bind/UDnsOps/):** Ubuntu-based caching DNS server.
- **[RDnsOps](bind/RDnsOps/):** Rocky Linux-based caching DNS server.
- **[Nova Systems](bind/nova-lab/):** A simulated enterprise DNS infrastructure featuring authoritative DNS servers, forward and reverse DNS, zone transfers, redundancy, subdomain delegation, and recursive DNS caching.

Configuration files and documentation are organized in the `bind/` directory.

### APACHE — HTTPD

- **[NOVA](apache/nova/):** Nova systems Apache Infastructure 


### Troubleshooting

- [BIND SERVFAIL — IPv6 Connectivity Issue](bind/UDnsOps/incident-servfail.md)
- [BIND — Unexpected DNS Referral Caused by Incorrect NS Record](bind/nova-lab/incidents/ns1-unexpected-referral/README.md)

## Planned Technologies

- **Web Servers:** Apache, Nginx
- **Containers:** Docker, Docker Compose
- **Automation:** Bash, Python, Ansible
- **Linux Services:** systemd, logging, backups
- **Infrastructure:** Networking, security, monitoring

## Goal

Develop practical Linux administration and DevOps skills by building, maintaining, and troubleshooting realistic infrastructure environments.

The repository will continue to evolve as new technologies, configurations, and projects are implemented.

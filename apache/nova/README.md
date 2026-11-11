# Nova Systems — Apache Web Server

This directory contains the Apache web server configuration for **Nova Systems**, my fictional IT company built as part of a Linux and DevOps home lab.

The goal is to practice hosting websites on Rocky Linux and connecting Apache with the existing BIND DNS infrastructure.

## Infrastructure

| Component | Details |
|---|---|
| Operating System | Rocky Linux |
| Web Server | Apache HTTP Server (httpd) |
| Server IPs | `10.88.20.21, 10.88.20.22 ` |
| Domains | `www.nova.test, dl.nova.test` |
| HTTP Port | `80` |
| Document Root | `/var/www/html/nova/` |
| Network | `10.88.20.0/24, 192.168.88.0/24` |

## Configuration

Apache uses a dedicated VirtualHost to serve the Nova Systems website.

**Configuration file:**
`/etc/httpd/conf.d/www-nova.conf`
'/etc/httpd/conf.d/dl-nova.conf'

**Log files:**
- Access: `/var/log/httpd/nova-access.log`
- Access: `/var/log/httpd/dl-nova-access.log`
- Error: `/var/log/httpd/nova-error.log`
- Error: `/var/log/httpd/dl-nova-error.log`


The website is accessible at:

**http://www.nova.test**
**http://dl.nova.test**

## DNS Integration

The website uses the existing Nova Systems DNS infrastructure:

| Server | IP Address |
|---|---|
| NS1 — Primary DNS | `10.88.20.10` |
| NS2 — Secondary DNS | `10.88.20.11` |
| Client DNS Resolver | `10.88.20.100` |

The `www.nova.test` hostname must resolve to the Apache server at `10.88.20.100`.

Once resolved, clients connect directly to Apache on port `80`.

---

This is a personal learning project focused on building and managing a realistic Linux infrastructure environment.

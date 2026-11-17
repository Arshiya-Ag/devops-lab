# Nova Systems — Nginx Web Server

This directory contains the Nginx web server configuration for **Nova Systems**, a fictional IT company developed as part of a Linux and DevOps home lab.

The project focuses on hosting multiple websites using Nginx on Rocky Linux, integrated with the existing BIND DNS infrastructure.

## Infrastructure

| Component | Details |
|---|---|
| Operating System | Rocky Linux 9.1 |
| Web Server | Nginx 1.20.1 |
| Server IP | `10.88.20.22` |
| Domains | `www.nova.test`, `dl.nova.test` |
| HTTP Port | `80` |
| Network | `10.88.20.0/24` |

## Configuration

Nginx uses dedicated server blocks to host both websites independently on the same server.

**Configuration files:**
- Main configuration: `/etc/nginx/nginx.conf`
- Main website: `/etc/nginx/conf.d/www-nova.conf`
- Download website: `/etc/nginx/conf.d/dl-nova.conf`

**Website directories:**
- Main website: `/usr/share/nginx/html/nova/`
- Download website: Defined in `dl-nova.conf`

**Log files:**
- Access: `/var/log/nginx/access.log`
- Error: `/var/log/nginx/error.log`

Both websites are served over HTTP and have been verified to return their respective content successfully.

## DNS Integration

The Nginx server is integrated with the Nova Systems DNS infrastructure.

| Server | IP Address |
|---|---|
| NS1 — Primary DNS | `10.88.20.10` |
| NS2 — Secondary DNS | `10.88.20.11` |
| Apache Web Server | `10.88.20.21` |
| Nginx Web Server | `10.88.20.22` |

Both Apache and Nginx host `www.nova.test` and `dl.nova.test` independently.

The Nginx server can be accessed directly through its IP address while preserving domain-based virtual hosting.

---

This project is part of a personal Linux and DevOps lab focused on web server administration and infrastructure management.

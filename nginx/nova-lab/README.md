# Nova Systems — Nginx Infrastructure

This directory contains the Nginx load balancer and web server configurations for **Nova Systems** on Rocky Linux (`10.88.20.0/24`).

## Architecture Overview

Client traffic for `www.nova.test` and `dl.nova.test` hits the Keepalived Virtual IP (`10.88.20.20/24`), which is served by **nginx-lb1** (primary) and **nginx-lb2** (backup). The active load balancer terminates HTTPS on port `443` and proxies requests to the `nova` upstream pool (Nginx and Apache backends), forwarding `X-Real-IP`, `X-Forwarded-For`, `Host`, and `x-Forwarded-Proto`.

`lsyncd` runs on `lb1` to keep `/etc/nginx/` and `/etc/pki/tls/` synchronized to `lb2`.

## Nodes & IP Addresses

| Component | Host / Role | IP Address | Notes |
|---|---|---|---|
| Virtual IP (VIP) | Keepalived VRRP (`ID 51`) | `10.88.20.20/24` | Active on `MASTER` (`enp0s8`) |
| [nginx-lb1](nginx-lb1/) | Primary Load Balancer (`MASTER`) | `10.88.20.35` | Priority `150`, Keepalived + `lsyncd` |
| [nginx-lb2](nginx-lb2/) | Backup Load Balancer (`BACKUP`) | `10.88.20.36` | Receives synced configs from `lb1` |
| [nginx-webserver](nginx-webserver/) | Backend Nginx Web Server | `10.88.20.22` | Serves `www.nova.test` & `dl.nova.test` |
| Apache Web Server | Backend Apache Web Server | `10.88.20.21` | Defined in `nova` upstream (`apache/nova-lab/`) |

## Important Configuration Files

### Load Balancers (`nginx-lb1` & `nginx-lb2`)

| Purpose | VM Path | Repo Path |
|---|---|---|
| Nginx main config | `/etc/nginx/nginx.conf` | `nginx-lb1/etc/nginx/nginx.conf`, `nginx-lb2/etc/nginx/nginx.conf` |
| Reverse proxy & upstream (`nova`) | `/etc/nginx/conf.d/lb-nova.conf` | `nginx-lb1/etc/nginx/conf.d/lb-nova.conf`, `nginx-lb2/etc/nginx/conf.d/lb-nova.conf` |
| Keepalived HA config | `/etc/keepalived/keepalived.conf` | `nginx-lb1/etc/keepalived/keepalived.conf`, `nginx-lb2/etc/keepalived/keepalived.conf` |
| `lsyncd` sync config (`lb1` only) | `/etc/lsyncd.conf` | `nginx-lb1/etc/lsyncd.conf` |
| TLS certificate & key | `/etc/pki/tls/certs/nova-test.pem`, `/etc/pki/tls/private/nova-test-key.pem` | Local only (ignored by `.gitignore` on `lb2` / key excluded) |

### Backend Web Server (`nginx-webserver`)

| Purpose | VM Path | Repo Path |
|---|---|---|
| Nginx main config | `/etc/nginx/nginx.conf` | `nginx-webserver/etc/nginx/nginx.conf` |
| Main site (`www.nova.test`) | `/etc/nginx/conf.d/www-nova.conf` | `nginx-webserver/etc/nginx/conf.d/www-nova.conf` |
| Downloads site (`dl.nova.test`) | `/etc/nginx/conf.d/dl-nova.conf` | `nginx-webserver/etc/nginx/conf.d/dl-nova.conf` |
| Document roots | `/usr/share/nginx/html/nova/`, `/usr/share/nginx/html/dl-nova/` | `nginx-webserver/usr/share/nginx/html/` |

## Key Behavior

- **Load Balancing (`lb-nova.conf`):** Balances HTTPS (`443`) traffic across `10.88.20.22:443` and `10.88.20.21:443` for `www.nova.test` and `dl.nova.test` (`proxy_ssl_verify off`).
- **High Availability (`keepalived.conf`):** `lb1` checks the `nginx` process every 2 seconds (`/usr/bin/killall -0 nginx`, weight `-60`). If `nginx` stops on `lb1`, priority drops from `150` to `90` so the VIP fails over.
- **Config Sync (`lsyncd.conf`):** `lb1` watches `/etc/nginx/` and `/etc/pki/tls/` and syncs changes to `root@10.88.20.36` after a 2-second delay (`delete = false`).
- **Real Client IP (`nginx-webserver`):** `www-nova.conf` and `dl-nova.conf` trust `10.88.20.35` and `10.88.20.36` via `set_real_ip_from` and read `X-Real-Ip`, logging requests to `/var/log/nginx/nova_access.log`.

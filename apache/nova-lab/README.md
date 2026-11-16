# Nova Systems — Apache Web Server

This directory contains the Apache web server configuration for **Nova Systems**, my fictional IT company built as part of a Linux and DevOps home lab.

The goal is to practice hosting websites on Rocky Linux, connecting Apache with the existing BIND DNS infrastructure, and securing the websites using HTTPS.

## Infrastructure

| Component | Details |
|---|---|
| Operating System | Rocky Linux |
| Web Server | Apache HTTP Server (httpd) |
| Server IPs | `10.88.20.21` |
| Domains | `www.nova.test`, `dl.nova.test` |
| HTTP Port | `80` |
| HTTPS Port | `443` |
| Document Root | `/var/www/html/nova/` (www site) |
| Network | `10.88.20.0/24`, `192.168.88.0/24` |

## Configuration

Apache uses separate VirtualHosts for the Nova Systems website and download site. Both are configured to serve HTTPS using `mod_ssl`.

**Configuration files:**
- `/etc/httpd/conf.d/www-nova.conf`
- `/etc/httpd/conf.d/dl-nova.conf`
- `/etc/httpd/conf.d/ssl.conf` (Apache SSL settings)

**Log files:**
- Access: `/var/log/httpd/nova-access.log`
- Access: `/var/log/httpd/dl-nova-access.log`
- Error: `/var/log/httpd/nova-error.log`
- Error: `/var/log/httpd/dl-nova-error.log`

The websites are accessible at:

**https://www.nova.test**  
**https://dl.nova.test**

Port `80` is still enabled. HTTP-to-HTTPS redirects have not been configured yet.

## HTTPS Configuration

HTTPS is enabled with Apache's `mod_ssl` module. Each HTTPS VirtualHost uses `SSLEngine on` and references the server certificate and its matching private key.

A local Certificate Authority was installed using `mkcert`, and a certificate was generated for both `www.nova.test` and `dl.nova.test`.

**Certificate files on the Apache server:**
- Certificate: `/etc/pki/tls/certs/nova-test.pem`
- Private key: `/etc/pki/tls/private/nova-test-key.pem`

The private key is owned by `root` with `600` permissions. **Private keys are not stored in this Git repository.** The certificate can be shared publicly, but the private key and CA signing key must remain protected.

HTTPS was tested from the Fedora workstation. `www.nova.test` successfully negotiated TLS 1.3, passed certificate verification, and returned `HTTP/1.1 200 OK`. The download site also returned `HTTP/1.1 200 OK` over HTTPS.

**Useful checks:**

```bash
sudo httpd -t
sudo httpd -S
curl -Iv https://www.nova.test
curl -Iv https://dl.nova.test
```

## DNS Integration

The websites use the existing Nova Systems BIND DNS infrastructure:

| Server | IP Address |
|---|---|
| NS1 — Primary DNS | `10.88.20.10` |
| NS2 — Secondary DNS | `10.88.20.11` |
| Client DNS Resolver | `10.88.20.100` |

Both `www.nova.test` and `dl.nova.test` resolve to the Apache web server at `10.88.20.21` in the current setup.

Once resolved, clients connect directly to Apache on port `443` for HTTPS.

---

This is a personal learning project focused on building and managing a realistic Linux infrastructure environment.

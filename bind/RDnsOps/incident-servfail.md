# DNS Configuration — IPv4-Only Recursive Resolution

## Environment

- **Server:** RDnsOps (Rocky Linux)
- **DNS Software:** BIND (named)
- **IP Address:** 192.168.241.111
- **Role:** Caching-only recursive DNS resolver

## Problem

The lab environment does not have working external IPv6 connectivity. BIND may attempt outbound IPv6 DNS queries during recursive resolution, potentially causing connectivity errors.

## Diagnosis

A similar issue was identified on UDnsOps through BIND's systemd logs:

```bash
sudo journalctl -u named --since "5 minutes ago"
```

```text
network unreachable resolving 'kernel.org/A/IN': 2001:500:f::1#53
```

These errors indicated that BIND was attempting to reach external DNS servers over IPv6 without an available IPv6 route.

## Fix

Configured BIND to use IPv4-only networking by adding the `-4` startup option in `/etc/sysconfig/named`.

```bash
OPTIONS="-4"
```

The systemd service already specifies `-u named`, so only `-4` is needed in `OPTIONS`.

Restarted BIND and verified the startup arguments:

```bash
sudo systemctl restart named
ps -C named -o args=
```

Verified DNS resolution over both UDP and TCP:

```bash
dig @192.168.241.111 example.com A
dig @192.168.241.111 kernel.org A +tcp
```

Both queries returned `NOERROR`.

**Note:** `listen-on-v6 { none; };` only disables incoming IPv6 DNS listening. The `-4` startup option also prevents BIND from making outgoing IPv6 DNS queries.

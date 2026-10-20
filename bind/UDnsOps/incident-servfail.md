# DNS Troubleshooting — Intermittent SERVFAIL

## Environment

- **Server:** UDnsOps (Ubuntu)
- **DNS Software:** BIND9
- **IP Address:** 192.168.241.110
- **Role:** Caching-only recursive DNS resolver

## Problem

After clearing BIND's cache, initial DNS queries intermittently returned `SERVFAIL`. Subsequent queries succeeded and were cached.

```bash
sudo rndc flush
dig @192.168.241.110 kernel.org A
```

## Diagnosis

External DNS queries and direct resolution through the DNS hierarchy worked, indicating that general DNS connectivity was available.

Inspecting BIND's logs revealed repeated IPv6 connectivity errors:

```bash
sudo journalctl -u named --since "5 minutes ago"
```

```text
network unreachable resolving 'kernel.org/A/IN': 2001:500:f::1#53
```

BIND was attempting outbound DNS queries over IPv6, but the server had no working IPv6 route. These errors pointed to IPv6 connectivity as a likely contributor to the intermittent failures.

## Fix

Configured BIND to use IPv4-only networking by adding the `-4` startup option in `/etc/default/named`.

```bash
OPTIONS="-u bind -4"
```

Restarted BIND and verified the startup arguments:

```bash
sudo systemctl restart named
ps -C named -o args=
```

Repeated cold-cache DNS queries then returned `NOERROR` consistently.

**Note:** `listen-on-v6 { none; };` only disables incoming IPv6 DNS listening. The `-4` startup option also prevents BIND from making outgoing IPv6 DNS queries.

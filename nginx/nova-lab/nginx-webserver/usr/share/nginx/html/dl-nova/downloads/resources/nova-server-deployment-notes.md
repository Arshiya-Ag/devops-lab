# Nova Systems — Server Deployment Reference Guide
**Document ID:** NOV-REF-DEPLOY-2026-v2.0  
**Division:** IT Infrastructure & Operations  
**Target Systems:** Enterprise Linux 8/9, Rocky Linux 9.x  
**Audience:** System Administrators, Infrastructure Engineers  

---

## 1. Executive Summary

This reference guide establishes standard deployment, hardening, and operational practices for Linux server instances managed by Nova Systems. Consistent deployment standards ensure service predictability, reduce incident response friction, and protect client workloads against configuration drift.

---

## 2. Architecture Principles for SMB Workloads

1. **Simplicity Over Over-Engineering**: Prefer standard native distributions, well-documented package managers, and robust upstream packages rather than fragile custom build pipelines.
2. **Deterministic Provisioning**: Document every change. Use reproducible configuration states (via kickstart files, Ansible playbooks, or standardized configuration scripts).
3. **Decoupled Workloads**: Keep application data, system binaries, and log storage on separate mount points or logical volumes to prevent filesystem exhaustion panics.
4. **Least Privilege by Default**: No persistent root logins; restrict daemon accounts to nologin shells (`/sbin/nologin`).

---

## 3. Filesystem and Storage Hierarchy

For all production deployments, use Logical Volume Management (LVM) to facilitate dynamic resizing:

| Mount Point | Min Recommended Size | Filesystem | Mount Options | Purpose |
|-------------|----------------------|------------|---------------|---------|
| `/`         | 20 GB                | xfs        | defaults      | OS core binaries & libraries |
| `/boot`     | 1 GB                 | xfs        | defaults      | Kernel and initramfs images |
| `/var`      | 30 GB                | xfs        | defaults      | Dynamic service data |
| `/var/log`  | 20 GB                | xfs        | defaults,nodev,noexec | System & service audit logs |
| `/tmp`      | 10 GB                | tmpfs/xfs  | nodev,nosuid,noexec | Temporary volatile scratchpad |
| `/var/www`  | 50 GB+               | xfs        | defaults,nodev | Web application DocumentRoots |

---

## 4. Network and Service Configuration

### 4.1 Interface Naming and Static Assignments
Always use NetworkManager command-line interface (`nmcli`) or keyfiles under `/etc/NetworkManager/system-connections/`:

```bash
# Assign static IP, gateway, and search domain
nmcli connection modify eth0 ipv4.method manual \
  ipv4.addresses 10.88.20.21/24 \
  ipv4.gateway 10.88.20.1 \
  ipv4.dns "10.88.20.10,1.1.1.1" \
  ipv4.dns-search "nova.test"
nmcli connection up eth0
```

### 4.2 Web Services (Apache HTTP Server)
For multi-tenant or multi-domain environments:
- Place virtual host configurations in `/etc/httpd/conf.d/<vhost-name>.conf`.
- Keep access logs and error logs separated per VirtualHost.
- Always run `apachectl configtest` prior to issuing `systemctl reload httpd`.
- Maintain SELinux contexts using `httpd_sys_content_t` for static assets and `httpd_sys_rw_content_t` for writable upload directories.

---

## 5. Security & Access Control Baseline

### 5.1 OpenSSH Hardening
Audit `/etc/ssh/sshd_config.d/01-nova-hardening.conf`:
- `PermitRootLogin no`
- `PasswordAuthentication no`
- `PubkeyAuthentication yes`
- `X11Forwarding no`
- `MaxAuthTries 3`

### 5.2 SELinux Enforcement
SELinux must remain in `Enforcing` mode on all production instances. If a service generates denials:
1. Inspect the audit log: `ausearch -m avc -ts recent`
2. Formulate proper file context rules: `semanage fcontext -a -t <type> "<path>"`
3. Apply contexts: `restorecon -Rv <path>`
4. Never set `SELINUX=disabled` as an operational shortcut.

---

## 6. Backup Strategy and Verification

Nova Systems mandates the **3-2-1 Backup Rule** for all infrastructure:
- **3** copies of data (production, local snapshot, offsite replica).
- **2** different storage media types.
- **1** offsite/immutable copy.

### Verification Drills:
- Scheduled backup runs must log checksum manifests (SHA-256).
- Test restoration exercises must be conducted quarterly in an isolated staging network (`*.dev.nova.test`).

---

## 7. Change Management & Verification Checklist

1. Record ticket identifier in maintenance log.
2. Confirm active backup exists prior to commencing major updates.
3. Validate service health post-change: `systemctl status <unit>` and `journalctl -u <unit> -n 50`.
4. Run external HTTP/service probes (`curl -I`, `dig`, or synthetic ping).
5. Document change completion and notify Nova Systems Operations team (`ops@nova.test`).

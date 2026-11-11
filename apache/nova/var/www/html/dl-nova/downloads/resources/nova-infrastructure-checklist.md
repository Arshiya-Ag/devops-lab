# Nova Systems — Linux Infrastructure Deployment Checklist
# Document ID: NOV-CHK-INFRA-2026-v1.2
# Classification: Internal Operations / Technical Template
# Target Platform: Rocky Linux / Enterprise Linux 9

================================================================================
SECTION 1: SYSTEM BASELINE & HARDWARE VERIFICATION
================================================================================
[ ] 1.1 Verify CPU architecture, core count, and memory allocation:
        Command: lscpu | grep "Model name\|CPU(s):" && free -h
[ ] 1.2 Confirm disk topology, partition scheme, and LVM volume group layout:
        Command: lsblk -f && vgs && lvs
[ ] 1.3 Ensure root (/) and /var filesystems have sufficient headroom:
        Command: df -h / /var /var/log /tmp
[ ] 1.4 Validate system BIOS/UEFI time and hardware clock:
        Command: hwclock --show
[ ] 1.5 Record serial number, asset tag, and hypervisor/bare-metal details:
        Command: dmidecode -s system-product-name 2>/dev/null || hostnamectl

================================================================================
SECTION 2: HOSTNAME, NETWORKING & DNS RESOLUTION
================================================================================
[ ] 2.1 Set standard FQDN hostname (e.g., srv01.infra.nova.test):
        Command: hostnamectl set-hostname <fqdn>
[ ] 2.2 Configure static IPv4 addressing using NetworkManager:
        Command: nmcli con show && nmcli con mod <conn> ipv4.addresses <ip/cidr>
[ ] 2.3 Set default gateway and DNS search domain:
        Command: nmcli con mod <conn> ipv4.gateway <gw> ipv4.dns "<dns1> <dns2>"
[ ] 2.4 Verify routing table and reachability to gateway:
        Command: ip route show && ping -c 3 <gateway-ip>
[ ] 2.5 Verify authoritative DNS resolution (A and PTR records):
        Command: host <fqdn> && dig +short <fqdn>
[ ] 2.6 Confirm /etc/hosts contains loopback and local FQDN mappings:
        Command: grep -E "127.0.0.1|::1" /etc/hosts

================================================================================
SECTION 3: SECURITY HARDENING & ACCESS CONTROL
================================================================================
[ ] 3.1 Verify SELinux status is Enforcing:
        Command: getenforce && sestatus
[ ] 3.2 Ensure firewalld is active, enabled, and default zone is set:
        Command: systemctl is-active firewalld && firewall-cmd --get-default-zone
[ ] 3.3 Open only required service ports (e.g., HTTP 80/8080, HTTPS 443):
        Command: firewall-cmd --permanent --add-service=http && firewall-cmd --reload
[ ] 3.4 Hardened OpenSSH configuration (/etc/ssh/sshd_config):
        - PermitRootLogin no (or prohibit-password)
        - PasswordAuthentication no (key-based access enforced)
        - MaxAuthTries 4
        - ClientAliveInterval 300 / ClientAliveCountMax 2
[ ] 3.5 Test SSH configuration syntax before daemon reload:
        Command: sshd -t && systemctl reload sshd
[ ] 3.6 Verify administrative users belong to wheel group and have sudo rights:
        Command: id <admin-user> && sudo -v

================================================================================
SECTION 4: SYSTEM UPDATES & REPOSITORY CONFIGURATION
================================================================================
[ ] 4.1 Update all installed packages to latest errata:
        Command: dnf check-update && dnf upgrade -y
[ ] 4.2 Install core administrative utilities:
        Packages: curl, wget, rsync, tar, gzip, bind-utils, net-tools, tmux, htop
[ ] 4.3 Configure automatic security updates (dnf-automatic):
        Command: systemctl enable --now dnf-automatic.timer
[ ] 4.4 Verify repository GPG key checks are enabled:
        Command: grep -E "^gpgcheck=" /etc/yum.repos.d/*.repo

================================================================================
SECTION 5: TIME SYNCHRONIZATION (CHRONY)
================================================================================
[ ] 5.1 Verify Chrony NTP service is running and enabled:
        Command: systemctl is-active chronyd && systemctl is-enabled chronyd
[ ] 5.2 Confirm peer synchronization status and offset (< 50ms):
        Command: chronyc sources -v && chronyc tracking
[ ] 5.3 Ensure system timezone is set correctly:
        Command: timedatectl | grep "Time zone"

================================================================================
SECTION 6: SERVICE DEPLOYMENT & WEB SERVERS
================================================================================
[ ] 6.1 Install and enable web server (Apache httpd):
        Command: dnf install httpd -y && systemctl enable httpd
[ ] 6.2 Test Apache configuration syntax:
        Command: apachectl configtest
[ ] 6.3 Set proper SELinux contexts on DocumentRoot directories:
        Command: semanage fcontext -a -t httpd_sys_content_t "/var/www/html(/.*)?"
        Command: restorecon -Rv /var/www/html
[ ] 6.4 Apply standard directory and file permissions:
        Command: find /var/www/html -type d -exec chmod 755 {} \;
        Command: find /var/www/html -type f -exec chmod 644 {} \;
[ ] 6.5 Verify local service responsiveness:
        Command: curl -I http://localhost:8080/

================================================================================
SECTION 7: LOGGING, AUDITING & BACKUP VERIFICATION
================================================================================
[ ] 7.1 Verify journald and rsyslog persistence:
        Command: journalctl --disk-usage && systemctl status rsyslog
[ ] 7.2 Confirm logrotate is scheduled and operational:
        Command: systemctl list-timers | grep logrotate
[ ] 7.3 Configure backup target agent or scheduled rsync task:
        Command: crontab -l | grep backup
[ ] 7.4 Perform test backup and test restoration run:
        Action: Document backup checksum and restore verification timestamp
[ ] 7.5 Record deployment details in Nova Systems internal inventory sheet.

================================================================================
Sign-off:
Deployer: ________________________   Date: ______________   Status: PASS / FAIL
Reviewer: ________________________   Date: ______________   Ticket: #___________
================================================================================

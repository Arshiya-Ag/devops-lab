# Nova Systems — Download Center (`dl.nova.test`)

A production-grade, responsive static software distribution and technical resources portal operated by **Nova Systems**, an enterprise IT services and software development company.

This portal is part of an internal Linux infrastructure simulation on Rocky Linux, designed to run on an Apache HTTP Server alongside the primary Nova Systems corporate website (`www.nova.test:8080`) using name-based VirtualHosts.

---

## 1. Project Overview

Nova Download Center provides a centralized distribution platform where business clients, system administrators, and infrastructure engineers can discover upcoming Nova Systems software applications, access verified Linux deployment checklists, download network inventory spreadsheets, and inspect cryptographic SHA-256 verification hashes.

- **Portal Name:** Nova Download Center
- **Internal Domain:** `dl.nova.test`
- **Target URL:** `http://dl.nova.test:8080`
- **Parent Company:** Nova Systems (`www.nova.test:8080`)
- **Tagline:** *"Everything you need. One place."*

---

## 2. Key Features

- **Enterprise Brand Identity:** Styled using Nova Systems' official palette (Midnight Navy `#101C34`, Primary Blue `#2563EB`, Cyan Accent `#06B6D4`, White `#FFFFFF`, Light Background `#F5F7FB`, Slate Gray `#64748B`).
- **Interactive Software Catalog:** Client-side search, category filtering (*Monitoring*, *Backup*, *Administration*, *Networking*), and sorting (*Name A-Z*, *Name Z-A*, *Category*) powered by vanilla JavaScript.
- **Genuine Demonstration Downloads:** Actual physical files located under `downloads/resources/` with verified file sizes and authoritative SHA-256 checksums.
- **One-Click Checksum Copying:** Automatic clipboard copying of 64-character SHA-256 hashes with visual confirmation feedback.
- **Zero External Dependencies:** Built without external CDNs, Google Fonts, or third-party JS libraries. Works 100% offline in air-gapped lab environments.
- **Accessible & Responsive:** Semantic HTML5, accessible ARIA controls, mobile drawer navigation, visible focus indicators, and `prefers-reduced-motion` compliance.

---

## 3. Technology Stack

- **Markup:** HTML5 (Semantic, ARIA-labeled)
- **Styling:** CSS3 (Custom properties, CSS Grid, Flexbox, Fluid Typography)
- **Interactivity:** Vanilla JavaScript (ES6+, zero runtime dependencies, zero build steps)
- **Vector Graphics:** Original inline and standalone SVG assets
- **Deployment Platform:** Apache HTTP Server (`httpd`) on Rocky Linux 9.x

---

## 4. Directory Structure

```
nova-download-center/
├── index.html                           # Portal Homepage (Hero, Search, Featured Tools, Categories)
├── software.html                        # Interactive Software Catalog (Search, Filter, Sort, Specs)
├── resources.html                       # Demonstration Resources & Direct Downloads
├── about.html                           # Purpose, Pillars & Parent Company Relationship
├── support.html                         # FAQ Accordion, Verification Guide & Lab Contact
├── assets/
│   ├── css/
│   │   └── styles.css                   # Master Enterprise Stylesheet
│   ├── js/
│   │   ├── catalog-data.js              # Centralized Software & Resource Data Module
│   │   └── main.js                      # Search, Filtering, Sorting, Modal & Nav Logic
│   ├── icons/
│   │   └── favicon.svg                  # Nova Download Center SVG Favicon
│   └── images/                          # Static Graphics Directory
├── downloads/
│   └── resources/
│       ├── nova-infrastructure-checklist.md   # Deployment Checklist (Markdown, 6.2 KB)
│       ├── nova-network-inventory-template.csv # Network Inventory Sheet (CSV, 1.8 KB)
│       ├── nova-server-deployment-notes.md     # Server Deployment Manual (Markdown, 4.5 KB)
│       └── nova-resource-pack.zip             # Complete Valid Archive Bundle (ZIP, 5.6 KB)
└── README.md                            # Technical & Deployment Documentation
```

---

## 5. Available Demonstration Downloads & Checksums

All resources located under `downloads/resources/` are real files. The sizes and SHA-256 hashes below are verified:

| File Name | Format | Version | Size | Authoritative SHA-256 Checksum |
|-----------|--------|---------|------|--------------------------------|
| `nova-infrastructure-checklist.md` | Markdown | v1.2 | 6.2 KB (6,306 bytes) | `d5a06ae45e59a9986d42e89f3ee493cb68d2ea59c299be7e156f6d127ec55adb` |
| `nova-network-inventory-template.csv` | CSV | v1.1 | 1.8 KB (1,837 bytes) | `896593e60bd16c89826a59598abd98d5c2d3ccf88538df36638f9fb762b7f146` |
| `nova-server-deployment-notes.md` | Markdown | v2.0 | 4.5 KB (4,647 bytes) | `f9c040e6cfe94c64e13ee07e6d3409e0bf2c0a39e540a25e32dd07600ee0f8f4` |
| `nova-resource-pack.zip` | ZIP Archive | v2026.1 | 5.6 KB (5,715 bytes) | `3b5abf40ec977ecd5675c64050324032d9b2292b8d5a45426f2029da120c2349` |

### Integrity Verification Example:
```bash
# Verify checksum on Linux / Rocky Linux:
sha256sum downloads/resources/nova-resource-pack.zip

# Verify archive internal integrity:
unzip -t downloads/resources/nova-resource-pack.zip
```

---

## 6. Local Testing Instructions

### Option A: Python HTTP Server (Recommended)
```bash
cd /home/arshiya/.gemini/antigravity/scratch/nova-download-center
python3 -m http.server 8080
```
Open your browser and navigate to:
```
http://localhost:8080
```

### Option B: Node.js / npx (if installed)
```bash
npx serve -l 8080
```

---

## 7. Apache Deployment Guide (Rocky Linux)

The website is designed to be deployed to an Apache DocumentRoot without modifying source code or using URL rewrites.

### 7.1 Target DocumentRoot
Create a dedicated DocumentRoot for the download portal (e.g. `/var/www/html/nova-dl` or `/var/www/html/dl`):

```bash
# 1. Create target directory
sudo mkdir -p /var/www/html/nova-dl

# 2. Copy website files
sudo cp -r /home/arshiya/.gemini/antigravity/scratch/nova-download-center/* /var/www/html/nova-dl/

# 3. Set standard SELinux security contexts
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/html/nova-dl(/.*)?"
sudo restorecon -Rv /var/www/html/nova-dl

# 4. Enforce proper ownership and file permissions
sudo chown -R apache:apache /var/www/html/nova-dl
sudo find /var/www/html/nova-dl -type d -exec chmod 755 {} \;
sudo find /var/www/html/nova-dl -type f -exec chmod 644 {} \;
```

### 7.2 Apache VirtualHost Configuration
To practice name-based VirtualHosts alongside the corporate website (`www.nova.test`), configure a VirtualHost file such as `/etc/httpd/conf.d/dl.nova.test.conf`:

```apache
# /etc/httpd/conf.d/dl.nova.test.conf
<VirtualHost 10.88.20.21:8080>
    ServerName dl.nova.test
    ServerAdmin support@nova.test
    DocumentRoot /var/www/html/nova-dl

    DirectoryIndex index.html

    <Directory /var/www/html/nova-dl>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>

    # Enable appropriate MIME types for downloads
    AddType text/markdown .md
    AddType text/csv .csv
    AddType application/zip .zip

    ErrorLog logs/dl.nova.test_error.log
    CustomLog logs/dl.nova.test_access.log combined
</VirtualHost>
```

Verify syntax and reload Apache:
```bash
sudo apachectl configtest
sudo systemctl reload httpd
```

### 7.3 DNS Record Requirement
In your BIND authoritative zone file for `nova.test`:
```zone
dl.nova.test.    IN    A    10.88.20.21
```
Or in `/etc/hosts` for local workstation testing:
```
10.88.20.21    dl.nova.test www.nova.test
```

---

## 8. Catalog Maintenance & Extension Guide

### 8.1 Adding a New Software Entry
Open `assets/js/catalog-data.js` and add an object to the `software` array:

```javascript
{
  id: "nova-new-tool",
  name: "Nova SysLog Observer",
  category: "Monitoring",
  tagline: "Real-time log stream aggregator",
  description: "Automated journald log monitor for Rocky Linux.",
  supportedOS: "Linux (Rocky 9, RHEL 9)",
  version: "1.0.0-preview",
  status: "Coming Soon",
  badgeClass: "badge-warning",
  iconType: "terminal",
  plannedRelease: "Q3 2027",
  division: "Software Development"
}
```
The catalog UI on `software.html` and search on `index.html` update automatically!

### 8.2 Adding a New Downloadable Resource
1. Place the physical file in `downloads/resources/<your-file>`.
2. Compute the exact file size and SHA-256 hash:
   ```bash
   sha256sum downloads/resources/<your-file>
   ls -lh downloads/resources/<your-file>
   ```
3. Append an entry to the `resources` array in `assets/js/catalog-data.js`.

---

## 9. Known Limitations & Simulation Disclaimers

- **Static Front-End Only:** The website does not contain backend PHP, Node.js, database, or email transfer servers.
- **Fictional Lab Addresses:** `support@nova.test` and internal hostnames (`dl.nova.test`, `www.nova.test`) are internal simulation identifiers.
- **Software Concept Status:** Applications listed with "Coming Soon" do not publish fake executables. Only genuine demonstration templates in the Resources section contain downloadable files.

---

## 10. Future Infrastructure Learning Scenarios

This portal was specifically structured to support upcoming Linux system administration training exercises:
1. **Protected Employee Directory:** Implementing Apache Basic Authentication (`.htpasswd` or LDAP) on a restricted `/downloads/internal/` path.
2. **Nginx Reverse Proxy:** Terminating traffic on Nginx port 80/443 and proxying to Apache port 8080 with `proxy_pass` and `X-Forwarded-*` headers.
3. **HTTP Caching & Compression:** Testing Apache `mod_deflate` and `mod_expires` caching policies on static `.md`, `.csv`, `.zip`, and `.svg` files.
4. **TLS / HTTPS Deployment:** Generating internal Certificate Authority (CA) certificates and configuring HTTPS VirtualHosts on port 8443 or 443.

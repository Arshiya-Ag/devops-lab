/**
 * Nova Download Center — Catalog Data Module
 * Version: 1.0.0
 * 
 * Organized data repository for software catalog entries and downloadable resources.
 * Designed to easily accommodate future product additions and release lifecycle changes.
 */

window.NOVA_CATALOG = {
  // Software products (proposed and conceptual applications)
  software: [
    {
      id: "nova-monitor-agent",
      name: "Nova Monitor Agent",
      category: "Monitoring",
      tagline: "Lightweight infrastructure telemetry and health observer",
      description: "A proposed telemetry and monitoring agent engineered to collect host performance metrics, CPU/memory pressure, storage exhaustion alerts, and service daemon uptime for SMB server environments.",
      supportedOS: "Linux (Rocky, RHEL, Ubuntu), Windows Server",
      version: "0.9.0-preview",
      status: "Coming Soon",
      isDownloadable: false,
      badgeClass: "badge-warning",
      iconType: "monitor",
      features: [
        "Minimal resource footprint (< 25MB RAM)",
        "Automated disk and filesystem pressure detection",
        "Encrypted local telemetry queueing",
        "Out-of-the-box systemd service integration"
      ],
      plannedRelease: "Q1 2027",
      division: "IT Infrastructure & Operations"
    },
    {
      id: "nova-backup-utility",
      name: "Nova Backup Utility",
      category: "Backup",
      tagline: "Automated snapshot and differential backup orchestration",
      description: "A proposed backup management utility designed for small and medium businesses. Offers scheduled LVM snapshots, differential rsync data transfers, and automated archive validation according to the 3-2-1 rule.",
      supportedOS: "Enterprise Linux 8/9, Rocky Linux, Debian",
      version: "1.0.0-rc1",
      status: "Coming Soon",
      isDownloadable: false,
      badgeClass: "badge-warning",
      iconType: "backup",
      features: [
        "Configurable retention policies (Daily, Weekly, Monthly)",
        "Pre-freeze and post-thaw application hook support",
        "Built-in SHA-256 archive verification manifests",
        "Local volume and remote SFTP/NFS target storage"
      ],
      plannedRelease: "Q2 2027",
      division: "IT Infrastructure & Operations"
    },
    {
      id: "nova-admin-toolkit",
      name: "Nova Admin Toolkit",
      category: "Administration",
      tagline: "Standardized system provisioning and configuration validator",
      description: "A proposed suite of command-line administration helpers, network interface validators, SELinux policy helpers, and standard user provisioning templates built for Linux systems administrators.",
      supportedOS: "Cross-platform CLI (Linux, macOS, Windows Terminal)",
      version: "0.5.0-dev",
      status: "Coming Soon",
      isDownloadable: false,
      badgeClass: "badge-warning",
      iconType: "terminal",
      features: [
        "NetworkManager configuration syntax validation",
        "Apache and Nginx VirtualHost syntax checking wrapper",
        "Automated file permission & ownership standardizer",
        "Structured JSON/YAML environment status reporting"
      ],
      plannedRelease: "Q2 2027",
      division: "Software Development"
    },
    {
      id: "nova-network-diagnostics",
      name: "Nova Network Diagnostics",
      category: "Networking",
      tagline: "Subnet connectivity, MTU validation, and path tracing",
      description: "A proposed diagnostic utility package designed to accelerate IT infrastructure troubleshooting. Performs automated DNS record propagation tests, gateway latency analysis, and port accessibility audits.",
      supportedOS: "Linux, Windows Server 2022",
      version: "1.1.0-alpha",
      status: "Coming Soon",
      isDownloadable: false,
      badgeClass: "badge-warning",
      iconType: "network",
      features: [
        "Local authoritative and upstream recursive DNS resolver probes",
        "Path MTU discovery and packet fragmentation verification",
        "Automated CIDR subnet overlap detection",
        "Interactive CLI dashboard with CSV export capability"
      ],
      plannedRelease: "Q3 2027",
      division: "Security & Consulting"
    }
  ],

  // Real, physically downloadable demonstration resources
  resources: [
    {
      id: "res-infra-checklist",
      name: "Nova Infrastructure Deployment Checklist",
      category: "Documentation",
      fileType: "Markdown (.md)",
      fileName: "nova-infrastructure-checklist.md",
      filePath: "downloads/resources/nova-infrastructure-checklist.md",
      fileSize: "6.2 KB",
      fileSizeBytes: 6306,
      version: "1.2",
      sha256: "d5a06ae45e59a9986d42e89f3ee493cb68d2ea59c299be7e156f6d127ec55adb",
      status: "Available",
      isDownloadable: true,
      badgeClass: "badge-success",
      iconType: "checklist",
      description: "An operational verification checklist covering system baselines, LVM storage, static networking, SELinux enforcement, SSH hardening, and Apache web service deployment.",
      applicableFor: "Rocky Linux 9, Enterprise Linux, System Administrators"
    },
    {
      id: "res-net-template",
      name: "Nova Network Inventory Template",
      category: "Technical Resources",
      fileType: "CSV Spreadsheet (.csv)",
      fileName: "nova-network-inventory-template.csv",
      filePath: "downloads/resources/nova-network-inventory-template.csv",
      fileSize: "1.8 KB",
      fileSizeBytes: 1837,
      version: "1.1",
      sha256: "896593e60bd16c89826a59598abd98d5c2d3ccf88538df36638f9fb762b7f146",
      status: "Available",
      isDownloadable: true,
      badgeClass: "badge-success",
      iconType: "spreadsheet",
      description: "A production-grade CSV data template for cataloging IP assignments, hostnames, roles, subnets, VLANs, and operational statuses across server fleets.",
      applicableFor: "Network Engineers, Infrastructure Planners, Audit Teams"
    },
    {
      id: "res-deploy-notes",
      name: "Nova Server Deployment Notes",
      category: "Documentation",
      fileType: "Markdown (.md)",
      fileName: "nova-server-deployment-notes.md",
      filePath: "downloads/resources/nova-server-deployment-notes.md",
      fileSize: "4.5 KB",
      fileSizeBytes: 4647,
      version: "2.0",
      sha256: "f9c040e6cfe94c64e13ee07e6d3409e0bf2c0a39e540a25e32dd07600ee0f8f4",
      status: "Available",
      isDownloadable: true,
      badgeClass: "badge-success",
      iconType: "guide",
      description: "Comprehensive reference manual outlining architecture principles, LVM partition best practices, NetworkManager configurations, Apache VirtualHost management, and 3-2-1 backup verification.",
      applicableFor: "Linux Administrators, Hosting Engineers, Cloud Architects"
    },
    {
      id: "res-resource-pack",
      name: "Nova Complete Resource Pack (Bundle)",
      category: "System Utilities",
      fileType: "ZIP Archive (.zip)",
      fileName: "nova-resource-pack.zip",
      filePath: "downloads/resources/nova-resource-pack.zip",
      fileSize: "5.6 KB",
      fileSizeBytes: 5715,
      version: "2026.1",
      sha256: "3b5abf40ec977ecd5675c64050324032d9b2292b8d5a45426f2029da120c2349",
      status: "Available",
      isDownloadable: true,
      badgeClass: "badge-success",
      iconType: "archive",
      description: "Consolidated, compressed ZIP distribution containing the Infrastructure Checklist, Network Inventory Template, and Server Deployment Notes ready for offline lab extraction.",
      applicableFor: "All Administrators, Offline Training, Air-Gapped Environments"
    }
  ]
};

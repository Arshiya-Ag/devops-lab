# Nova Systems — Corporate Website

A professional, responsive corporate website for **Nova Systems**, a fictional IT and software solutions company. Built with static HTML5, CSS3, and vanilla JavaScript — no frameworks, no build tools, no external dependencies.

---

## Project Structure

```
nova/
├── index.html          # Homepage
├── about.html          # About Us
├── services.html       # Services (4 divisions)
├── solutions.html      # Industry Solutions
├── careers.html        # Careers & Culture
├── contact.html        # Contact form
├── assets/
│   ├── css/
│   │   └── styles.css  # All site styles
│   ├── js/
│   │   └── main.js     # Navigation, animations, form handling
│   ├── icons/
│   │   └── favicon.svg # Site favicon
│   └── images/         # (Reserved for future images)
└── README.md
```

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, divisions overview, why us, approach, CTA |
| About | `about.html` | Company intro, mission/vision, values, philosophy |
| Services | `services.html` | Detailed 4-division service pages with anchors |
| Solutions | `solutions.html` | Industry-specific solutions (4 sectors) |
| Careers | `careers.html` | Culture, departments, speculative enquiries |
| Contact | `contact.html` | Contact form (front-end demo), info, enquiry types |

---

## Running Locally

Since this is a static website, you can open it directly in a browser:

### Option 1 — Open directly (simplest)
```bash
# Open the homepage in your default browser
xdg-open /path/to/nova/index.html
# or on macOS:
open /path/to/nova/index.html
```

> **Note:** Some browsers restrict relative links when using `file://` URLs. If navigation between pages does not work, use a local server instead.

### Option 2 — Python local server (recommended for testing)
```bash
cd /path/to/nova
python3 -m http.server 8080
# Then visit: http://localhost:8080
```

### Option 3 — Any static file server
```bash
# Using Node's http-server (if available)
npx http-server . -p 8080
```

---

## Apache Deployment

The site is designed to deploy to the following Apache DocumentRoot:

```
/var/www/html/nova/
```

With the VirtualHost configured for:
```
http://www.nova.test:8080
```

### Deployment Steps

1. Copy all website files to the server:
   ```bash
   # From the nova directory
   scp -r . user@server:/var/www/html/nova/
   # or via rsync:
   rsync -av --delete ./ user@server:/var/www/html/nova/
   ```

2. Set correct file permissions:
   ```bash
   sudo chown -R apache:apache /var/www/html/nova/
   sudo chmod -R 644 /var/www/html/nova/
   sudo chmod 755 /var/www/html/nova/
   sudo find /var/www/html/nova/ -type d -exec chmod 755 {} \;
   ```

3. Verify Apache can serve the files:
   ```bash
   curl -s http://www.nova.test:8080/ | head -20
   ```

> No Apache module changes, rewrite rules, or server configuration modifications are required.

---

## Technical Notes

### No External Dependencies
- No CDN fonts — uses Inter via system font stack
- No external images — all illustrations are inline SVG
- No JavaScript libraries — vanilla JS only
- No build process — edit files and deploy directly

### Browser Support
- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

### Accessibility
- Semantic HTML5 elements throughout
- ARIA labels on interactive elements
- Keyboard navigation supported
- Focus visible styles
- Respects `prefers-reduced-motion`
- Appropriate colour contrast ratios

---

## Manual Testing Checklist

### Navigation
- [ ] All 6 pages load without errors
- [ ] Active page is highlighted in nav
- [ ] Logo links back to homepage on every page
- [ ] Mobile menu opens and closes correctly
- [ ] Mobile menu closes when a link is clicked
- [ ] "Contact Us" CTA button visible on all pages

### Homepage
- [ ] Hero section displays with animated glow effects
- [ ] Hero network illustration renders
- [ ] All 4 division cards display and hover correctly
- [ ] "Why Choose Us" grid renders in 3 columns (desktop)
- [ ] Approach steps render with counter numbers
- [ ] CTA band renders correctly

### Services Page
- [ ] All 4 anchor IDs work: `#infrastructure`, `#software`, `#security`, `#support`
- [ ] Service list items render with cyan dots
- [ ] SVG illustrations visible in dark panels

### Solutions Page
- [ ] All 4 industry solution cards render
- [ ] Challenge boxes display with blue left border
- [ ] Solution feature checkmarks visible (cyan SVG)

### Careers Page
- [ ] No fake job listings present
- [ ] "No active positions" notice clearly visible
- [ ] Culture cards and department cards render

### Contact Page
- [ ] Form renders with all required fields
- [ ] Form validation prevents empty required field submission
- [ ] Submit button shows "Sending…" state briefly
- [ ] Success message appears after simulated submit
- [ ] `support@nova.test` labelled as internal lab placeholder

### Responsive
- [ ] All pages usable on 375px (mobile)
- [ ] All pages usable on 768px (tablet)
- [ ] All pages usable on 1280px (desktop)
- [ ] Text remains readable at all breakpoints
- [ ] Images/SVGs scale correctly

### Performance / Quality
- [ ] No browser console errors
- [ ] All relative links work
- [ ] No broken image references
- [ ] No Lorem Ipsum text anywhere
- [ ] No fake testimonials, client names, or fabricated metrics

---

## Design System

### Colours

| Name | Hex | Usage |
|------|-----|-------|
| Midnight Navy | `#101C34` | Backgrounds, headers |
| Primary Blue | `#2563EB` | Buttons, links, icons |
| Cyan Accent | `#06B6D4` | Highlights, accents |
| White | `#FFFFFF` | Text on dark, card backgrounds |
| Light Background | `#F5F7FB` | Alternating section backgrounds |
| Slate Gray | `#64748B` | Secondary text |

### Typography
- Font: Inter → System UI stack fallback
- Scale: `clamp()` for fluid responsive sizing

### Key CSS Classes
- `.container` — max-width 1200px centred layout
- `.section` — standard section padding
- `.section--light` — light background variant
- `.section--navy` — dark navy background
- `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-cyan` — button variants
- `.card`, `.division-card`, `.solution-card` — card components
- `.fade-up` + `.stagger-N` — scroll-triggered animation classes

---

## Important Notes

- `support@nova.test` is a **fictional internal lab placeholder** — not a real email address.
- No real company address, phone number, or business registration details are present.
- The contact form is a **front-end demonstration only** — no data is transmitted.
- No real client names, partnerships, certifications, or business achievements are claimed.
- Internal server details (IPs, hostnames, DNS config) are not exposed in any page content.

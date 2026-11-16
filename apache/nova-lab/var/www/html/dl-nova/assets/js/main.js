/**
 * Nova Systems Download Center — Main Application Script
 * Vanilla JavaScript (No external dependencies)
 */

(function () {
  'use strict';

  // Wait until DOM is ready
  document.addEventListener('DOMContentLoaded', initApp);

  function initApp() {
    initNavigation();
    initCopyButtons();
    initFaqAccordion();
    initGlobalSearch();
    initCatalogFeatures();
    initModal();
  }

  /* ============================================================
     1. Navigation & Mobile Drawer
     ============================================================ */
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('nav-mobile');

    // Sticky nav scroll effect
    if (navbar) {
      window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      }, { passive: true });
    }

    // Mobile menu toggle
    if (toggle && mobileMenu) {
      toggle.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

        const spans = toggle.querySelectorAll('span');
        if (spans.length === 3) {
          if (isOpen) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
          } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
          }
        }
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(e.target) &&
            !toggle.contains(e.target)) {
          closeMobileMenu();
        }
      });

      // Close on Esc key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          closeMobileMenu();
        }
      });

      // Close when clicking any nav link
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMobileMenu);
      });
    }

    function closeMobileMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove('open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        const spans = toggle.querySelectorAll('span');
        if (spans.length === 3) {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      }
    }

    // Highlight active nav item
    markActiveNavLink();
  }

  function markActiveNavLink() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a, .nav-mobile a');
    links.forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === currentFile || (currentFile === '' && href === 'index.html')) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     2. Copy SHA-256 Checksum to Clipboard
     ============================================================ */
  function initCopyButtons() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-copy-hash');
      if (!btn) return;

      const hash = btn.getAttribute('data-hash');
      if (!hash) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(hash).then(function () {
          showCopyFeedback(btn);
        }).catch(function () {
          fallbackCopyText(hash, btn);
        });
      } else {
        fallbackCopyText(hash, btn);
      }
    });
  }

  function fallbackCopyText(text, btn) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(btn);
    } catch (err) {
      console.warn('Unable to copy text', err);
    }
    document.body.removeChild(input);
  }

  function showCopyFeedback(btn) {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  }

  /* ============================================================
     3. FAQ Accordion (Support Page)
     ============================================================ */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;

      btn.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        
        // Optionally close other items for clean accordion effect
        faqItems.forEach(function (other) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ============================================================
     4. Global Search (Homepage Dropdown)
     ============================================================ */
  function initGlobalSearch() {
    const homeSearchInput = document.getElementById('home-search-input');
    const homeDropdown = document.getElementById('home-search-dropdown');
    const clearBtn = document.getElementById('home-search-clear');

    if (!homeSearchInput || !homeDropdown || !window.NOVA_CATALOG) return;

    homeSearchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      if (clearBtn) clearBtn.classList.toggle('visible', query.length > 0);

      if (query.length < 2) {
        homeDropdown.classList.remove('open');
        homeDropdown.innerHTML = '';
        return;
      }

      const results = performGlobalSearch(query);
      renderHomeSearchResults(results, homeDropdown);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        homeSearchInput.value = '';
        clearBtn.classList.remove('visible');
        homeDropdown.classList.remove('open');
        homeDropdown.innerHTML = '';
        homeSearchInput.focus();
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
      if (!homeSearchInput.contains(e.target) && !homeDropdown.contains(e.target)) {
        homeDropdown.classList.remove('open');
      }
    });
  }

  function performGlobalSearch(query) {
    const softwareMatches = (window.NOVA_CATALOG.software || []).filter(function (item) {
      return item.name.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query) ||
             item.description.toLowerCase().includes(query) ||
             item.supportedOS.toLowerCase().includes(query);
    }).map(function (item) {
      return Object.assign({}, item, { type: 'Software', targetUrl: 'software.html?search=' + encodeURIComponent(item.name) });
    });

    const resourceMatches = (window.NOVA_CATALOG.resources || []).filter(function (item) {
      return item.name.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query) ||
             item.description.toLowerCase().includes(query) ||
             item.fileType.toLowerCase().includes(query);
    }).map(function (item) {
      return Object.assign({}, item, { type: 'Resource', targetUrl: 'resources.html?search=' + encodeURIComponent(item.name) });
    });

    return softwareMatches.concat(resourceMatches);
  }

  function renderHomeSearchResults(results, container) {
    container.innerHTML = '';
    if (results.length === 0) {
      container.innerHTML = '<div class="search-empty">No software or resources match your query. Try searching for "monitoring", "checklist", or "backup".</div>';
      container.classList.add('open');
      return;
    }

    results.forEach(function (res) {
      const a = document.createElement('a');
      a.className = 'search-dropdown-item';
      a.href = res.targetUrl;

      const badgeClass = res.status === 'Available' ? 'badge-success' : 'badge-warning';

      a.innerHTML = `
        <div class="search-item-info">
          <span class="search-item-title">${escapeHtml(res.name)}</span>
          <span class="search-item-meta">${escapeHtml(res.type)} • ${escapeHtml(res.category)}</span>
        </div>
        <span class="badge ${badgeClass}">${escapeHtml(res.status)}</span>
      `;
      container.appendChild(a);
    });

    container.classList.add('open');
  }

  /* ============================================================
     5. Software & Resource Catalog Interactive Filtering
     ============================================================ */
  function initCatalogFeatures() {
    // Software catalog page
    const softwareGrid = document.getElementById('software-grid');
    if (softwareGrid && window.NOVA_CATALOG) {
      setupSoftwareCatalog(softwareGrid);
    }

    // Resources catalog page
    const resourcesGrid = document.getElementById('resources-grid');
    if (resourcesGrid && window.NOVA_CATALOG) {
      setupResourcesCatalog(resourcesGrid);
    }
  }

  function setupSoftwareCatalog(grid) {
    const searchInput = document.getElementById('software-search-input');
    const clearBtn = document.getElementById('software-search-clear');
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    const sortSelect = document.getElementById('software-sort-select');
    const resultCount = document.getElementById('software-result-count');

    let currentCategory = 'all';
    let currentSearch = '';
    let currentSort = 'name-asc';

    // Parse URL params for pre-filled search or category
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('search')) {
      currentSearch = urlParams.get('search');
      if (searchInput) searchInput.value = currentSearch;
      if (clearBtn) clearBtn.classList.add('visible');
    }
    if (urlParams.has('category')) {
      currentCategory = urlParams.get('category').toLowerCase();
      filterButtons.forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter').toLowerCase() === currentCategory);
      });
    }

    function render() {
      let items = (window.NOVA_CATALOG.software || []).slice();

      // Filter by category
      if (currentCategory !== 'all') {
        items = items.filter(function (item) {
          return item.category.toLowerCase() === currentCategory.toLowerCase();
        });
      }

      // Filter by search query
      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        items = items.filter(function (item) {
          return item.name.toLowerCase().includes(q) ||
                 item.category.toLowerCase().includes(q) ||
                 item.description.toLowerCase().includes(q) ||
                 item.supportedOS.toLowerCase().includes(q);
        });
      }

      // Sort
      if (currentSort === 'name-asc') {
        items.sort((a, b) => a.name.localeCompare(b.name));
      } else if (currentSort === 'name-desc') {
        items.sort((a, b) => b.name.localeCompare(a.name));
      } else if (currentSort === 'category') {
        items.sort((a, b) => a.category.localeCompare(b.category));
      }

      if (resultCount) {
        resultCount.textContent = `Showing ${items.length} ${items.length === 1 ? 'product' : 'products'}`;
      }

      grid.innerHTML = '';
      if (items.length === 0) {
        grid.innerHTML = `
          <div class="empty-catalog-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3>No software found</h3>
            <p>No products match "${escapeHtml(currentSearch || currentCategory)}". Try clearing your search filter.</p>
            <button class="btn btn-primary btn-sm mt-3" id="reset-software-filters">Reset Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-software-filters');
        if (resetBtn) {
          resetBtn.addEventListener('click', function () {
            currentCategory = 'all';
            currentSearch = '';
            if (searchInput) searchInput.value = '';
            if (clearBtn) clearBtn.classList.remove('visible');
            filterButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'all'));
            render();
          });
        }
        return;
      }

      items.forEach(function (product) {
        const card = document.createElement('div');
        card.className = 'card software-card';
        card.innerHTML = `
          <div class="card-top">
            <div class="card-icon card-icon--blue">
              ${getProductIconSvg(product.iconType)}
            </div>
            <div class="card-header-meta">
              <span class="badge ${product.badgeClass}">${escapeHtml(product.status)}</span>
              <span class="badge badge-slate">${escapeHtml(product.category)}</span>
            </div>
          </div>
          <h3 class="card-title">${escapeHtml(product.name)}</h3>
          <p class="card-desc">${escapeHtml(product.description)}</p>
          <div class="card-meta-list">
            <div class="card-meta-row">
              <span>Platform:</span>
              <strong>${escapeHtml(product.supportedOS)}</strong>
            </div>
            <div class="card-meta-row">
              <span>Version:</span>
              <strong>${escapeHtml(product.version)}</strong>
            </div>
            <div class="card-meta-row">
              <span>Release Phase:</span>
              <strong class="text-slate">${escapeHtml(product.plannedRelease)}</strong>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline btn-sm w-full btn-view-details" data-product-id="${escapeHtml(product.id)}">
              View Specifications &amp; Roadmap
            </button>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    // Attach event listeners
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        currentSearch = this.value.trim();
        if (clearBtn) clearBtn.classList.toggle('visible', currentSearch.length > 0);
        render();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        currentSearch = '';
        clearBtn.classList.remove('visible');
        render();
        searchInput.focus();
      });
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.getAttribute('data-filter');
        render();
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        currentSort = this.value;
        render();
      });
    }

    // Initial render
    render();
  }

  function setupResourcesCatalog(grid) {
    const searchInput = document.getElementById('resources-search-input');
    const clearBtn = document.getElementById('resources-search-clear');
    const sortSelect = document.getElementById('resources-sort-select');
    const resultCount = document.getElementById('resources-result-count');

    let currentSearch = '';
    let currentSort = 'name-asc';

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('search')) {
      currentSearch = urlParams.get('search');
      if (searchInput) searchInput.value = currentSearch;
      if (clearBtn) clearBtn.classList.add('visible');
    }

    function render() {
      let items = (window.NOVA_CATALOG.resources || []).slice();

      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        items = items.filter(function (item) {
          return item.name.toLowerCase().includes(q) ||
                 item.category.toLowerCase().includes(q) ||
                 item.description.toLowerCase().includes(q) ||
                 item.fileType.toLowerCase().includes(q);
        });
      }

      if (currentSort === 'name-asc') {
        items.sort((a, b) => a.name.localeCompare(b.name));
      } else if (currentSort === 'name-desc') {
        items.sort((a, b) => b.name.localeCompare(a.name));
      } else if (currentSort === 'size') {
        items.sort((a, b) => (b.fileSizeBytes || 0) - (a.fileSizeBytes || 0));
      }

      if (resultCount) {
        resultCount.textContent = `Showing ${items.length} ${items.length === 1 ? 'resource' : 'resources'}`;
      }

      grid.innerHTML = '';
      if (items.length === 0) {
        grid.innerHTML = `
          <div class="empty-catalog-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <h3>No resources found</h3>
            <p>No downloadable files match "${escapeHtml(currentSearch)}".</p>
            <button class="btn btn-primary btn-sm mt-3" id="reset-resources-filters">View All Resources</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-resources-filters');
        if (resetBtn) {
          resetBtn.addEventListener('click', function () {
            currentSearch = '';
            if (searchInput) searchInput.value = '';
            if (clearBtn) clearBtn.classList.remove('visible');
            render();
          });
        }
        return;
      }

      items.forEach(function (res) {
        const card = document.createElement('div');
        card.className = 'card resource-card';
        card.innerHTML = `
          <div class="card-top">
            <div class="card-icon card-icon--green">
              ${getResourceIconSvg(res.iconType)}
            </div>
            <div class="card-header-meta">
              <span class="badge badge-success">${escapeHtml(res.status)}</span>
              <span class="badge badge-cyan">${escapeHtml(res.category)}</span>
            </div>
          </div>
          <h3 class="card-title">${escapeHtml(res.name)}</h3>
          <p class="card-desc">${escapeHtml(res.description)}</p>
          
          <div class="card-meta-list">
            <div class="card-meta-row">
              <span>File Format:</span>
              <strong>${escapeHtml(res.fileType)}</strong>
            </div>
            <div class="card-meta-row">
              <span>Release Version:</span>
              <strong>v${escapeHtml(res.version)}</strong>
            </div>
            <div class="card-meta-row">
              <span>File Size:</span>
              <strong>${escapeHtml(res.fileSize)}</strong>
            </div>
            <div class="card-meta-row">
              <span>Applicable Systems:</span>
              <strong>${escapeHtml(res.applicableFor || 'Linux / Cross-platform')}</strong>
            </div>
          </div>

          <div class="checksum-box" title="SHA-256 Checksum">
            <span class="checksum-text">SHA256: ${escapeHtml(res.sha256)}</span>
            <button class="btn-copy-hash" data-hash="${escapeHtml(res.sha256)}" aria-label="Copy SHA-256 Checksum">
              Copy
            </button>
          </div>

          <div class="card-footer">
            <a href="${escapeHtml(res.filePath)}" download class="btn btn-download w-full" aria-label="Download ${escapeHtml(res.name)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download File (${escapeHtml(res.fileSize)})
            </a>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        currentSearch = this.value.trim();
        if (clearBtn) clearBtn.classList.toggle('visible', currentSearch.length > 0);
        render();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        searchInput.value = '';
        currentSearch = '';
        clearBtn.classList.remove('visible');
        render();
        searchInput.focus();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        currentSort = this.value;
        render();
      });
    }

    render();
  }

  /* ============================================================
     6. Product Specifications Modal
     ============================================================ */
  function initModal() {
    const overlay = document.getElementById('product-modal');
    if (!overlay) return;

    const closeBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-desc');
    const modalPlatform = document.getElementById('modal-platform');
    const modalVersion = document.getElementById('modal-version');
    const modalDivision = document.getElementById('modal-division');
    const modalRelease = document.getElementById('modal-release');
    const modalFeaturesList = document.getElementById('modal-features-list');

    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-view-details');
      if (!btn) return;

      const prodId = btn.getAttribute('data-product-id');
      if (!prodId || !window.NOVA_CATALOG) return;

      const product = (window.NOVA_CATALOG.software || []).find(p => p.id === prodId);
      if (!product) return;

      if (modalTitle) modalTitle.textContent = product.name;
      if (modalCategory) modalCategory.textContent = product.category;
      if (modalDesc) modalDesc.textContent = product.description;
      if (modalPlatform) modalPlatform.textContent = product.supportedOS;
      if (modalVersion) modalVersion.textContent = product.version;
      if (modalDivision) modalDivision.textContent = product.division || 'Engineering';
      if (modalRelease) modalRelease.textContent = product.plannedRelease;

      if (modalFeaturesList) {
        modalFeaturesList.innerHTML = '';
        (product.features || []).forEach(function (f) {
          const li = document.createElement('li');
          li.textContent = f;
          modalFeaturesList.appendChild(li);
        });
      }

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
  }

  /* ============================================================
     Helper SVG Icon Generators
     ============================================================ */
  function getProductIconSvg(type) {
    switch (type) {
      case 'monitor':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
      case 'backup':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>`;
      case 'terminal':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`;
      case 'network':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="6" height="6" rx="1"></rect><rect x="16" y="2" width="6" height="6" rx="1"></rect><rect x="9" y="16" width="6" height="6" rx="1"></rect><path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"></path><line x1="12" y1="13" x2="12" y2="16"></line></svg>`;
      default:
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
    }
  }

  function getResourceIconSvg(type) {
    switch (type) {
      case 'checklist':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`;
      case 'spreadsheet':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>`;
      case 'guide':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`;
      case 'archive':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>`;
      default:
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>`;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();

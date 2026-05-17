(function () {
  const data = window.researchMapData || { nodes: [], themes: [] };
  const svg = document.getElementById("graph-svg");
  const filterBar = document.getElementById("filter-bar");
  const repoList = document.getElementById("repo-list");
  const searchInput = document.getElementById("search-input");
  const modeTabs = Array.from(document.querySelectorAll(".mode-tab"));
  const starfield = document.getElementById("starfield");
  const paperCount = document.getElementById("paper-count");
  const themeCountElement = document.getElementById("theme-count");
  const outputCountElement = document.getElementById("output-count");
  const inputCountElement = document.getElementById("input-count");
  const questionCountElement = document.getElementById("question-count");

  const themeCount = new Set(data.nodes.flatMap((node) => node.themes)).size;
  const years = data.nodes.map((node) => Number(node.year)).filter(Boolean);
  const minYear = years.length ? Math.min.apply(null, years) : 0;
  const maxYear = years.length ? Math.max.apply(null, years) : 0;

  let activeTheme = "All";
  let selectedNodeId = data.nodes.find((node) => node.id === "damagearbiter")?.id || data.nodes[0]?.id || null;
  let hoveredNodeId = null;
  let activeMode = "network";
  let searchTerm = "";

  const graphRuntime = {
    nodeStates: new Map(),
    nodeElements: new Map(),
    links: [],
    particles: [],
    animationStarted: false,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  };

  if (!svg || !filterBar || !repoList || !searchInput || !paperCount || !data.nodes.length) {
    initStarfield();
    return;
  }

  paperCount.textContent = String(data.nodes.length);
  themeCountElement.textContent = String(themeCount);
  outputCountElement.textContent = String(data.counts?.output || data.nodes.filter((node) => node.kind === "output").length);
  inputCountElement.textContent = String(data.counts?.input || data.nodes.filter((node) => node.kind === "input").length);
  questionCountElement.textContent = String(data.counts?.question || data.nodes.filter((node) => node.kind === "question").length);

  function renderScholar(snapshot) {
    if (!snapshot || !snapshot.metrics) {
      return;
    }

    const citations = document.getElementById("scholar-citations");
    const hIndex = document.getElementById("scholar-hindex");
    const updated = document.getElementById("scholar-updated");
    const fetchedAt = snapshot.fetchedAt || snapshot.lastAttemptedAt;

    citations.textContent = String(snapshot.metrics.citations?.all || "--");
    hIndex.textContent = String(snapshot.metrics.hIndex?.all || "--");

    if (fetchedAt) {
      updated.textContent = "updated " + new Date(fetchedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  }

  function loadScholarSnapshot() {
    fetch("./raw/scholar/google-scholar.json", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then(renderScholar)
      .catch(() => {
        const updated = document.getElementById("scholar-updated");
        if (updated) {
          updated.textContent = "Scholar snapshot unavailable";
        }
      });
  }

  function filteredNodes() {
    const query = searchTerm.trim().toLowerCase();

    return data.nodes.filter((node) => {
      const themeMatch = activeTheme === "All" || node.themes.indexOf(activeTheme) >= 0;
      if (!themeMatch) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchable = [
        node.title,
        node.shortTitle,
        node.summary,
        node.impact,
        node.type,
        node.status,
        node.venue,
        node.authors,
        node.repository?.name,
        node.repository?.language,
        node.kind,
        node.source,
        node.role,
        node.metricLabel,
        ...(node.themes || []),
        ...(node.methods || [])
      ].join(" ").toLowerCase();

      return searchable.includes(query);
    });
  }

  function buildFilters() {
    data.themes.forEach((theme) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "filter-chip" + (theme === activeTheme ? " active" : "");
      button.textContent = theme;
      button.addEventListener("click", () => {
        activeTheme = theme;
        syncFilterState();
        renderAll();
      });
      filterBar.appendChild(button);
    });
  }

  function syncFilterState() {
    filterBar.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.classList.toggle("active", chip.textContent === activeTheme);
    });
  }

  function renderRepoList() {
    repoList.innerHTML = "";

    filteredNodes().forEach((node) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "repo-card" + (node.id === selectedNodeId ? " active" : "");

      const sourceName = node.repository?.name || node.source || "Knowledge source";
      const stats = node.metricLabel || (
        node.repository
          ? `${node.repository.language} | ${node.repository.commits} commits | ${node.repository.stars} stars`
          : node.displayKind
      );

      button.innerHTML = `
        <small>${node.displayKind || node.type} | ${node.year}</small>
        <strong>${node.shortTitle}</strong>
        <span>${sourceName}</span>
        <span>${stats}</span>
      `;

      button.addEventListener("click", () => {
        selectNode(node.id);
      });

      repoList.appendChild(button);
    });
  }

  function nodePosition(node, visibleNodes) {
    if (activeMode === "network") {
      return node.position;
    }

    if (activeMode === "timeline") {
      const yearSpan = Math.max(1, maxYear - minYear);
      const sameYearNodes = visibleNodes.filter((candidate) => candidate.year === node.year);
      const yearIndex = sameYearNodes.findIndex((candidate) => candidate.id === node.id);
      const x = 120 + ((node.year - minYear) / yearSpan) * 740;
      const y = 176 + yearIndex * 142;
      return { x, y };
    }

    if (activeMode === "flow") {
      const lanes = {
        input: 190,
        question: 500,
        output: 790
      };
      const laneNodes = visibleNodes.filter((candidate) => (candidate.kind || "output") === (node.kind || "output"));
      const laneIndex = laneNodes.findIndex((candidate) => candidate.id === node.id);
      const spacing = Math.max(72, Math.min(132, 520 / Math.max(1, laneNodes.length)));
      return {
        x: lanes[node.kind] || 790,
        y: 92 + laneIndex * spacing
      };
    }

    const rank = visibleNodes
      .slice()
      .sort((a, b) => nodeWeight(b) - nodeWeight(a));
    const index = rank.findIndex((candidate) => candidate.id === node.id);
    const angle = (Math.PI * 2 * index) / Math.max(1, rank.length) - Math.PI / 2;
    const radius = 170 + Math.min(140, nodeWeight(node) * 1.05);

    return {
      x: 490 + Math.cos(angle) * radius,
      y: 330 + Math.sin(angle) * radius
    };
  }

  function ensureNodeState(node, target) {
    const existing = graphRuntime.nodeStates.get(node.id);
    const repoWeight = Math.min(18, Math.round(nodeWeight(node) / 8));

    if (existing) {
      existing.targetX = target.x;
      existing.targetY = target.y;
      existing.radius = node.radius + repoWeight;
      return existing;
    }

    const seed = stringSeed(node.id);
    const state = {
      id: node.id,
      x: target.x,
      y: target.y,
      displayX: target.x,
      displayY: target.y,
      targetX: target.x,
      targetY: target.y,
      radius: node.radius + repoWeight,
      phase: seed * 0.017,
      floatSpeed: 0.00035 + (seed % 7) * 0.00004,
      floatAmp: 3 + (seed % 5)
    };

    graphRuntime.nodeStates.set(node.id, state);
    return state;
  }

  function renderGraph() {
    svg.innerHTML = "";
    graphRuntime.nodeElements.clear();
    graphRuntime.links = [];
    graphRuntime.particles = [];

    const defs = createSvg("defs");
    defs.innerHTML = `
      <filter id="node-glow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="4.5" result="blur"></feGaussianBlur>
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.22 0 0 0 0 0.95 0 0 0 0 0.78 0 0 0 0.78 0"></feColorMatrix>
        <feMerge>
          <feMergeNode></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    `;
    svg.appendChild(defs);

    const visibleNodes = filteredNodes();
    const visibleIds = new Set(visibleNodes.map((node) => node.id));
    const selected = data.nodes.find((node) => node.id === selectedNodeId);
    const hotIds = computeHotIds(selected, hoveredNodeId);

    const linkGroup = createSvg("g", { class: "link-layer" });
    const particleGroup = createSvg("g", { class: "particle-layer" });
    const nodeGroup = createSvg("g", { class: "node-layer" });
    svg.appendChild(linkGroup);
    svg.appendChild(particleGroup);
    svg.appendChild(nodeGroup);

    visibleNodes.forEach((node) => {
      ensureNodeState(node, nodePosition(node, visibleNodes));
    });

    visibleNodes.forEach((node) => {
      node.connections.forEach((connection) => {
        if (!visibleIds.has(connection.target)) {
          return;
        }

        const isHot = hotIds.has(node.id) && hotIds.has(connection.target);
        const path = createSvg("path", {
          class: "graph-link" + (isHot ? " hot" : "")
        });
        linkGroup.appendChild(path);

        const link = {
          sourceId: node.id,
          targetId: connection.target,
          path,
          curve: linkCurve(node.id, connection.target),
          hot: isHot,
          particles: []
        };

        const particleCount = 3;
        for (let index = 0; index < particleCount; index += 1) {
          const particle = createSvg("circle", {
            class: "energy-particle" + (isHot ? " hot" : ""),
            r: isHot ? 3.8 : 2.2
          });
          particleGroup.appendChild(particle);
          link.particles.push({
            element: particle,
            offset: index / particleCount,
            speed: isHot ? 0.00018 : 0.00008
          });
        }

        graphRuntime.links.push(link);
      });
    });

    visibleNodes.forEach((node) => {
      const state = graphRuntime.nodeStates.get(node.id);
      const isSelected = node.id === selectedNodeId;
      const isHot = hotIds.has(node.id);
      const isDimmed = selectedNodeId && !isHot;
      const group = createSvg("g", {
        class: [
          "graph-node",
          "node-kind-" + (node.kind || "output"),
          isSelected ? "is-selected" : "",
          isDimmed ? "is-muted" : ""
        ].join(" ").trim(),
        tabindex: "0",
        role: "button",
        "aria-label": node.title
      });
      const visual = createSvg("g", { class: "node-visual" });

      group.addEventListener("click", () => selectNode(node.id));
      group.addEventListener("mouseenter", () => {
        hoveredNodeId = node.id;
        applyGraphFocus();
      });
      group.addEventListener("mouseleave", () => {
        hoveredNodeId = null;
        applyGraphFocus();
      });
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectNode(node.id);
        }
      });

      group.appendChild(createSvg("circle", {
        class: "node-hit",
        r: state.radius + 56
      }));

      if (isSelected) {
        visual.appendChild(createSvg("circle", { class: "node-halo", r: state.radius + 10 }));
        visual.appendChild(createSvg("circle", { class: "orbit-ring orbit-one", r: state.radius + 22 }));
        visual.appendChild(createSvg("circle", { class: "orbit-ring orbit-two", r: state.radius + 34 }));
      }

      visual.appendChild(createSvg("circle", {
        class: "node-aura",
        r: state.radius + 20,
        fill: node.color
      }));
      visual.appendChild(createSvg("circle", {
        class: "core",
        r: state.radius,
        fill: node.color
      }));
      visual.appendChild(createSvg("circle", {
        class: "node-spark",
        cx: -state.radius * 0.28,
        cy: -state.radius * 0.32,
        r: Math.max(5, state.radius * 0.15)
      }));
      visual.appendChild(createSvg("text", {
        class: "node-label",
        y: state.radius + 25,
        "text-anchor": "middle"
      }, node.shortTitle));
      visual.appendChild(createSvg("text", {
        class: "node-meta",
        y: state.radius + 42,
        "text-anchor": "middle"
      }, `${node.year} | ${node.metricLabel || node.source}`));

      group.appendChild(visual);
      nodeGroup.appendChild(group);
      graphRuntime.nodeElements.set(node.id, { group, visual, state });
    });

    startGraphAnimation();
    updateGraph(performance.now(), false);
  }

  function computeHotIds(selected, hoveredId) {
    const focusId = hoveredId || selectedNodeId;
    const hotIds = new Set([focusId]);
    const focus = data.nodes.find((node) => node.id === focusId) || selected;

    if (focus) {
      focus.connections.forEach((connection) => hotIds.add(connection.target));
      data.nodes.forEach((node) => {
        if (node.connections.some((connection) => connection.target === focus.id)) {
          hotIds.add(node.id);
        }
      });
    }

    return hotIds;
  }

  function applyGraphFocus() {
    const selected = data.nodes.find((node) => node.id === selectedNodeId);
    const hotIds = computeHotIds(selected, hoveredNodeId);

    graphRuntime.nodeElements.forEach(({ group }, nodeId) => {
      const isHot = hotIds.has(nodeId);
      group.classList.toggle("is-muted", Boolean(selectedNodeId && !isHot));
      group.classList.toggle("is-selected", nodeId === selectedNodeId);
    });

    graphRuntime.links.forEach((link) => {
      const isHot = hotIds.has(link.sourceId) && hotIds.has(link.targetId);
      link.hot = isHot;
      link.path.classList.toggle("hot", isHot);
      link.particles.forEach((particle) => {
        particle.speed = isHot ? 0.00018 : 0.00008;
        particle.element.classList.toggle("hot", isHot);
        particle.element.setAttribute("r", isHot ? "3.8" : "2.2");
      });
    });
  }

  function updateGraph(time, scheduleNext = true) {
    graphRuntime.nodeElements.forEach(({ group, visual, state }) => {
      const ease = graphRuntime.reducedMotion ? 1 : 0.075;
      const deltaX = state.targetX - state.x;
      const deltaY = state.targetY - state.y;

      if (graphRuntime.reducedMotion || Math.hypot(deltaX, deltaY) < 0.08) {
        state.x = state.targetX;
        state.y = state.targetY;
      } else {
        state.x += deltaX * ease;
        state.y += deltaY * ease;
      }

      const drift = graphRuntime.reducedMotion ? { x: 0, y: 0 } : {
        x: Math.sin(time * state.floatSpeed + state.phase) * state.floatAmp,
        y: Math.cos(time * (state.floatSpeed * 0.83) + state.phase * 1.7) * state.floatAmp * 0.68
      };

      state.displayX = state.x + drift.x;
      state.displayY = state.y + drift.y;
      group.setAttribute("transform", `translate(${state.x.toFixed(2)} ${state.y.toFixed(2)})`);
      visual.setAttribute("transform", `translate(${drift.x.toFixed(2)} ${drift.y.toFixed(2)})`);
    });

    graphRuntime.links.forEach((link) => {
      const source = graphRuntime.nodeStates.get(link.sourceId);
      const target = graphRuntime.nodeStates.get(link.targetId);
      if (!source || !target) {
        return;
      }

      const curve = curvedPoints(source, target, link.curve);
      link.path.setAttribute("d", quadraticPath(curve));

      link.particles.forEach((particle) => {
        const t = ((time * particle.speed + particle.offset) % 1 + 1) % 1;
        const point = quadraticPoint(curve, t);
        particle.element.setAttribute("cx", point.x.toFixed(2));
        particle.element.setAttribute("cy", point.y.toFixed(2));
        particle.element.style.opacity = link.hot ? String(0.62 + Math.sin(t * Math.PI) * 0.35) : "0.22";
      });
    });

    if (scheduleNext && !graphRuntime.reducedMotion) {
      window.requestAnimationFrame(updateGraph);
    }
  }

  function startGraphAnimation() {
    if (graphRuntime.animationStarted || graphRuntime.reducedMotion) {
      return;
    }

    graphRuntime.animationStarted = true;
    window.requestAnimationFrame(updateGraph);
  }

  function createBurst(nodeId) {
    const node = data.nodes.find((candidate) => candidate.id === nodeId);
    const state = graphRuntime.nodeStates.get(nodeId);
    if (!node || !state || graphRuntime.reducedMotion) {
      return;
    }

    const group = createSvg("g", {
      class: "spark-burst",
      transform: `translate(${state.displayX} ${state.displayY})`
    });
    group.appendChild(createSvg("circle", {
      class: "burst-ring",
      r: state.radius + 8,
      stroke: node.color
    }));

    for (let index = 0; index < 12; index += 1) {
      const angle = (Math.PI * 2 * index) / 12;
      const inner = state.radius + 6;
      const outer = state.radius + 36 + (index % 3) * 5;
      group.appendChild(createSvg("line", {
        class: "burst-ray",
        x1: Math.cos(angle) * inner,
        y1: Math.sin(angle) * inner,
        x2: Math.cos(angle) * outer,
        y2: Math.sin(angle) * outer,
        stroke: node.color
      }));
    }

    svg.appendChild(group);
    window.setTimeout(() => group.remove(), 820);
  }

  function curvedPoints(source, target, curve) {
    const x1 = source.x;
    const y1 = source.y;
    const x2 = target.x;
    const y2 = target.y;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / distance;
    const ny = dx / distance;
    const control = {
      x: (x1 + x2) / 2 + nx * curve,
      y: (y1 + y2) / 2 + ny * curve
    };

    return { start: { x: x1, y: y1 }, control, end: { x: x2, y: y2 } };
  }

  function quadraticPath(points) {
    return [
      `M ${points.start.x.toFixed(2)} ${points.start.y.toFixed(2)}`,
      `Q ${points.control.x.toFixed(2)} ${points.control.y.toFixed(2)}`,
      `${points.end.x.toFixed(2)} ${points.end.y.toFixed(2)}`
    ].join(" ");
  }

  function quadraticPoint(points, t) {
    const oneMinus = 1 - t;
    return {
      x: oneMinus * oneMinus * points.start.x + 2 * oneMinus * t * points.control.x + t * t * points.end.x,
      y: oneMinus * oneMinus * points.start.y + 2 * oneMinus * t * points.control.y + t * t * points.end.y
    };
  }

  function linkCurve(sourceId, targetId) {
    const seed = stringSeed(sourceId + targetId);
    return ((seed % 9) - 4) * 8;
  }

  function stringSeed(value) {
    return value.split("").reduce((total, character, index) => {
      return total + character.charCodeAt(0) * (index + 1);
    }, 0);
  }

  function createSvg(tag, attributes, text) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes || {}).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  function selectNode(nodeId) {
    selectedNodeId = nodeId;
    hoveredNodeId = null;
    const node = data.nodes.find((candidate) => candidate.id === nodeId);
    renderAll();
    showDetail(node);
    createBurst(nodeId);
  }

  function showDetail(node) {
    if (!node) {
      return;
    }

    document.getElementById("detail-type").textContent = node.displayKind || node.type;
    document.getElementById("detail-status").textContent = node.status;
    document.getElementById("detail-title").textContent = node.title;
    document.getElementById("detail-meta").textContent = [
      node.year,
      node.venue,
      node.authors,
      node.role
    ].filter(Boolean).join(" | ");
    document.getElementById("detail-summary").textContent = node.summary;
    document.getElementById("detail-impact").textContent = node.impact;
    document.getElementById("detail-impact-heading").textContent = node.kind === "input" ? "How It Feeds My Work" : node.kind === "question" ? "Why This Question Matters" : "Why It Matters";
    document.getElementById("detail-methods-heading").textContent = node.kind === "input" ? "Reading Lenses" : node.kind === "question" ? "Bridge Methods" : "Methods";

    renderRepoPreview(node);
    populateTokens("detail-themes", node.themes);
    populateTokens("detail-methods", node.methods);
    populateLinks(node.links);
    populateConnections(node.connections);
  }

  function renderRepoPreview(node) {
    const container = document.getElementById("repo-preview");
    container.innerHTML = "";

    if (!node.repository) {
      const article = document.createElement("div");
      article.className = "node-art node-art-" + (node.kind || "output");
      article.innerHTML = `
        <span>${node.source || node.displayKind}</span>
        <strong>${node.metricLabel || node.displayKind || node.type}</strong>
        <em>${node.kind === "input" ? "Input layer" : node.kind === "question" ? "Bridge layer" : "Output layer"}</em>
      `;
      container.appendChild(article);

      if (node.metrics && Object.keys(node.metrics).length) {
        const metrics = document.createElement("div");
        metrics.className = "repo-metrics";
        const entries = Object.entries(node.metrics).slice(0, 3);
        metrics.innerHTML = entries.map(([key, value]) => `
          <div><strong>${value}</strong><span>${key.replace(/_/g, " ")}</span></div>
        `).join("");
        container.appendChild(metrics);
      }
      return;
    }

    const anchor = document.createElement("a");
    anchor.className = "repo-art";
    anchor.href = node.repository.url;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.innerHTML = `
      <span>${node.repository.language}</span>
      <strong>${node.repository.name}</strong>
      <em>${node.shortTitle}</em>
    `;
    container.appendChild(anchor);

    const metrics = document.createElement("div");
    metrics.className = "repo-metrics";
    metrics.innerHTML = `
      <div><strong>${node.repository.commits}</strong><span>commits</span></div>
      <div><strong>${node.repository.stars}</strong><span>stars</span></div>
      <div><strong>${node.repository.forks}</strong><span>forks</span></div>
    `;
    container.appendChild(metrics);
  }

  function populateTokens(containerId, values) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    values.forEach((value) => {
      const token = document.createElement("span");
      token.className = "token";
      token.textContent = value;
      container.appendChild(token);
    });
  }

  function populateLinks(links) {
    const container = document.getElementById("detail-links");
    container.innerHTML = "";
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.textContent = link.label;
      container.appendChild(anchor);
    });
  }

  function populateConnections(connections) {
    const container = document.getElementById("detail-connections");
    container.innerHTML = "";
    connections.forEach((connection) => {
      const relatedNode = data.nodes.find((node) => node.id === connection.target);
      if (!relatedNode) {
        return;
      }
      const item = document.createElement("li");
      item.textContent = `${relatedNode.shortTitle}: ${connection.label}.`;
      container.appendChild(item);
    });
  }

  function renderAll() {
    const visibleNodes = filteredNodes();
    if (visibleNodes.length && !visibleNodes.some((node) => node.id === selectedNodeId)) {
      selectedNodeId = visibleNodes[0].id;
    }
    renderRepoList();
    renderGraph();
    showDetail(data.nodes.find((node) => node.id === selectedNodeId));
  }

  function nodeWeight(node) {
    if (node.repository?.commits) {
      return node.repository.commits;
    }
    if (node.metrics?.note_count) {
      return Math.sqrt(node.metrics.note_count) * 8;
    }
    if (node.metrics?.citations !== undefined) {
      return Math.sqrt(node.metrics.citations + 1) * 10;
    }
    return node.kind === "question" ? 24 : 10;
  }

  function initStarfield() {
    if (!starfield) {
      return;
    }

    const context = starfield.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let stars = [];

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      starfield.width = Math.floor(width * ratio);
      starfield.height = Math.floor(height * ratio);
      starfield.style.width = width + "px";
      starfield.style.height = height + "px";
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(220, Math.floor((width * height) / 5200));
      stars = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: index % 9 === 0 ? 1.7 : Math.random() * 1.15 + 0.3,
        alpha: Math.random() * 0.55 + 0.18,
        drift: Math.random() * 0.18 + 0.04,
        tint: index % 11 === 0 ? "255, 212, 106" : index % 7 === 0 ? "168, 140, 255" : "186, 255, 232"
      }));
    }

    function draw(time) {
      context.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const pulse = reducedMotion ? 0 : Math.sin(time * 0.001 * star.drift + star.x) * 0.22;
        const alpha = Math.max(0.08, star.alpha + pulse);
        context.beginPath();
        context.fillStyle = `rgba(${star.tint}, ${alpha})`;
        context.shadowColor = `rgba(${star.tint}, ${alpha})`;
        context.shadowBlur = star.radius * 7;
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion) {
        window.requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);
    window.addEventListener("resize", resize);
  }

  searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderAll();
  });

  modeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeMode = tab.dataset.mode;
      modeTabs.forEach((candidate) => candidate.classList.toggle("active", candidate === tab));
      renderGraph();
    });
  });

  buildFilters();
  initStarfield();
  loadScholarSnapshot();
  renderAll();
  showDetail(data.nodes.find((node) => node.id === selectedNodeId));
})();

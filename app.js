(() => {
  const atlas = document.querySelector("#atlas");
  const grid = document.querySelector("#grid");
  const modalRoot = document.querySelector("#modal-root");
  const cellX = 340;
  const cellY = 400;
  const imageW = 260;
  const imageH = 340;
  const padding = Math.max(cellX, cellY);
  let camera = { x: 0, y: 0 };
  let dragging = null;

  const escapeHtml = (text) => String(text).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  const stars = (rating) => "★".repeat(Math.max(0, Math.min(5, Math.round(rating)))) + "☆".repeat(Math.max(0, 5 - Math.round(rating)));
  const sodaAt = (i, j) => SODAS[(((i * 92837111) ^ (j * 689287499)) >>> 0) % SODAS.length];

  function renderGrid() {
    const left = -camera.x - padding;
    const top = -camera.y - padding;
    const right = -camera.x + window.innerWidth + padding;
    const bottom = -camera.y + window.innerHeight + padding;
    const iMin = Math.floor(left / cellX);
    const iMax = Math.ceil(right / cellX);
    const jMin = Math.floor(top / cellY);
    const jMax = Math.ceil(bottom / cellY);
    const cards = [];

    for (let j = jMin; j <= jMax; j += 1) {
      for (let i = iMin; i <= iMax; i += 1) {
        const soda = sodaAt(i, j);
        const x = i * cellX + (cellX - imageW) / 2;
        const y = j * cellY + (cellY - imageH) / 2;
        cards.push(`<button class="can" style="--x:${x}px;--y:${y}px" data-soda="${soda.id}" aria-label="Open ${escapeHtml(soda.title)}"><img src="${escapeHtml(soda.imageUrl)}" alt="" draggable="false" loading="lazy"></button>`);
      }
    }
    grid.style.transform = `translate(${camera.x}px, ${camera.y}px)`;
    grid.innerHTML = cards.join("");
  }

  function closeModal() {
    modalRoot.innerHTML = "";
    document.body.classList.remove("modal-open");
  }

  function openModal(soda) {
    const details = [
      ["Style / category", soda.reviewCategory], ["Brand", soda.brand], ["Sweetener system", soda.sweetenerSystem], ["Carbonation", soda.carbonation],
      ["Appearance", soda.appearance], ["Aroma", soda.aroma], ["Primary flavor", soda.primaryFlavor], ["Finish / aftertaste", soda.finishAftertaste],
    ];
    const rows = details.map(([label, value]) => `<div class="review-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "—")}</dd></div>`).join("");
    const tags = (values, className) => values.map((value) => `<li class="tag ${className}">${escapeHtml(value)}</li>`).join("");
    modalRoot.innerHTML = `<div class="modal-backdrop" role="presentation"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-image"><img src="${escapeHtml(soda.imageUrl)}" alt=""><button class="close" aria-label="Close review">Close</button></div><div class="modal-content"><h1 id="modal-title">${escapeHtml(soda.title)}</h1><p class="eyebrow">Overall rating</p><p class="stars" aria-label="${soda.ratingStars} out of 5 stars">${stars(soda.ratingStars)}</p><dl>${rows}</dl><div><p class="eyebrow">Final take</p><p class="final-take">${escapeHtml(soda.finalTake || "—")}</p></div><div><p class="eyebrow">Tags</p><ul class="tags">${tags(soda.tags, "")}</ul></div><div><p class="eyebrow">Flavor notes</p><ul class="tags">${tags(soda.flavorNoteTags, "flavor-tag")}</ul></div></div></section></div>`;
    document.body.classList.add("modal-open");
    modalRoot.querySelector(".close").focus();
    modalRoot.querySelector(".modal-backdrop").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeModal();
    });
  }

  atlas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const can = event.target.closest(".can");
    dragging = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y, moved: false, sodaId: can?.dataset.soda };
    atlas.setPointerCapture(event.pointerId);
  });
  atlas.addEventListener("pointermove", (event) => {
    if (!dragging || event.pointerId !== dragging.pointerId) return;
    const dx = event.clientX - dragging.x;
    const dy = event.clientY - dragging.y;
    if (dx * dx + dy * dy > 36) dragging.moved = true;
    camera = { x: dragging.cameraX + dx, y: dragging.cameraY + dy };
    renderGrid();
  });
  const finishDrag = (event) => {
    if (!dragging || event.pointerId !== dragging.pointerId) return;
    if (!dragging.moved && dragging.sodaId) openModal(SODAS.find((soda) => soda.id === dragging.sodaId));
    dragging = null;
  };
  atlas.addEventListener("pointerup", finishDrag);
  atlas.addEventListener("pointercancel", finishDrag);
  window.addEventListener("resize", renderGrid);
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
  renderGrid();
})();

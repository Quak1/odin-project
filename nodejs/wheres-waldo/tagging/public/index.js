const range = document.getElementById("range");
const select = document.getElementById("mapSelect");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const goBtn = document.getElementById("goBtn");
const nameDiv = document.getElementById("name");
const img = new Image();
let currentTags;
let currentMapId;
let startX;
let startY;
let isDrawing = false;

goBtn.addEventListener("click", handleGo);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("mousemove", handleCanvasMousemove);
img.addEventListener("load", () => {
  ctx.canvas.width = img.width;
  ctx.canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    isDrawing = false;
    draw();
  }
});
range.addEventListener("input", (e) => {
  canvas.style.width = `${img.width * Number(range.value)}px`;
  canvas.style.height = `${img.height * Number(range.value)}px`;
});

async function getMaps() {
  const res = await fetch("/maps");
  const maps = await res.json();
  return maps;
}

async function loadMaps() {
  const maps = await getMaps();
  for (const map of maps) {
    const opt = document.createElement("option");
    opt.value = map.id;
    opt.innerText = map.name;
    opt.dataset.url = map.url;
    select.append(opt);
  }
}

async function setMapTags(mapId) {
  const res = await fetch("/maps/" + mapId);
  const tags = await res.json();
  currentTags = tags;
  currentMapId = mapId;
}

async function saveTag(tag) {
  tag.x1 = Math.round(tag.x1);
  tag.x2 = Math.round(tag.x2);
  tag.y1 = Math.round(tag.y1);
  tag.y2 = Math.round(tag.y2);

  const res = await fetch("/maps/" + currentMapId, {
    method: "POST",
    body: JSON.stringify(tag),
    headers: { "Content-Type": "application/json" },
  });

  const newTag = await res.json();
  currentTags.push(newTag);
  draw();
}

async function handleGo() {
  const option = select.options[select.options.selectedIndex];
  img.src = option.dataset.url;
  await Promise.all([
    new Promise((resolve) => img.addEventListener("load", resolve)),
    setMapTags(select.value),
  ]);
  draw();
}

function localToNatural(oldX, oldY, canvas) {
  const x = (oldX * canvas.width) / canvas.offsetWidth;
  const y = (oldY * canvas.height) / canvas.offsetHeight;
  return [x, y];
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  for (const tag of currentTags) {
    ctx.fillStyle = "rgb(0 0 0 / 0.5)";
    ctx.fillRect(tag.x1, tag.y1, tag.x2 - tag.x1, tag.y2 - tag.y1);
  }
}

function handleCanvasClick(e) {
  const [mouseX, mouseY] = localToNatural(e.offsetX, e.offsetY, e.target);

  if (!isDrawing) {
    // First click - Place a dot
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
    ctx.fill();
    startX = mouseX;
    startY = mouseY;
    isDrawing = true;
  } else {
    // Second click - Finalize the rectangle
    isDrawing = false;
    const name = prompt("Name?");
    if (name)
      saveTag({
        name,
        x1: Math.min(startX, mouseX),
        x2: Math.max(startX, mouseX),
        y1: Math.min(startY, mouseY),
        y2: Math.max(startY, mouseY),
      });
    draw();
  }
}

function handleCanvasMousemove(e) {
  const [mouseX, mouseY] = localToNatural(e.offsetX, e.offsetY, e.target);

  if (!isDrawing) {
    const name = getRectName(mouseX, mouseY);
    if (name) nameDiv.textContent = name;
    else nameDiv.textContent = "";
    return;
  }

  draw();
  ctx.beginPath();
  ctx.arc(startX, startY, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeRect(startX, startY, mouseX - startX, mouseY - startY);
}

function getRectName(x, y) {
  for (const tag of currentTags) {
    if (x >= tag.x1 && x <= tag.x2 && y >= tag.y1 && y <= tag.y2)
      return tag.character_id;
  }
}

loadMaps();

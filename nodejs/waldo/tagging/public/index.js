const maps = [
  {
    id: 1,
    name: "Pokemon",
    url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2b67f731-a21c-4ac8-8a91-65beb31ef176/d3fvvj8-baf84b8f-e86d-4ce2-8548-6bb5ba4908b4.jpg/v1/fill/w_1600,h_2300,q_75,strp/gotta_catch__em_all___649__pokemon_poster_by_viking011_d3fvvj8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJiNjdmNzMxLWEyMWMtNGFjOC04YTkxLTY1YmViMzFlZjE3NlwvZDNmdnZqOC1iYWY4NGI4Zi1lODZkLTRjZTItODU0OC02YmI1YmE0OTA4YjQuanBnIiwiaGVpZ2h0IjoiPD0yMzAwIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMmI2N2Y3MzEtYTIxYy00YWM4LThhOTEtNjViZWIzMWVmMTc2XC92aWtpbmcwMTEtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.5wSVOdWFRb51PKlAQJFHLZJA6QEjbw6T6DXNl5riW4g",
  },
  {
    id: 2,
    name: "test",
    url: "testurl",
  },
];

const tags = {
  1: [
    {
      name: "test",
      x: 0,
      y: 0,
      w: 100,
      h: 100,
    },
    {
      name: "test2",

      x: 300,
      y: 300,
      w: 200,
      h: 100,
    },
    {
      name: "supa",
      x: 0,
      y: 500,
      w: 2300,
      h: 100,
    },
  ],
};

const select = document.getElementById("mapSelect");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const goBtn = document.getElementById("goBtn");
const nameDiv = document.getElementById("name");
const img = new Image();
let currentTags;
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

async function getMaps() {
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
  currentTags = tags[mapId];
}

async function saveTag(tag) {
  currentTags.push(tag);
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
    ctx.fillRect(tag.x, tag.y, tag.w, tag.h);
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
    const minX = Math.min(startX, mouseX);
    const minY = Math.min(startY, mouseY);
    const name = prompt("Name?");
    if (name)
      saveTag({
        name,
        x: minX,
        y: minY,
        w: Math.max(startX, mouseX) - minX,
        h: Math.max(startY, mouseY) - minY,
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
    if (x >= tag.x && x <= tag.x + tag.w && y >= tag.y && y <= tag.y + tag.h)
      return tag.name;
  }
}

loadMaps();

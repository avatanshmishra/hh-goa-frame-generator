const colors = {
  green: "#006B3F",
  darkGreen: "#004D2C",
  yellow: "#FFD600",
  pink: "#FF1493",
  cream: "#F7F1D4",
  black: "#10251A",
};

function drawCoverImage(ctx, image, x, y, width, height) {
  const imageRatio = image.width / image.height;
  const boxRatio = width / height;

  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > boxRatio) {
    sourceWidth = image.height * boxRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / boxRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height
  );
}

function drawPalm(ctx, x, y, scale) {
  ctx.save();

  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.strokeStyle = colors.black;
  ctx.lineWidth = 4;
  ctx.fillStyle = colors.green;

  ctx.beginPath();

  ctx.moveTo(0, 150);

  ctx.quadraticCurveTo(
    20,
    60,
    10,
    0
  );

  ctx.stroke();

  const leaves = [
    [-10, 0, -80, -35],
    [-5, -5, -65, -70],
    [5, -5, 5, -80],
    [15, 0, 75, -55],
    [15, 5, 90, -10],
    [-5, 10, -50, 35],
  ];

  leaves.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();

    ctx.moveTo(5, 0);

    ctx.quadraticCurveTo(
      x1,
      y1,
      x2,
      y2
    );

    ctx.quadraticCurveTo(
      x1 + 20,
      y1 + 20,
      5,
      0
    );

    ctx.fill();
    ctx.stroke();
  });

  ctx.restore();
}

function drawSun(ctx) {
  ctx.fillStyle = colors.yellow;

  ctx.beginPath();

  ctx.arc(
    540,
    820,
    95,
    Math.PI,
    Math.PI * 2
  );

  ctx.fill();

  ctx.strokeStyle = colors.yellow;
  ctx.lineWidth = 5;

  const rays = [
    [540, 705, 540, 650],
    [440, 735, 400, 690],
    [640, 735, 680, 690],
    [370, 790, 315, 775],
    [710, 790, 765, 775],
  ];

  rays.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  for (let i = 0; i < 4; i++) {
    ctx.beginPath();

    ctx.ellipse(
      540,
      855 + i * 15,
      90 - i * 18,
      5,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}

function drawBeach(ctx) {
  ctx.fillStyle = colors.cream;

  ctx.fillRect(
    0,
    720,
    1080,
    360
  );

  ctx.fillStyle = colors.green;

  ctx.beginPath();

  ctx.moveTo(0, 735);

  ctx.quadraticCurveTo(
    180,
    675,
    350,
    735
  );

  ctx.quadraticCurveTo(
    540,
    790,
    720,
    710
  );

  ctx.quadraticCurveTo(
    900,
    660,
    1080,
    730
  );

  ctx.lineTo(1080, 1080);
  ctx.lineTo(0, 1080);

  ctx.closePath();

  ctx.fill();

  drawSun(ctx);

  drawPalm(ctx, 70, 850, 1.15);
  drawPalm(ctx, 1000, 850, 1.15);
  drawPalm(ctx, 250, 980, 0.65);
  drawPalm(ctx, 830, 980, 0.65);
}

export function generateCard(
  canvas,
  {
    image,
    name,
    stack,
    title,
  }
) {
  const ctx = canvas.getContext("2d");

  const width = 1080;
  const height = 1080;

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  // Background
  ctx.fillStyle = colors.green;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

  // Studio
  ctx.fillStyle = colors.yellow;
  ctx.textAlign = "left";

  ctx.font = "700 22px Arial";

  ctx.fillText(
    "2:47 PM",
    55,
    60
  );

  ctx.font = "700 18px Arial";

  ctx.fillText(
    "STUDIO",
    55,
    84
  );

  // Event information
  ctx.font = "700 18px monospace";

  ctx.fillText(
    "GOA, INDIA · 28—31 OCT 2026",
    55,
    125
  );

  // Main heading
  ctx.textAlign = "center";

  ctx.font = "900 105px Georgia";

  ctx.fillText(
    "HACKER HOUSE",
    width / 2,
    220
  );

  // Goa text
  ctx.fillStyle = colors.pink;

  ctx.font = "900 70px Arial";

  ctx.fillText(
    "गोवा",
    width / 2,
    295
  );

  // Profile image
  const photoX = 210;
  const photoY = 340;
  const photoWidth = 660;
  const photoHeight = 390;

  ctx.fillStyle = colors.yellow;

  ctx.fillRect(
    photoX - 12,
    photoY - 12,
    photoWidth + 24,
    photoHeight + 24
  );

  ctx.save();

  ctx.beginPath();

  ctx.rect(
    photoX,
    photoY,
    photoWidth,
    photoHeight
  );

  ctx.clip();

  if (image) {
    drawCoverImage(
      ctx,
      image,
      photoX,
      photoY,
      photoWidth,
      photoHeight
    );
  }

  ctx.restore();

  // IMPORTANT:
  // Draw the beach before the user information.
  // Otherwise the beach will cover the text.

  drawBeach(ctx);

  // Name
  ctx.textAlign = "left";

  ctx.fillStyle = colors.cream;

  ctx.font = "900 42px Arial";

  ctx.fillText(
    String(name || "YOUR NAME").toUpperCase(),
    55,
    785
  );

  // Stack
  ctx.fillStyle = colors.yellow;

  ctx.font = "700 21px monospace";

  ctx.fillText(
    String(stack || "AI / ML").toUpperCase(),
    55,
    820
  );

  // Builder title
  ctx.textAlign = "right";

  ctx.fillStyle = colors.pink;

  ctx.font = "700 21px Arial";

  ctx.fillText(
    String(title || "BUILDER"),
    1025,
    820
  );

  // Hashtag
  ctx.textAlign = "left";

  ctx.fillStyle = colors.black;

  ctx.font = "700 20px Arial";

  ctx.fillText(
    "#FrameInGoa",
    55,
    1030
  );

  // Border
  ctx.strokeStyle = colors.yellow;

  ctx.lineWidth = 5;

  ctx.strokeRect(
    15,
    15,
    width - 30,
    height - 30
  );
}
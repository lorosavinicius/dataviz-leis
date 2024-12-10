function drawCircles(xo, yo, numCircles, maxRadius, radiusCirc) {
  circles = [];
  let radiusIncrement = radiusCirc; // Raio inicial dos círculos
  let angleOffset = 0;

  // Tentativa de posicionar todos os círculos
  for (let i = 0; i < numCircles; i++) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      let angle = random(TWO_PI);
      let distFromCenter = random(maxRadius - radiusIncrement);
      let x = xo + cos(angle + angleOffset) * distFromCenter;
      let y = yo + sin(angle + angleOffset) * distFromCenter;
      let newCircle = { x: x, y: y, r: radiusIncrement };

      if (!overlaps(newCircle, circles)) {
        circles.push(newCircle);
        circles_total.push(newCircle);
        placed = true;
      }
      attempts++;
    }
  }
  
}

// Função para verificar se um círculo se sobrepõe a algum dos existentes
function overlaps(newCircle, circles) {
  for (let c of circles) {
    let d = dist(newCircle.x, newCircle.y, c.x, c.y);
    if (d < newCircle.r + c.r) {
      return true;
    }
  }
  return false;
}
export function createDNA(turns=20, height=50, pointsPerTurn=50) {
  const group = new THREE.Group();
  const radius = 5; // größer, damit sichtbar

  const materialA = new THREE.MeshStandardMaterial({color:0xff00ff, emissive:0xff00ff, roughness:0.3});
  const materialB = new THREE.MeshStandardMaterial({color:0x00ffff, emissive:0x00ffff, roughness:0.3});
  const connectorMat = new THREE.MeshStandardMaterial({color:0xffffff, emissive:0xffffff, roughness:0.5});

  for(let i=0; i<turns*pointsPerTurn; i++){
    const t = i/pointsPerTurn * Math.PI*2;
    const y = (i/(turns*pointsPerTurn)-0.5)*height;

    const x1 = Math.cos(t) * radius*2;
    const z1 = Math.sin(t) * radius*2;
    const x2 = Math.cos(t + Math.PI) * radius*2;
    const z2 = Math.sin(t + Math.PI) * radius*2;

    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1,16,16), materialA);
    sphere1.position.set(x1,y,z1);
    group.add(sphere1);

    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(1,16,16), materialB);
    sphere2.position.set(x2,y,z2);
    group.add(sphere2);

    if(i % 2 === 0){
      const connectorLength = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y-y,2) + Math.pow(z1-z2,2));
      const connectorGeom = new THREE.CylinderGeometry(0.2,0.2, connectorLength,8);
      const connector = new THREE.Mesh(connectorGeom, connectorMat);
      connector.position.set((x1+x2)/2, y, (z1+z2)/2);

      // Ausrichtung korrekt machen
      const dx = x2 - x1;
      const dz = z2 - z1;
      connector.rotation.y = Math.atan2(dz, dx);
      connector.rotation.z = Math.PI/2;

      group.add(connector);
    }
  }

  // Startrotation, damit sichtbar
  group.rotation.x = Math.PI/6;
  group.rotation.y = Math.PI/4;

  return group;
}

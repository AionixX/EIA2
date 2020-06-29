namespace L11_Asteroids {
  window.addEventListener("load", handleLoad);

  export let crc2: CanvasRenderingContext2D;
  export let lineWidth: number = 2;

  let moveables: Moveable[] = [];

  function handleLoad(_event: Event): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;

    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    crc2.fillStyle = "black";
    crc2.strokeStyle = "white";
    crc2.lineWidth = lineWidth;

    createPaths();

    createAsteroids(5);
    createUfo();
    createUfo();
    createUfo();
    // createShip();

    canvas.addEventListener("ufoShoots", handleUfoShot);
    canvas.addEventListener("mouseup", shootLaser);
    // canvas.addEventListener("keypress", handleKeypress);
    // canvas.addEventListener("mousemove", setHeading);

    window.setInterval(update, 20);
  }

  function shootLaser(_event: MouseEvent): void {
    let hotspot: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
    let asteroidHit: Asteroid | null = getAsteroidHit(hotspot);
    if (asteroidHit)
      breakAsteroid(asteroidHit);
  }

  function handleUfoShot(_event: Event): void {
    let ufo: Ufo = (<CustomEvent>_event).detail.ufo;
    shootProjectile(ufo.position);
  }

  function shootProjectile(_origin: Vector): void {
    let velocity: Vector = new Vector(0, 0);
    velocity = Vector.getRandom(100, 100);
    moveables.push(new Projectile(_origin, velocity));
  }

  function getAsteroidHit(_hotspot: Vector): Asteroid | null {
    for (let moveable of moveables) {
      if (moveable instanceof Asteroid && moveable.isHit(_hotspot))
        return moveable;
    }
    return null;
  }

  function breakAsteroid(_asteroid: Asteroid): void {
    if (_asteroid.size > 0.3) {
      for (let i: number = 0; i < 2; i++) {
        let fragment: Asteroid = new Asteroid(_asteroid.size / 2, _asteroid.position.copy());
        fragment.velocity.add(_asteroid.velocity);
        moveables.push(fragment);
      }
    }
    _asteroid.expandable = true;
  }

  function createAsteroids(_nAsteroids: number): void {
    for (let i: number = 0; i < _nAsteroids; i++) {
      let asteroid: Asteroid = new Asteroid(1.0);
      moveables.push(asteroid);
    }
  }

  function createUfo(): void {
    let ufo: Ufo = new Ufo();
    moveables.push(ufo);
  }

  function update(): void {
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    for (let moveable of moveables) {
      moveable.move(1 / 50);
      moveable.draw();
    }

    deleteExpandables();

    // ship.draw();
    handleCollisions();
  }

  function deleteExpandables(): void {
    for (let i: number = moveables.length - 1; i >= 0; i--) {
      if (moveables[i].expandable)
        moveables.splice(i, 1);
    }
  }

  function handleCollisions(): void {
    for (let i: number = 0; i < moveables.length; i++) {
      for (let j: number = i + 1; i < moveables.length; j++) {
        let a: Moveable = moveables[i];
        let b: Moveable = moveables[j];
        if (a.isHitBy(b)){
          a.hit();
          b.hit();
        }
      }
    }
  }
}
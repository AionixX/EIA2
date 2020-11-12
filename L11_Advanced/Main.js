"use strict";
var L11_Asteroids;
(function (L11_Asteroids) {
    window.addEventListener("load", handleLoad);
    L11_Asteroids.lineWidth = 2;
    let moveables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L11_Asteroids.crc2 = canvas.getContext("2d");
        L11_Asteroids.crc2.fillStyle = "black";
        L11_Asteroids.crc2.strokeStyle = "white";
        L11_Asteroids.crc2.lineWidth = L11_Asteroids.lineWidth;
        L11_Asteroids.createPaths();
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
    function shootLaser(_event) {
        let hotspot = new L11_Asteroids.Vector(_event.clientX - L11_Asteroids.crc2.canvas.offsetLeft, _event.clientY - L11_Asteroids.crc2.canvas.offsetTop);
        let asteroidHit = getAsteroidHit(hotspot);
        if (asteroidHit)
            breakAsteroid(asteroidHit);
    }
    function handleUfoShot(_event) {
        let ufo = _event.detail.ufo;
        shootProjectile(ufo.position);
    }
    function shootProjectile(_origin) {
        let velocity = new L11_Asteroids.Vector(0, 0);
        velocity = L11_Asteroids.Vector.getRandom(100, 100);
        moveables.push(new L11_Asteroids.Projectile(_origin, velocity));
    }
    function getAsteroidHit(_hotspot) {
        for (let moveable of moveables) {
            if (moveable instanceof L11_Asteroids.Asteroid && moveable.isHit(_hotspot))
                return moveable;
        }
        return null;
    }
    function breakAsteroid(_asteroid) {
        if (_asteroid.size > 0.3) {
            for (let i = 0; i < 2; i++) {
                let fragment = new L11_Asteroids.Asteroid(_asteroid.size / 2, _asteroid.position.copy());
                fragment.velocity.add(_asteroid.velocity);
                moveables.push(fragment);
            }
        }
        _asteroid.expandable = true;
    }
    function createAsteroids(_nAsteroids) {
        for (let i = 0; i < _nAsteroids; i++) {
            let asteroid = new L11_Asteroids.Asteroid(1.0);
            moveables.push(asteroid);
        }
    }
    function createUfo() {
        let ufo = new L11_Asteroids.Ufo();
        moveables.push(ufo);
    }
    function update() {
        L11_Asteroids.crc2.fillRect(0, 0, L11_Asteroids.crc2.canvas.width, L11_Asteroids.crc2.canvas.height);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        deleteExpandables();
        // ship.draw();
        handleCollisions();
    }
    function deleteExpandables() {
        for (let i = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].expandable)
                moveables.splice(i, 1);
        }
    }
    function handleCollisions() {
        for (let i = 0; i < moveables.length; i++) {
            for (let j = i + 1; i < moveables.length; j++) {
                let a = moveables[i];
                let b = moveables[j];
                if (a.isHitBy(b)) {
                    a.hit();
                    b.hit();
                }
            }
        }
    }
})(L11_Asteroids || (L11_Asteroids = {}));
//# sourceMappingURL=Main.js.map
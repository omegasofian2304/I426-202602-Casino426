<script setup lang="ts">

</script>

<template>
  <!doctype html>
  <html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bandit Manchot - Maquette</title>
    <link rel="stylesheet" href="BanditManchot.css" />
  </head>

  <body>
  <div class="machine" role="application" aria-label="Bandit manchot (maquette)">

    <main class="cabinet">
      <div class="cabinet__inner">
        <div class="btn-col">
          <button class="pill" type="button">Retour</button>
          <button class="pill" type="button">Infos</button>
        </div>

        <section class="playfield" aria-label="Zone de jeu">
          <div class="jackpot">Jackpot</div>

          <div class="reels" aria-label="Fenêtres (sans symboles)">
            <div class="reel" aria-hidden="true"></div>
            <div class="reel" aria-hidden="true"></div>
            <div class="reel" aria-hidden="true"></div>
            <div class="reels__midline" aria-hidden="true"></div>
          </div>

        </section>

        <aside class="lever-wrap" aria-label="Manivelle">
          <div class="lever" id="lever">
            <div class="lever__track" aria-hidden="true"></div>

            <div class="lever__shaft" id="shaft">
              <div class="lever__knob" id="knob" role="button" tabindex="0"
                   aria-label="Manivelle (cliquer puis tirer vers le bas)"></div>
              <div class="lever__rod" aria-hidden="true"></div>
              <div class="lever__handle" aria-hidden="true"></div>
            </div>
          </div>
        </aside>
      </div>
    </main>


  </div>

  </body>
  </html>
</template>

<style>
:root{
  --red-1:#c10f0f;
  --red-2:#a30b0b;
  --black:#0b0b0b;

  --gold-1:#f5e27a;
  --gold-2:#d6b82a;

  --green-1:#33b43a;
  --green-2:#1e8f25;

  --metal-1:#d9d9d9;
  --metal-2:#a9a9a9;
  --metal-3:#7c7c7c;

  --shadow: 0 10px 22px rgba(0,0,0,.25);
}

*{ box-sizing:border-box; }

body{
  margin:0;
  min-height:100vh;
  display:grid;
  place-items:center;
  background:#ececec;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color:#fff;
}

/* ====== MACHINE ====== */
.machine{
  width:900px;
  height:600px;
  aspect-ratio: 1 / 1;
  border:8px solid var(--black);
  border-radius: 6px;
  background: linear-gradient(180deg, var(--red-1), var(--red-2));
  box-shadow: var(--shadow);
  display:grid;
  overflow:hidden;
  position:relative;
}

/* ====== TOP BAR ====== */
.topbar{
  position:relative;
  display:flex;
  align-items:center;
  gap:18px;
  padding: 0 18px;
  background: linear-gradient(180deg, #e02a2a, #c81b1b);
  border-bottom: 6px solid var(--black);
}
.topbar::before,
.topbar::after{
  content:"";
  position:absolute;
  top:0;
  height:100%;
  width:120px;
  background: repeating-linear-gradient(-45deg, rgba(0,0,0,.95) 0 12px, rgba(0,0,0,0) 12px 20px);
  opacity:.9;
  pointer-events:none;
}
.topbar::before{ left:0; }
.topbar::after{ right:0; transform: scaleX(-1); }

.topbar__left,
.topbar__title,
.topbar__money,
.topbar__user{ position:relative; z-index:1; }

.topbar__left{ font-weight:600; }
.topbar__title{
  margin-inline:auto;
  font-weight:800;
  text-shadow: 0 2px 0 rgba(0,0,0,.25);
}
.topbar__money{ font-weight:600; white-space:nowrap; }

.topbar__user{
  width:38px;
  height:38px;
  border-radius:999px;
  border:2px solid rgba(0,0,0,.5);
  background:
      radial-gradient(circle at 35% 35%, rgba(255,255,255,.35), rgba(255,255,255,0) 55%),
      linear-gradient(180deg, #f0f0f0, #cfcfcf);
  cursor:pointer;
}
.topbar__user::before{
  content:"";
  position:absolute;
  inset:7px;
  border-radius:999px;
  border:2px solid rgba(0,0,0,.45);
}

/* ====== CABINET ====== */
.cabinet{
  padding: 18px;
  display:grid;
  place-items:stretch;
}
.cabinet__inner{
  border-radius: 6px;
  background: linear-gradient(180deg, #b80e0e, #8f0a0a);
  box-shadow: inset 0 0 0 10px rgba(0,0,0,.10);
  padding: 18px;
  display:grid;
  grid-template-columns: 170px 1fr 110px;
  gap: 18px;
  height:100%;
}

/* ====== BOUTONS ====== */
.btn-col{
  display:flex;
  flex-direction:column;
  gap: 34px;
  padding-top: 120px;
  align-items:flex-start;
}
.pill{
  width: 150px;
  padding: 14px 16px;
  border-radius: 999px;
  border: 5px solid var(--gold-2);
  background: linear-gradient(180deg, var(--green-1), var(--green-2));
  color:#fff;
  font-size: 26px;
  font-weight:900;
  text-shadow: 0 2px 0 rgba(0,0,0,.25);
  box-shadow:
      inset 0 2px 0 rgba(255,255,255,.35),
      0 6px 0 rgba(0,0,0,.18);
  cursor:pointer;
}
.pill:active{ transform: translateY(2px); }

/* ====== CENTRE ====== */
.playfield{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap: 18px;
  padding-top: 10px;
}
.jackpot{
  width:min(520px, 100%);
  padding: 14px 22px;
  text-align:center;
  font-size: 42px;
  font-weight:900;
  border-radius: 16px;
  border: 6px solid var(--gold-2);
  background: linear-gradient(180deg, #3bdc48, #1b8d24);
  text-shadow: 0 2px 0 rgba(0,0,0,.25);
  box-shadow:
      inset 0 2px 0 rgba(255,255,255,.35),
      0 10px 0 rgba(0,0,0,.15);
}
.reels{
  width:min(620px, 100%);
  height: 300px;
  position:relative;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 10px;
  border-radius: 26px;
  background: rgba(0,0,0,.08);
}
.reel{
  background: linear-gradient(180deg, #ffffff, #fbfbfb);
  border: 6px solid var(--gold-2);
  border-radius: 26px;
  box-shadow: inset 0 0 0 2px rgba(0,0,0,.10);
  position:relative;
  overflow:hidden;
}
.reel::before{
  content:"";
  position:absolute;
  inset:-30% -40%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0 35%, rgba(255,255,255,.35) 45%, rgba(255,255,255,0) 60%);
  transform: rotate(18deg);
  opacity:.55;
}
.reels__midline{
  position:absolute;
  left: 18px;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--gold-1), var(--gold-2));
  box-shadow: 0 3px 0 rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.45);
  pointer-events:none;
}
.tray{
  width:min(610px, 100%);
  height: 120px;
  background: linear-gradient(180deg, var(--metal-1), var(--metal-2) 55%, var(--metal-3));
  box-shadow: inset 0 3px 0 rgba(255,255,255,.55), inset 0 -10px 22px rgba(0,0,0,.25);
  clip-path: polygon(10% 0%, 90% 0%, 96% 100%, 4% 100%);
  border-radius: 6px;
}

/* ====== LEVER (corrigé : rotation) ====== */
.lever-wrap{
  display:flex;
  justify-content:center;
  align-items:center;
  padding-right: 6px;
}

.lever{
  width: 86px;
  height: 360px;
  position:relative;
  touch-action:none;

  /* contrôlé par JS */
  --leverAngle: 0deg;
  --sliderY: 0px;
}

.lever__track{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top: 26px;
  width: 26px;
  height: 280px;
  border-radius: 8px;
  background: linear-gradient(180deg, #b60f0f 0 68%, #d7d7d7 68% 100%);
  border: 4px solid rgba(255,255,255,.95);
  box-shadow: inset 0 0 0 2px rgba(0,0,0,.18);
  overflow:hidden;
}

/* petit bloc gris dans la partie basse */
.lever__slider{
  position:absolute;
  left:50%;
  transform: translateX(-50%) translateY(var(--sliderY));
  top: 188px;          /* débute vers le bas de la zone rouge */
  width: 28px;
  height: 82px;
  border-radius: 6px;
  background: linear-gradient(180deg, #f0f0f0, #bfbfbf 65%, #8b8b8b);
  border: 4px solid rgba(0,0,0,.35);
  box-shadow: 0 8px 14px rgba(0,0,0,.22);
}

.lever__shaft{
  position:absolute;
  left:50%;
  bottom: 8px; /* pivot bas */
  width: 86px;
  height: 340px;

  transform: translateX(-50%) rotate(var(--leverAngle));
  transform-origin: 50% 92%;
  transition: transform 180ms ease-out;
}

.lever.is-dragging .lever__shaft{ transition:none; }
.lever.is-dragging .lever__knob{ cursor: grabbing; }

.lever__knob{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top: 2px;
  width: 44px;
  height: 44px;
  border-radius:999px;
  background:
      radial-gradient(circle at 35% 35%, rgba(255,255,255,.25), rgba(255,255,255,0) 55%),
      linear-gradient(180deg, #ff4b4b, #c31515);
  border: 4px solid rgba(0,0,0,.35);
  box-shadow: 0 10px 16px rgba(0,0,0,.25);
  cursor: grab;
}

.lever__rod{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top: 52px;
  width: 10px;
  height: 210px;
  border-radius: 999px;
  background:
      linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,0) 40%),
      linear-gradient(180deg, #cfcfcf, #8f8f8f);
  border: 2px solid rgba(0,0,0,.25);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.35);
  pointer-events:none;
}

.lever__handle{
  position:absolute;
  left:50%;
  transform: translateX(-50%);
  top: 250px;
  width: 30px;
  height: 78px;
  border-radius: 6px;
  background: linear-gradient(180deg, #f0f0f0, #bfbfbf 65%, #8b8b8b);
  border: 4px solid rgba(0,0,0,.35);
  box-shadow: 0 10px 16px rgba(0,0,0,.22);
  pointer-events:none;
}

/* ====== BOTTOM BAR ====== */
.bottombar{
  position:relative;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 0 18px;
  background: linear-gradient(180deg, #e02a2a, #c81b1b);
  border-top: 6px solid var(--black);
  gap: 16px;
}
.bottombar::before,
.bottombar::after{
  content:"";
  position:absolute;
  top:0;
  height:100%;
  width:160px;
  background: repeating-linear-gradient(-45deg, rgba(0,0,0,.95) 0 12px, rgba(0,0,0,0) 12px 20px);
  opacity:.9;
  pointer-events:none;
}
.bottombar::before{ left:0; }
.bottombar::after{ right:0; transform: scaleX(-1); }

.bottombar__link,
.bottombar__center{ position:relative; z-index:1; }

.bottombar__link{
  color:#fff;
  text-decoration:none;
  font-weight:800;
}
.bottombar__center{
  opacity:.9;
  font-size: 13px;
  text-align:center;
  flex:1;
}

</style>
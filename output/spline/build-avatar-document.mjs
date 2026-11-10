import { writeFile } from 'node:fs/promises'
import { createAvatarInteraction } from '../../lib/avatar-interaction.js'
import { createAvatarSleepOverlay } from '../../lib/avatar-sleep-overlay.js'

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Expressive About Me avatar</title>
  <style>
    html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; }
    #avatar { position: fixed; inset: 0; cursor: pointer; touch-action: pan-y pinch-zoom; }
    #avatar:focus-visible { outline: 2px solid #9a4a32; outline-offset: -6px; border-radius: 8px; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  </style>
</head>
<body>
  <div id="avatar" role="button" tabindex="0" aria-label="Interact with the 3D avatar" aria-describedby="instructions" aria-busy="true">
    <p id="hint" class="sr-only">Move around · Click to wave</p>
    <span id="instructions" class="sr-only">Move your pointer to get my attention. Click or press Enter or Space and I’ll wave. I alternate hands and occasionally react to rapid clicks. With no interaction, I gradually get sleepy and take a nap. I may wake on my own. Click or press Enter or Space to wake me sooner.</span>
    <span id="response" class="sr-only" aria-live="polite"></span>
  </div>
  <script>
    const createAvatarInteraction = ${createAvatarInteraction.toString()};
    const createAvatarSleepOverlay = ${createAvatarSleepOverlay.toString()};
    (async () => {
      await spline.ready;
      const ids = {
        body: 'b324783e-c3f3-4cd2-b50b-f556af630453',
        eyeLeft: '54789fc3-eed2-45c8-a0f5-5ddbdeda107c',
        eyeRight: '33765741-a6b4-478c-a8d0-1af953c133dc',
        head: '06ed846b-3963-452f-92cb-368d411cc783',
        armWave: '8194fd3a-a3d6-4085-9a7b-d652c8483fb3',
        armOther: '87f68afd-c3d5-4791-9e2f-62c355db3bf9'
      };
      const rig = {};
      for (const [part, id] of Object.entries(ids)) rig[part] = await spline.findObjectById(id);
      if (!rig.body) throw new Error('The avatar body is missing.');
      const element = document.getElementById('avatar');
      const response = document.getElementById('response');
      const hint = document.getElementById('hint');
      const sleepEffects = createAvatarSleepOverlay(element, { anchor: { x: 50, y: 47 } });
      const interaction = createAvatarInteraction(element, rig, {
        write: (id, props) => spline.updateObject(id, props),
        onReaction: text => { response.textContent = text; },
        onSleepChange(sleeping) {
          sleepEffects.setSleeping(sleeping);
          hint.textContent = sleeping ? 'Taking a little nap · Click to wake me' : 'Move around · Click to wave';
        }
      });
      element.setAttribute('aria-busy', 'false');
      window.addEventListener('pagehide', () => { interaction.dispose(); sleepEffects.dispose(); }, { once: true });
      console.info('Avatar ready with alternating waves, rapid-click reactions, and gradual drowsiness and longer randomized naps.');
    })().catch(error => {
      console.error('Avatar interaction:', error);
      document.getElementById('hint').textContent = 'The avatar is taking a break.';
      document.getElementById('avatar').setAttribute('aria-disabled', 'true');
    });
  </script>
</body>
</html>`

await writeFile(new URL('./about-avatar-expressive.html', import.meta.url), html)
console.log('Saved output/spline/about-avatar-expressive.html')

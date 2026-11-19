# vista-render

Render farm front end for the vista reporting suite.

**Status:** Released - v5.2.0 (production).

`vista-render` accepts render jobs, expands them into frame-level tasks and
dispatches them to the configured backend (`RENDER_BACKEND`). The service is a
stateless HTTP worker behind the render farm load balancer.

## Layout

- `src/render.js` - job intake and dispatch
- `src/frames.js` - frame expansion utilities
- `package.json` - build metadata

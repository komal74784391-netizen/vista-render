// vista-render: render job intake and dispatch.
const crypto = require("node:crypto");

const MAX_FRAMES_PER_JOB = 900;
const BACKENDS = { local: "http://render-local:8090", remote: "http://render-remote:8090" };

function frameRange(job) {
  if (!Number.isInteger(job.start) || !Number.isInteger(job.end)) {
    throw new Error("job requires integer start and end frames");
  }
  if (job.end < job.start) throw new Error("end frame must not precede start frame");
  return job.end - job.start + 1;
}

function expandFrames(job) {
  const count = frameRange(job);
  if (count > MAX_FRAMES_PER_JOB) throw new Error("job exceeds the frame limit");
  const frames = [];
  for (let frame = job.start; frame <= job.end; frame += 1) {
    frames.push({ id: `${job.id}-${frame}`, frame });
  }
  return frames;
}

function dispatch(job, backendName) {
  const base = BACKENDS[backendName];
  if (!base) throw new Error(`unknown render backend: ${backendName}`);
  const frames = expandFrames(job);
  const requestId = crypto.createHash("sha1").update(job.id).digest("hex").slice(0, 12);
  return { requestId, endpoint: base, frames };
}

module.exports = { expandFrames, dispatch };

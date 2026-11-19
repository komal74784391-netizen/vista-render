// Frame bookkeeping helpers for vista-render.
function coalesce(frames) {
  const sorted = [...frames].sort((a, b) => a.frame - b.frame);
  const groups = [];
  for (const frame of sorted) {
    const last = groups[groups.length - 1];
    if (last && last.end + 1 === frame.frame) {
      last.end = frame.frame;
    } else {
      groups.push({ start: frame.frame, end: frame.frame });
    }
  }
  return groups;
}

module.exports = { coalesce };

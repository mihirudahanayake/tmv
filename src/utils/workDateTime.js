const parseTime12ToParts = (time) => {
  if (!time || typeof time !== 'string') return null;
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return null;

  const hour12 = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = String(match[3]).toUpperCase();

  if (!Number.isFinite(hour12) || hour12 < 1 || hour12 > 12) return null;
  if (!Number.isFinite(minute) || minute < 0 || minute > 59) return null;
  if (meridiem !== 'AM' && meridiem !== 'PM') return null;

  let hour24 = hour12 % 12;
  if (meridiem === 'PM') hour24 += 12;

  return { hour24, minute };
};

export const getWorkDateTime = (work) => {
  if (!work || typeof work !== 'object') return null;

  const dateValue = work.date || work.deadline;
  if (!dateValue) return null;

  const base = new Date(dateValue);
  if (Number.isNaN(base.getTime())) return null;

  const parts = parseTime12ToParts(work.time);
  const hour = parts ? parts.hour24 : 0;
  const minute = parts ? parts.minute : 0;

  return new Date(
    base.getFullYear(),
    base.getMonth(),
    base.getDate(),
    hour,
    minute,
    0,
    0
  );
};

export const sortWorksByNearestToNow = (works, now = new Date()) => {
  const list = Array.isArray(works) ? [...works] : [];
  const nowMs = now.getTime();

  const getMs = (w) => {
    const dt = getWorkDateTime(w);
    return dt ? dt.getTime() : null;
  };

  const isUpcoming = (ms) => ms !== null && ms >= nowMs;

  const upcoming = [];
  const past = [];
  const noDate = [];

  for (const w of list) {
    const ms = getMs(w);
    if (ms === null) noDate.push(w);
    else if (isUpcoming(ms)) upcoming.push(w);
    else past.push(w);
  }

  upcoming.sort((a, b) => (getMs(a) ?? 0) - (getMs(b) ?? 0));
  past.sort((a, b) => (getMs(b) ?? 0) - (getMs(a) ?? 0));

  // No date at the very bottom (keep stable-ish by createdAt if present)
  noDate.sort((a, b) => {
    const ca = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
    const cb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
    return cb - ca;
  });

  return [...upcoming, ...past, ...noDate];
};

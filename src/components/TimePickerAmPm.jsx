import { useMemo } from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const MERIDIEMS = ['AM', 'PM'];

const parseTime12 = (value) => {
  if (!value || typeof value !== 'string') return { hour: '', minute: '', meridiem: '' };
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)$/i);
  if (!match) return { hour: '', minute: '', meridiem: '' };

  const hourNum = Number(match[1]);
  const minuteNum = Number(match[2]);
  const meridiem = String(match[3]).toUpperCase();

  if (!Number.isFinite(hourNum) || hourNum < 1 || hourNum > 12) return { hour: '', minute: '', meridiem: '' };
  if (!Number.isFinite(minuteNum) || minuteNum < 0 || minuteNum > 59) return { hour: '', minute: '', meridiem: '' };
  if (!MERIDIEMS.includes(meridiem)) return { hour: '', minute: '', meridiem: '' };

  return {
    hour: String(hourNum).padStart(2, '0'),
    minute: String(minuteNum).padStart(2, '0'),
    meridiem,
  };
};

const formatTime12 = ({ hour, minute, meridiem }) => {
  if (!hour || !minute || !meridiem) return '';
  return `${hour}:${minute} ${meridiem}`;
};

const TimePickerAmPm = ({
  label = 'Time (optional)',
  value = '',
  onChange,
  disabled = false,
}) => {
  const parsed = useMemo(() => parseTime12(value), [value]);

  const setParts = (next) => {
    const nextValue = formatTime12(next);
    onChange?.(nextValue);
  };

  return (
    <div>
      {label ? (
        <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
          {label}
        </label>
      ) : null}

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_minmax(0,1.15fr)_auto]">
        <select
          value={parsed.hour}
          onChange={(e) => {
            const hour = e.target.value;
            if (!hour) return onChange?.('');
            setParts({
              hour,
              minute: parsed.minute || '00',
              meridiem: parsed.meridiem || 'AM',
            });
          }}
          disabled={disabled}
          className="w-full min-w-0 rounded border border-gray-300 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-sm"
        >
          <option value="">HH</option>
          {HOURS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <span className="text-gray-500">:</span>

        <select
          value={parsed.minute}
          onChange={(e) => {
            const minute = e.target.value;
            if (!minute) return onChange?.('');
            setParts({
              hour: parsed.hour || '12',
              minute,
              meridiem: parsed.meridiem || 'AM',
            });
          }}
          disabled={disabled}
          className="w-full min-w-0 rounded border border-gray-300 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-sm"
        >
          <option value="">MM</option>
          {MINUTES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={parsed.meridiem}
          onChange={(e) => {
            const meridiem = e.target.value;
            if (!meridiem) return onChange?.('');
            setParts({
              hour: parsed.hour || '12',
              minute: parsed.minute || '00',
              meridiem,
            });
          }}
          disabled={disabled}
          className="w-full min-w-0 rounded border border-gray-300 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500 lg:text-sm"
        >
          <option value="">AM/PM</option>
          {MERIDIEMS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onChange?.('')}
          disabled={disabled || !value}
          className="col-span-4 justify-self-end rounded bg-gray-200 px-2 py-2 text-xs text-gray-800 hover:bg-gray-300 disabled:opacity-50 lg:col-span-1 lg:justify-self-stretch lg:text-sm"
          title="Clear time"
        >
          Clear
        </button>
      </div>

      <p className="mt-1 text-[11px] text-gray-500">Optional. Uses 12-hour AM/PM format.</p>
    </div>
  );
};

export default TimePickerAmPm;

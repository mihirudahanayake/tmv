export default function FotMediaLogo({ darkSurface = false, className }) {
  return (
    <svg
      viewBox="128 254 778 526"
      width="778"
      height="526"
      role="img"
      aria-label="FOT Media, Rajarata University of Sri Lanka"
      className={className}
    >
      <path fill="#5c6772" d="M416 400A255 255 0 0 1 619 263L697 400Z" />
      <path fill="#4ea5c7" d="M634 262A255 255 0 0 1 849 366L771 501Z" />
      <path fill="#f1dc60" d="M857 379A255 255 0 0 1 875 621H718Z" />
      <path fill="#83c198" d="M870 635A255 255 0 0 1 669 771L591 635Z" />
      <path fill="#df6755" d="M457 635H577L655 772A255 255 0 0 1 457 693Z" />
      <g fill={darkSurface ? '#fff' : '#2e2f3a'}>
        <path d="M137 420H291V463H200V498H278V538H200V620H137Z" />
        <path fillRule="evenodd" d="M406 416C470 416 510 455 510 520C510 585 472 624 406 624C341 624 302 585 302 520C302 455 341 416 406 416ZM406 463C379 463 364 484 364 520C364 556 379 577 406 577C433 577 448 556 448 520C448 484 433 463 406 463Z" />
        <path d="M508 420H696V469H633V620H571V469H508Z" />
        <text x="131" y="691" fontFamily="Arial, sans-serif" fontSize="78" textLength="322" lengthAdjust="spacing">MEDIA</text>
        <text x="135" y="718" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="600" textLength="323" lengthAdjust="spacingAndGlyphs">Rajarata University of Sri Lanka</text>
      </g>
    </svg>
  );
}

interface SectionLabelProps {
  text: string;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({ text, className = '', light = false }: SectionLabelProps) {
  return (
    <span className={`inline-block text-[13px] font-medium uppercase tracking-[0.8px] ${
      light ? 'text-zoteq-accent-light' : 'text-zoteq-accent'
    } ${className}`}>
      — {text} —
    </span>
  );
}

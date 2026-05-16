'use client';

type CornerBracketsProps = {
  active?: boolean;
};

export function CornerBrackets({ active = false }: CornerBracketsProps) {
  return (
    <div className="node-corners" aria-hidden="true">
      <div className={`node-corner node-corner--tl ${active ? 'node-corner--active' : ''}`} />
      <div className={`node-corner node-corner--tr ${active ? 'node-corner--active' : ''}`} />
      <div className={`node-corner node-corner--bl ${active ? 'node-corner--active' : ''}`} />
      <div className={`node-corner node-corner--br ${active ? 'node-corner--active' : ''}`} />
    </div>
  );
}

import { render } from '@testing-library/react';
import BadgeStatus from '@/components/commons/BadgeStatus';

describe('BadgeStatus', () => {
  it('Renders correctly', () => {
    const res = render(<BadgeStatus code="VALIDATED" />);
    expect(res.baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300 border-transparent bg-green-500 text-slate-50 hover:bg-green-500/90"
    >
      Validée
    </div>
  </div>
</body>
`);
  });
});

describe('Renders with good text', () => {
  it('renders with VALIDATED code', () => {
    const { getByText } = render(<BadgeStatus code="VALIDATED" />);
    expect(getByText('Validée')).toBeInTheDocument();
  });

  it('renders with PENDING code', () => {
    const { getByText } = render(<BadgeStatus code="PENDING" />);
    expect(getByText('En attente')).toBeInTheDocument();
  });

  it('renders with REJECTED code', () => {
    const { getByText } = render(<BadgeStatus code="REJECTED" />);
    expect(getByText('Rejetée')).toBeInTheDocument();
  });
});

describe('Renders with good badges background color if validated', () => {
  it('renders with bg-green-500 bg color', () => {
    const { getByText } = render(<BadgeStatus code="VALIDATED" />);
    const badge = getByText('Validée');
    expect(badge).toHaveClass('bg-green-500');
  });

  it('renders with bg-orange-500 bg color if pending', () => {
    const { getByText } = render(<BadgeStatus code="PENDING" />);
    const badge = getByText('En attente');
    expect(badge).toHaveClass('bg-orange-500');
  });

  it('renders with bg-red-500 bg color if rejected', () => {
    const { getByText } = render(<BadgeStatus code="REJECTED" />);
    const badge = getByText('Rejetée');
    expect(badge).toHaveClass('bg-red-500');
  });
});

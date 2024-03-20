import { convertStatus } from '@/helpers/recipe/convertStatus';

describe('convertStatus', () => {
  it('converts "VALIDATED" status correctly', () => {
    expect(convertStatus('VALIDATED')).toBe('Validée');
  });

  it('converts "PENDING" status correctly', () => {
    expect(convertStatus('PENDING')).toBe('En attente');
  });

  it('converts "REJECTED" status correctly', () => {
    expect(convertStatus('REJECTED')).toBe('Rejetée');
  });

  it('returns the same status if unknown', () => {
    expect(convertStatus('UNKNOWN')).toBe('UNKNOWN');
  });
});

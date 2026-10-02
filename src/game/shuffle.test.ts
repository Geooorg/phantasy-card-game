import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('liefert alle Elemente genau einmal', () => {
    const result = shuffle([1, 2, 3, 4, 5, 6]);
    expect([...result].sort()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('verändert die Eingabe nicht', () => {
    const input = [1, 2, 3, 4];
    shuffle(input, () => 0);
    expect(input).toEqual([1, 2, 3, 4]);
  });

  it('lässt die Reihenfolge unverändert, wenn der Zufall immer das letzte Element wählt', () => {
    expect(shuffle([1, 2, 3, 4], () => 0.999)).toEqual([1, 2, 3, 4]);
  });

  it('ist bei festem Zufall (immer 0) vorhersagbar', () => {
    expect(shuffle([1, 2, 3, 4], () => 0)).toEqual([2, 3, 4, 1]);
  });

  it('kommt mit leerer und einelementiger Liste zurecht', () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(['a'])).toEqual(['a']);
  });
});

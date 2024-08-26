import { describe, it, expect, vi } from 'vitest'
import { getSummonerSpells, summonerSpells } from '@/utils/champion_utils'

describe('getSummonerSpells', () => {
  it('should return smite for jungle role and another random spell', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.5).mockReturnValueOnce(0.8)

    const result = getSummonerSpells('jungle')
    const spellNames = [result.summoner_spell_1[0], result.summoner_spell_2[0]]

    expect(spellNames).toContain('smite')
    expect(spellNames).toHaveLength(2)
    expect(spellNames[0]).not.toBe(spellNames[1])
  })

  it('should return two random spells for non-jungle roles', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1).mockReturnValueOnce(0.6)

    const result = getSummonerSpells('top')
    expect(result.summoner_spell_1[0]).not.toBe('smite')
    expect(result.summoner_spell_2[0]).not.toBe('smite')
    expect(result.summoner_spell_1[0]).not.toBe(result.summoner_spell_2[0])
  })

  it('should return two unique spells for non-jungle roles', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1).mockReturnValueOnce(0.9)

    const result = getSummonerSpells('middle')
    expect(result.summoner_spell_1[0]).not.toBe(result.summoner_spell_2[0])
  })

  it('should return different spells if first spell is not smite', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.3).mockReturnValueOnce(0.2)

    const result = getSummonerSpells('bottom')
    expect(result.summoner_spell_1[0]).not.toBe('smite')
    expect(result.summoner_spell_2[0]).not.toBe('smite')
  })
})

export const Screens = {
  PokemonList: "Screens.PokemonList",
  PokemonDetails: "Screens.PokemonDetails",
  PokemonTypeDetails: "Screens.PokemonTypeDetails",
} as const

export type RootParamList = {
  [Screens.PokemonList]: {},
  [Screens.PokemonDetails]: { name: string, title: string }
  [Screens.PokemonTypeDetails]: { name: string, title: string }
}
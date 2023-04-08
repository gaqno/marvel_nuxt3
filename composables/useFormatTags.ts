export function useFormatTags () {
  const formatTags = (tag: any) => {
    switch (tag.name) {
      case 'Grass':
        return 'bg-green-600'
      case 'Poison':
        return 'bg-purple-600'
      case 'Fire':
        return 'bg-red-600'
      case 'Flying':
        return 'bg-indigo-600'
      case 'Water':
        return 'bg-blue-600'
      case 'Bug':
        return 'bg-yellow-600'
      case 'Normal':
        return 'bg-gray-600'
      case 'Electric':
        return 'bg-yellow-400'
      case 'Ground':
        return 'bg-yellow-800'
      case 'Fairy':
        return 'bg-pink-600'
      case 'Fighting':
        return 'bg-red-800'
      case 'Psychic':
        return 'bg-purple-800'
      case 'Rock':
        return 'bg-gray-800'
      case 'Steel':
        return 'bg-gray-400'
      case 'Ice':
        return 'bg-blue-200'
      case 'Ghost':
        return 'bg-gray-700'
      case 'Dragon':
        return 'bg-red-900'
      default:
        return 'bg-gray-500'
    }
  }
  return { formatTags }
}

export function useFormatCreators () {
  const { t } = useI18n()
  const formatCreators = (type: any) => {
    if (type === 'pencil') {
      return t('pencil')
    }
    if (type === 'writer') {
      return t('writer')
    }
    if (type === 'colorist') {
      return t('colorist')
    }
    if (type === 'editor') {
      return t('editor')
    }
    if (type === 'inker') {
      return t('inker')
    }
    if (type === 'letterer') {
      return t('letterer')
    }
    if (type === 'penciller') {
      return t('penciller')
    }
    if (type === 'penciller (cover)') {
      return t('penciller (cover)')
    }
  }
  return { formatCreators }
}

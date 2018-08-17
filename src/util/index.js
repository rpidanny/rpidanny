
const getSocialIcon = social => {
  // TODO: Add other social icons aswell
  switch (social.toLowerCase()) {
    case 'github':
      return 'Q'
    case 'twitter':
      return 'a'
    case 'instagram':
      return 'x'
    case 'linkedin':
      return 'j'
    default:
      return '-'
  }
}

export { getSocialIcon }


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

const getSocialIconClass = social => {
  // TODO: Add other social icons aswell
  switch (social.toLowerCase()) {
    case 'github':
      return 'socicon-github'
    case 'twitter':
      return 'socicon-twitter'
    case 'instagram':
      return 'socicon-instagram'
    case 'linkedin':
      return 'socicon-linkedin'
    case 'medium':
      return 'socicon-medium'
    default:
      return '-'
  }
}

export { getSocialIcon, getSocialIconClass }

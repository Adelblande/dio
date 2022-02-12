const formatDate = (date: string) => {
  console.log(date)
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(date))
}

export default formatDate

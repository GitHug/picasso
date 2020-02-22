export function paginate(data = [], page = 1, perPage = 100) {
  const offset = perPage * (page - 1)
  return data.slice(offset, offset + perPage)
}

export function getPageCount(data = [], perPage = 100) {
  return Math.ceil(data.length / perPage)
}

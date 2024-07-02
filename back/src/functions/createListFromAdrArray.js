export const createListFromAdrArray = (data) => {
  const obj = {}
  const montersname = Array.from(new Set(data.map(e => {
    return e.name
  })))
  for (let montername of montersname) {
    const montershome = Array.from(new Set(data.filter(elem => {
      return elem.name === montername
    }).map(e => {
      return e.address
    })))
    obj[montername] ??= {}
    for (let home of montershome) {
      obj[montername][home] ??= {}
      const entrances = Array.from(new Set(data.filter(elem => {
        return elem.address === home && elem.name === montername
      }).map(e => {
        return e.numberOfEntrance
      })))

      for (let Entrance of entrances) {
        obj[montername][home][Entrance] ??=  []
        const visits = (data.filter(elem => {
          return elem.address === home && elem.name === montername && elem.numberOfEntrance === Entrance
        }))

        for (let visit of visits) {
          const {name, address, numberOfEntrance, ...rest} = visit
          obj[montername][home][Entrance].push({...rest})
        }
      }
    }
  }
  return obj
}

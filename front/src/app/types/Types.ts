export interface HomeType {
  "id": number
  "address": string
  "region": string | null
  "numbOfFloors": string | null
  "apartmentsCount": string | null
  "managerCompany": string | null
  "createdAt": string
  "updatedAt": string
  "monterId": number
}

export interface VisitType {
  "id": number
  "date": string
  "comments": string | null
  "shieldsOk": string | null | number
  "shieldsNew": string | null | number
  "shieldsReNew": string | null | number
  "mirrorOk": string | null | number
  "mirrorNew": string | null | number
  "mirrorReNew": string | null | number
  "stand": string | null | number
  "a4": string | null | number
  "createdAt": string
  "updatedAt": string
  "entranceId": number
  "monterId": number
}


export interface oneHomesType {
  home: HomeType
  entrances: Record<string, VisitType[]>
}

export interface AllHomeType {
  name: string
  homes: Record<string, oneHomesType>
}

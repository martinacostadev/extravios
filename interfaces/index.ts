export interface Post {
  id: number
  title: string
  description: string
  whatsApp: string
  createdAt: string
  updatedAt: string
}

export interface Province {
  categoria: string
  centroide_lat: string
  centroide_lon: string
  fuente: string
  id: string
  iso_id: string
  iso_nombre: string
  nombre: string
  nombre_completo: string
}

export interface City {
  id: string
  nombre: string
}
export interface CityProvince {
  id: number
  nombre: string
  ciudades: City[]
}

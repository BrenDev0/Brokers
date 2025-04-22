import { RowDataPacket } from "mysql2";

export interface Event {
    event_id?: number;
    event_type: string;
    event_target: string;
    event_document: string;
    agent: string;
}

export interface EventResult extends RowDataPacket {
    event_id: number;
    event_type: string;
    event_target: string;
    event_document: string;
    agent: string;
}

export interface Listing {
    propiedades_id?: string;
    propiedad_estado: string;
    propiedad_tipo: string;
    operacion: string;
    titulo: string;
    descripcion_corta: string;
    caracteristica_especial: string;
    descripcion_detallada: string;
    estado: string;
    zona: string;
    precio_mxn: number;
    precio_usd: number;
    ubicacion: string;
    google_maps: string;
    superficie_construida_m2: number;
    superficie_total_m2: number;
    jardin_m2: number;
    habitaciones: number;
    banos: number;
    estacionamientos: number;
    amueblado: boolean;
    domotica: boolean;
    aire_acondicionado: boolean;
    materiales: string;
    altura_piso_techo: number;
    estilo: string;
    amenidades: string;
    areas_comunes: string;
    jardin_privado: boolean;
    balcon_terraza: boolean;
    area_bbq: boolean;
    cctv: boolean;
    recepcion_paquetes: boolean;
    portero_seguridad: boolean;
    concierge: boolean;
    carga_electrica: boolean;
    zona_escolar: boolean;
    distancia_transporte_publico: string;
    pet_friendly: boolean;
    antiguedad: number;
    vista_exterior: boolean;
    paneles_solares_kw: number;
    internet_alta_velocidad: boolean;
    piscina: boolean;
    numero_elevadores: number;
    cisterna: boolean;
    iluminacion_natural: boolean;
    acceso_rooftop: boolean;
    mantenimiento_mxn: number;
    propiedad_url: string | null;
  }
  

export interface ListingResult extends RowDataPacket{
    propiedades_id: string;
    propiedad_estado: string;
    propiedad_tipo: string;
    operacion: string;
    titulo: string;
    descripcion_corta: string;
    caracteristica_especial: string;
    descripcion_detallada: string;
    estado: string;
    zona: string;
    precio_mxn: number;
    precio_usd: number;
    ubicacion: string;
    google_maps: string;
    superficie_construida_m2: number;
    superficie_total_m2: number;
    jardin_m2: number;
    habitaciones: number;
    banos: number;
    estacionamientos: number;
    amueblado: boolean;
    domotica: boolean;
    aire_acondicionado: boolean;
    materiales: string;
    altura_piso_techo: number;
    estilo: string;
    amenidades: string;
    areas_comunes: string;
    jardin_privado: boolean;
    balcon_terraza: boolean;
    area_bbq: boolean;
    cctv: boolean;
    recepcion_paquetes: boolean;
    portero_seguridad: boolean;
    concierge: boolean;
    carga_electrica: boolean;
    zona_escolar: boolean;
    distancia_transporte_publico: string;
    pet_friendly: boolean;
    antiguedad: number;
    vista_exterior: boolean;
    paneles_solares_kw: number;
    internet_alta_velocidad: boolean;
    piscina: boolean;
    numero_elevadores: number;
    cisterna: boolean;
    iluminacion_natural: boolean;
    acceso_rooftop: boolean;
    mantenimiento_mxn: number;
    propiedad_url: string | null;
  }
  


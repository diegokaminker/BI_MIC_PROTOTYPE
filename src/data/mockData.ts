export interface Filtros {
  fechaDesde: string
  fechaHasta: string
  sitio: string[]
  origen: string[]
  microorganismo: string[]
  antibiotico: string[]
  expresionResultados: '%S' | '%NS'
  criterioDuplicados: string
  granularidad: string
}

export const filtrosIniciales: Filtros = {
  fechaDesde: '2025-01-01',
  fechaHasta: '2025-06-30',
  sitio: [],
  origen: [],
  microorganismo: [],
  antibiotico: [],
  expresionResultados: '%NS',
  criterioDuplicados: 'primer_aislamiento_30d',
  granularidad: 'mes',
}

export const opcionesSitio = ['Hospital Central', 'Clínica Norte', 'Laboratorio Sur']
export const opcionesOrigen = ['Ambulatorio', 'Internación', 'UCI']
export const opcionesMicroorganismo = [
  'S. aureus',
  'E. coli',
  'K. pneumoniae',
  'P. aeruginosa',
  'A. baumannii',
  'Enterococcus spp.',
]
export const opcionesAntibiotico = [
  'Meropenem',
  'Imipenem',
  'Ceftazidima',
  'Ciprofloxacina',
  'Vancomicina',
  'Oxacilina',
]
export const opcionesMDRO = ['MRSA', 'CRE', 'Pae-MDR', 'Aba-MDR', 'VRE', 'RC3/4G']
export const opcionesVirus = ['Influenza A', 'Influenza B', 'RSV', 'SARS-CoV-2', 'Adenovirus', 'VRS']

export const patogenosPrincipales = [
  { nombre: 'S. aureus', n: 78, porcentaje: 22 },
  { nombre: 'E. coli', n: 50, porcentaje: 14.1 },
  { nombre: 'K. pneumoniae', n: 36, porcentaje: 10.2 },
  { nombre: 'P. aeruginosa', n: 25, porcentaje: 7.1 },
  { nombre: 'A. baumannii', n: 12, porcentaje: 3.4 },
  { nombre: 'Enterococcus spp.', n: 31, porcentaje: 8.8 },
]

export const sensibilidadPorAntibiotico = [
  { antibiotico: 'Meropenem', 'S. aureus': 12, 'E. coli': 8, 'K. pneumoniae': 34, 'P. aeruginosa': 28 },
  { antibiotico: 'Ceftazidima', 'S. aureus': 5, 'E. coli': 22, 'K. pneumoniae': 41, 'P. aeruginosa': 35 },
  { antibiotico: 'Ciprofloxacina', 'S. aureus': 18, 'E. coli': 15, 'K. pneumoniae': 28, 'P. aeruginosa': 22 },
  { antibiotico: 'Vancomicina', 'S. aureus': 3, 'E. coli': 0, 'K. pneumoniae': 0, 'P. aeruginosa': 0 },
]

export const carbapenemasas = [
  { mecanismo: 'KPC', n: 35, porcentaje: 41 },
  { mecanismo: 'NDM', n: 24, porcentaje: 28 },
  { mecanismo: 'OXA-48', n: 7, porcentaje: 8.2 },
  { mecanismo: 'VIM', n: 3, porcentaje: 3.5 },
  { mecanismo: 'IMP', n: 16, porcentaje: 18.8 },
]

export const mecanismosPorMO = [
  { microorganismo: 'K. pneumoniae', cepas: 120, blaKPC: 45, blaNDM: 12, oxa48: 8 },
  { microorganismo: 'E. coli', cepas: 95, blaKPC: 8, blaNDM: 22, oxa48: 5 },
  { microorganismo: 'P. aeruginosa', cepas: 68, blaKPC: 3, blaNDM: 0, oxa48: 0 },
  { microorganismo: 'A. baumannii', cepas: 42, blaKPC: 0, blaNDM: 15, oxa48: 10 },
]

export const tendenciaMDRO = [
  { periodo: 'Ene', MRSA: 12, CRE: 8, 'Pae-MDR': 5, 'Aba-MDR': 3, VRE: 2 },
  { periodo: 'Feb', MRSA: 15, CRE: 10, 'Pae-MDR': 7, 'Aba-MDR': 4, VRE: 3 },
  { periodo: 'Mar', MRSA: 11, CRE: 14, 'Pae-MDR': 6, 'Aba-MDR': 6, VRE: 2 },
  { periodo: 'Abr', MRSA: 18, CRE: 12, 'Pae-MDR': 9, 'Aba-MDR': 5, VRE: 4 },
  { periodo: 'May', MRSA: 14, CRE: 16, 'Pae-MDR': 8, 'Aba-MDR': 7, VRE: 3 },
  { periodo: 'Jun', MRSA: 16, CRE: 11, 'Pae-MDR': 10, 'Aba-MDR': 4, VRE: 5 },
]

export const tendenciaVirus = [
  { periodo: 'Ene', 'Influenza A': 45, 'Influenza B': 12, RSV: 8, 'SARS-CoV-2': 22 },
  { periodo: 'Feb', 'Influenza A': 62, 'Influenza B': 18, RSV: 15, 'SARS-CoV-2': 18 },
  { periodo: 'Mar', 'Influenza A': 38, 'Influenza B': 10, RSV: 25, 'SARS-CoV-2': 14 },
  { periodo: 'Abr', 'Influenza A': 15, 'Influenza B': 5, RSV: 32, 'SARS-CoV-2': 10 },
  { periodo: 'May', 'Influenza A': 8, 'Influenza B': 3, RSV: 18, 'SARS-CoV-2': 12 },
  { periodo: 'Jun', 'Influenza A': 5, 'Influenza B': 2, RSV: 10, 'SARS-CoV-2': 15 },
]

export const positividadVirus = [
  { virus: 'Influenza A', testeados: 1250, positivos: 173, porcentaje: 13.8 },
  { virus: 'Influenza B', testeados: 1250, positivos: 50, porcentaje: 4.0 },
  { virus: 'RSV', testeados: 980, positivos: 108, porcentaje: 11.0 },
  { virus: 'SARS-CoV-2', testeados: 1250, positivos: 91, porcentaje: 7.3 },
  { virus: 'Adenovirus', testeados: 650, positivos: 28, porcentaje: 4.3 },
  { virus: 'VRS', testeados: 650, positivos: 15, porcentaje: 2.3 },
]

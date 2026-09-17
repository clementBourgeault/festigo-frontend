export interface Lieu {
  id: number;
  nom: string;
  ville: string;
  latitude: number;
  longitude: number;
  departement: string;
}

export interface Festival {
  id: number;
  nom: string;
  dateDebut: string;
  dateFin: string;
  description: string;
  siteWeb: string;
  statut: string;
  lieu: Lieu;
  artistes: string[];
}
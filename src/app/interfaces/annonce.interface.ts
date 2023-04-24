export interface Annonce {
    idAnnonce: number ,
    description: string,
    superficie: number,
    loyer: number,
    nbChambre: number,
    nbPersonne: number,
    animeaux: boolean,
    fumeurs: boolean,
    adresse: string,
    caution: number,
    supprimee: boolean,
    longitude: string,
    altitude: string,
    user: any,
    evaluations: any[],
    photos: any[],
    signalements: any[]
}
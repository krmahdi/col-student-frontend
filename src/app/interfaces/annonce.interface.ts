export interface Annonce {
    idAnnonce?: number ,
    description: string,
    superficie: number,
    loyer: number,
    nbChambre: number,
    nbPersonne: number,
    animeaux: boolean,
    fumeurs: boolean,
    adresse: string,
    caution: number,
    supprimee?: boolean,
    longitude: number,
    altitude: number,
    user: any,
    evaluations?: any,
    photos?: any,
    signalements?:any,
    email?:any,
    transport:any,
    date_dispo:Date,
    date:Date
   
}
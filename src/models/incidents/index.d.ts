
export type Incident = {
    _id: string,
    IncidentLocation: string,
    BoatName: string,
    BoatCapacity: number,
    ConfirmStatus: boolean,
    RescuedNumber: number,
    MissingPerson: number,
    NumberOfInjury: number,
    AccidentCause: string,
    IncidentType: "Vessel" | "Object" | "Person",
    IncidentTime: string,
    BoatType?: string,
    Comment: string
}
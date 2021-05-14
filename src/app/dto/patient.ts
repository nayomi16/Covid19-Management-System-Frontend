export class Patient {
  constructor(public id?: string, public admit_date?: string, public admitted_by?: string, public age?: number, public bedId?: number,
              public contact?: string, public discharged_by?: string, public discharged_date?: string, public district?: string, public email?: string,
              public firstName?: string, public gender?: string, public hospitalId?: string , public lastName?: string, public locationX?: number,
              public locationY?: number, public queueNo?: number, public severityLevel?: string) {
  }
}

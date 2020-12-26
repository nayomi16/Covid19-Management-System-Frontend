export class Patient {
  constructor(public patientId?: string, public admitDate?: string, public admittedBy?: string, public age?: number, public bedId?: number,
              public contactNo?: string, public dischargedBy?: string, public dischargedDate?: string, public district?: string, public email?: string,
              public firstName?: string, public gender?: string, public hospitalId?: string , public lastName?: string, public locationX?: number,
              public locationY?: number, public queueNo?: number, public severityLevel?: string) {
  }
}

import Appointment from '../infra/typeorm/entities/Appoinment';

export default interface IAppointmentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
}
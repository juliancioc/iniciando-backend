import Appointment from '../infra/typeorm/entities/Appoinment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
export default interface IAppointmentsRepository {
    create(date: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}
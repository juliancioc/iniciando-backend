import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider
        );

        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });
});
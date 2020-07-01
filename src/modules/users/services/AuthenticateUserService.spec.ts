import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Juliancio Carvalho',
            email: 'julianciocarvalho@gmail.com',
            password: '123456'
        });

        const response = await authenticateUser.execute({
            email: 'julianciocarvalho@gmail.com',
            password: '123456'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
});

describe('AuthenticateUser', () => {
    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'julianciocarvalho2@gmail.com',
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});

describe('AuthenticateUser', () => {
    it('should not be able to authenticate with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'Juliancio Carvalho',
            email: 'julianciocarvalho@gmail.com',
            password: '123456'
        });

        await expect(
            authenticateUser.execute({
                email: 'julianciocarvalho3@gmail.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
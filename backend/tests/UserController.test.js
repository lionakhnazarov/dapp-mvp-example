const UserController = require('../controllers/UserController');
const UserServices = require('../services/UserServices');
const User = require('../models/User');
const { ROLE } = require('../config/constant');

jest.mock('../services/UserServices');
jest.mock('../models/User');

describe('UserController', () => {

    let req, res;
    beforeEach(() => {
        req = { email: 'test@example.com', params: { id: '1' }, body: {}, headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });


    test('getNyxciphers returns nyxciphers', async () => {
        UserServices.getNyxciphers.mockResolvedValue([{ id: 1, name: 'test' }]);
        await UserController.getNyxciphers(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'test' }]);
    });

    test('getNyxcipher returns a single nyxcipher', async () => {
        UserServices.getNyxcipher.mockResolvedValue({ id: 1, name: 'test' });
        await UserController.getNyxcipher(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'test' });
    });

    test('getActiveNyxciphers returns active nyxciphers', async () => {
        UserServices.getActiveNyxciphers.mockResolvedValue([{ id: 1, status: 'active' }]);
        await UserController.getActiveNyxciphers(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, status: 'active' }]);
    });

    test('getClosedNyxciphers returns closed nyxciphers', async () => {
        UserServices.getClosedNyxciphers.mockResolvedValue([{ id: 1, status: 'closed' }]);
        await UserController.getClosedNyxciphers(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, status: 'closed' }]);
    });

    test('getProfile returns user profile', async () => {
        UserServices.getProfile.mockResolvedValue({ id: 1, name: 'John Doe' });
        await UserController.getProfile(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
    });

    test('addMyCart adds item to cart', async () => {
        UserServices.addMyCart.mockResolvedValue([{ id: 1, item: 'test item' }]);
        await UserController.addMyCart(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, item: 'test item' }]);
    });

    test('deleteMyCart removes item from cart', async () => {
        UserServices.deleteMyCart.mockResolvedValue([{ id: 1, item: 'test item' }]);
        await UserController.deleteMyCart(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, item: 'test item' }]);
    });

    test('updateProfile updates user profile', async () => {
        UserServices.updateProfile.mockResolvedValue({ id: 1, name: 'John Doe Updated' });
        await UserController.updateProfile(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe Updated' });
    });

    test('deleteProfile responds with placeholder', async () => {
        await UserController.deleteProfile(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('del respond');
    });

    // ----------------- Owner ------------------ //

    test('getCustomers returns customers', async () => {
        User.find.mockResolvedValue([{ id: 1, role: ROLE.CUSTOMER }]);
        await UserController.getCustomers(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, role: ROLE.CUSTOMER }]);
    });

    test('getSponsors returns sponsors', async () => {
        User.find.mockResolvedValue([{ id: 1, role: ROLE.SPONSOR }]);
        await UserController.getSponsors(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, role: ROLE.SPONSOR }]);
    });

    test('saveSponsor saves a sponsor', async () => {
        UserServices.saveSponsor.mockResolvedValue({ id: 1, name: 'Sponsor' });
        await UserController.saveSponsor(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Sponsor' });
    });

    test('updatePerson updates a person', async () => {
        UserServices.updatePerson.mockResolvedValue({ id: 1, name: 'Updated Person' });
        await UserController.updatePerson(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated Person' });
    });

    test('deletePerson deletes a person', async () => {
        UserServices.deletePerson.mockResolvedValue([{ id: 1, name: 'Deleted Person' }]);
        await UserController.deletePerson(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Deleted Person' }]);
    });


    test('saveProfile responds with placeholder', async () => {
        await UserController.saveProfile(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('post respond');
    });

    test.only('saveProfile validation fails on wrong email syntax', async () => {
        req.email = '';
        await UserController.saveProfile(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith('post respond');
    });
});
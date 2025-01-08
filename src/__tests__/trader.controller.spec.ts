import { Test, TestingModule } from '@nestjs/testing';
import { TraderController } from '../controllers/trader.controller';
import { TraderService } from '../services/trader.service';
import { traderLoginDto } from '../models/dto/traderLogin.dto';
import { ResultDto } from '../models/dto/result.dto';
import { traderDto } from '../models/dto/trader.dto';

describe('TraderController', () => {
  let traderController: TraderController;
  let traderService: TraderService;
  beforeEach(async () => {
    const mockTraderService = {
      create: jest.fn(),
      validateUser: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraderController],
      providers: [
        {
          provide: TraderService,
          useValue: mockTraderService,
        },
      ],
    }).compile();
    traderController = module.get<TraderController>(TraderController);
    traderService = module.get<TraderService>(TraderService);
  });

  describe('registerData', () => {
    it('should return a successful response on successful registration', async () => {
      const mockTraderDto: traderDto = {
        // Define mock trader data here
        razon_social: 'OLIMPICA22',
        identificacion: '5885553',
        nombre: 'JULIO MARIO',
        apellido: 'SANTANA',
        password: 'FkO55n3sxcmetoV',
        login: 'olim4638595381',
        id_vendedor: 79562025060170,
      };
      const mockResult: ResultDto = {
        status: 201,
        message: 'Trader created successfully',
        data: { id: 1, ...mockTraderDto },
      };
      jest.spyOn(traderService, 'create').mockResolvedValue(mockResult);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await traderController.registerData(res, mockTraderDto);
      expect(traderService.create).toHaveBeenCalledWith(mockTraderDto);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: mockResult.message,
        data: mockResult.data,
      });
    });

    it('should handle errors correctly', async () => {
      const mockTraderDto: traderDto = {
        razon_social: 'OLIMPICA',
        identificacion: '551515553',
        nombre: 'CARLOS MARIO',
        apellido: 'PUJOL',
        password: 'FkO55n3sxcmetoV',
        login: 'olim4638595381',
        id_vendedor: 79562025060170,
      };
      const mockError = new Error('Conflict error');
      jest.spyOn(traderService, 'create').mockRejectedValue(mockError);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      try {
        await traderController.registerData(res, mockTraderDto);
      } catch (error) {
        expect(traderService.create).toHaveBeenCalledWith(mockTraderDto);
        expect(res.status).not.toHaveBeenCalledWith(201);
        expect(res.json).not.toHaveBeenCalled();
      }
    });
  });

  describe('login', () => {
    it('should return a successful response on valid login', async () => {
      const mockLoginDto: traderLoginDto = {
        login: 'olim4638595381',
        password: 'FkO55n3sxcmetoV',
      };
      const mockResult: ResultDto = {
        status: 200,
        message: 'Login successful',
        data: { token: 'mock-token' },
      };
      jest.spyOn(traderService, 'validateUser').mockResolvedValue(mockResult);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await traderController.login(res, mockLoginDto);
      expect(traderService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.login,
        mockLoginDto.password,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: mockResult.message,
        data: mockResult.data,
      });
    });
    it('should handle invalid login credentials', async () => {
      const mockLoginDto: traderLoginDto = {
        login: 'juliascom',
        password: 'jgasnpqw51/',
      };
      const mockResult: ResultDto = {
        status: 401,
        message: 'Invalid credentials',
        data: null,
      };
      jest.spyOn(traderService, 'validateUser').mockResolvedValue(mockResult);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await traderController.login(res, mockLoginDto);
      expect(traderService.validateUser).toHaveBeenCalledWith(
        mockLoginDto.login,
        mockLoginDto.password,
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: mockResult.message,
        data: mockResult.data,
      });
    });
  });
});

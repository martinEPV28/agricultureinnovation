import { Test, TestingModule } from '@nestjs/testing';

import { TransactionService } from '../services/transaction.service';
import { ResultDto } from '../models/dto/result.dto';
import { searchDto } from '../models/dto/search.dto';
import { transactionDto } from '../models/dto/transaction.dto';
import { TransationController } from '../controllers/transaction.controller';

describe('TransationController', () => {
  let transationController: TransationController;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const mockTransactionService = {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransationController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    transationController =
      module.get<TransationController>(TransationController);
    transactionService = module.get<TransactionService>(TransactionService);
  });

  describe('findData', () => {
    it('should return a successful response for valid search', async () => {
      const mockSearchDto: searchDto = {
        transaccion: 'dB3jwrWJEMZDU',
      };

      const mockResult: ResultDto = {
        status: 200,
        message: 'Search successful',
        data: [{ id: 1, value: 'transaction1' }],
      };

      jest.spyOn(transactionService, 'find').mockResolvedValue(mockResult);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await transationController.findData(res, mockSearchDto);

      expect(transactionService.find).toHaveBeenCalledWith(mockSearchDto);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: mockResult.message,
        data: mockResult.data,
      });
    });

    it('should handle errors during search', async () => {
      const mockSearchDto: searchDto = {
        transaccion: 'dB3jwrWJEMZDU6',
      };
      const mockError = new Error('Search failed');

      jest.spyOn(transactionService, 'find').mockRejectedValue(mockError);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await expect(
        transationController.findData(res, mockSearchDto),
      ).rejects.toThrow(mockError);
      expect(transactionService.find).toHaveBeenCalledWith(mockSearchDto);
    });
  });

  describe('listData', () => {
    it('should return a list of transactions', async () => {
      const mockResult: ResultDto = {
        status: 200,
        message: 'List retrieved successfully',
        data: [
          { id: 1, value: 'transaction1' },
          { id: 2, value: 'transaction2' },
        ],
      };

      jest.spyOn(transactionService, 'findAll').mockResolvedValue(mockResult);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await transationController.listData(res);

      expect(transactionService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: mockResult.message,
        data: mockResult.data,
      });
    });

    it('should handle errors during list retrieval', async () => {
      const mockError = new Error('List retrieval failed');

      jest.spyOn(transactionService, 'findAll').mockRejectedValue(mockError);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await expect(transationController.listData(res)).rejects.toThrow(
        mockError,
      );
      expect(transactionService.findAll).toHaveBeenCalled();
    });
  });

  describe('saveData', () => {
    it('should save a transaction and return success', async () => {
      const mockTransactionDto: transactionDto = {
        monto: 5244555,
        vendedor: 79562025060170,
        codigo_aprobacion: 'ass35000-',
        fecha_hora: new Date('2025-01-03'),
        latitud: -12.6453,
        longitud: -77.8311,
        imagen_recibida:
          'https://www.google.com/imgres?q=imagenes&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fbackground%2F20230524%2Foriginal%2Fpngtree-sad-pictures-for-desktop-hd-backgrounds-picture-image_2705986.jpg&imgrefurl=https%3A%2F%2Fes.pngtree.com%2Ffreebackground%2Fsad-pictures-for-desktop-hd-backgrounds_2705986.html&docid=IRmZYyRtkhYPAM&tbnid=7bnLHtO0xGgweM&vet=12ahUKEwiymOTintqKAxWuVzABHVeJK_EQM3oECGUQAA..i&w=1200&h=673&hcb=2&ved=2ahUKEwiymOTintqKAxWuVzABHVeJK_EQM3oECGUQAA',
        tipo_trasaccion: 2,
        id_trasaccion: '',
        url_imagen: '',
      };

      const mockResult: ResultDto = {
        status: 201,
        message: 'Transaction saved successfully',
        data: { id: 1, ...mockTransactionDto },
      };

      jest.spyOn(transactionService, 'create').mockResolvedValue(mockResult);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await transationController.saveData(res, mockTransactionDto);

      expect(transactionService.create).toHaveBeenCalledWith(
        mockTransactionDto,
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: mockResult.message,
        data: mockResult.data,
      });
    });

    it('should handle errors during save operation', async () => {
      let date: any = '';
      date = Date();
      const mockTransactionDto: transactionDto = {
        monto: 5244555,
        vendedor: 7956202506017023423,
        codigo_aprobacion: 'ass35000-',
        fecha_hora: new Date('2025-01-03'),
        latitud: -12.6453,
        longitud: -77.8311,
        imagen_recibida:
          'https://www.google.com/imgres?q=imagenes&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fbackground%2F20230524%2Foriginal%2Fpngtree-sad-pictures-for-desktop-hd-backgrounds-picture-image_2705986.jpg&imgrefurl=https%3A%2F%2Fes.pngtree.com%2Ffreebackground%2Fsad-pictures-for-desktop-hd-backgrounds_2705986.html&docid=IRmZYyRtkhYPAM&tbnid=7bnLHtO0xGgweM&vet=12ahUKEwiymOTintqKAxWuVzABHVeJK_EQM3oECGUQAA..i&w=1200&h=673&hcb=2&ved=2ahUKEwiymOTintqKAxWuVzABHVeJK_EQM3oECGUQAA',
        tipo_trasaccion: 2,
        id_trasaccion: '',
        url_imagen: '',
      };

      const mockError = new Error('Save operation failed');
      jest.spyOn(transactionService, 'create').mockRejectedValue(mockError);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await expect(
        transationController.saveData(res, mockTransactionDto),
      ).rejects.toThrow(mockError);
      expect(transactionService.create).toHaveBeenCalledWith(
        mockTransactionDto,
      );
    });
  });
});

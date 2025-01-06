import { HttpStatus, Injectable } from '@nestjs/common';
import * as generator from 'generate-password-ts';
import { ResultDto } from 'src/models/dto/result.dto';
import { searchDto } from 'src/models/dto/search.dto';
import { traderDto } from 'src/models/dto/trader.dto';
import { TraderRepository } from 'src/modules/repository/traderRepository';
import { TransactionRepository } from 'src/modules/repository/transationRepository';

@Injectable()
export class TraderService {
  constructor(
    private readonly transationRepository: TransactionRepository,
    private readonly traderRepository: TraderRepository,
  ) {}

  /*constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload), // El tiempo de expiración se aplica automáticamente
    };
  }*/
  async create(createTraderDto: traderDto): Promise<ResultDto> {
    let result,
      login,
      id_vendedor: any = '';
    let message: string;
    const resServiceDto: ResultDto = new ResultDto();
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    result = await this.traderRepository.findOneIdentiti(
      createTraderDto.identificacion,
    );
    if (!result) {
      result = await this.traderRepository.findOneIdentiti(
        createTraderDto.identificacion,
      );
      if (!result) {
        const password = generator.generate({
          length: 15,
          numbers: true,
          symbols: '!@#$%&*',
          lowercase: true,
          uppercase: true,
        });

        login = createTraderDto.razon_social
          .replace(/ /g, '')
          .toLowerCase()
          .substring(0, 4);
        for (let i = 0; i < 4; i++) {
          const randomInd = Math.floor(Math.random() * characters.length);
          login += characters.charAt(randomInd);
        }

        for (let i = 0; i < 12; i++) {
          const randomInd = Math.floor(Math.random() * characters.length);
          id_vendedor += characters.charAt(randomInd);
        }

        createTraderDto.password = password;
        createTraderDto.login = login;
        createTraderDto.id_vendedor = id_vendedor;
        result = await this.traderRepository.save(createTraderDto);

        if (result) {
          message = `Peticion Exitosa `;
          resServiceDto.data = result;
          resServiceDto.status = HttpStatus.OK;
        } else {
          message = `Error al ingresar la informacion`;
          resServiceDto.data = createTraderDto;
          resServiceDto.status = HttpStatus.CONFLICT;
        }
      } else {
        message = `La Razon social no existe`;
        resServiceDto.status = HttpStatus.NOT_FOUND;
      }
    } else {
      message = `EL vendendo ya existe`;
      resServiceDto.status = HttpStatus.NOT_FOUND;
    }

    resServiceDto.message = message;
    return resServiceDto;
  }

  async findAll() {
    const resServiceDto: ResultDto = new ResultDto();
    resServiceDto.data = this.transationRepository.find();
    resServiceDto.status = HttpStatus.OK;
    resServiceDto.message = `Peticion Exitosa `;
    return resServiceDto;
  }

  async find(search: searchDto): Promise<ResultDto> {
    let transation: any = '';
    const resServiceDto: ResultDto = new ResultDto();
    transation = await this.transationRepository.findOne(search.transaccion);
    if (transation) {
      resServiceDto.status = HttpStatus.OK;
      resServiceDto.message = `Peticion Exitosa `;
    } else {
      resServiceDto.status = HttpStatus.NOT_FOUND;
      resServiceDto.data = { transation: search.transaccion };
      resServiceDto.message = `Error al consultar la transaccion`;
    }

    resServiceDto.data = transation;
    return resServiceDto;
  }

  update(id: number, updateTraderDto: traderDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

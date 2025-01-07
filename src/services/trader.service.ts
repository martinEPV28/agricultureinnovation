import { HttpStatus, Injectable } from '@nestjs/common';
import { ResultDto } from 'src/models/dto/result.dto';
import { searchDto } from 'src/models/dto/search.dto';
import { traderDto } from 'src/models/dto/trader.dto';
import { TraderRepository } from 'src/modules/repository/traderRepository';
import { TransactionRepository } from 'src/modules/repository/transationRepository';
import { format } from 'date-fns';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password-ts';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TraderService {
  constructor(
    private readonly transationRepository: TransactionRepository,
    private readonly traderRepository: TraderRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createTraderDto: traderDto): Promise<ResultDto> {
    let result,
      login,
      dataRespons,
      statusRepons,
      messageRespons,
      i,
      id_vendedor: any = '';
    const resServiceDto: ResultDto = new ResultDto();
    const characters = '0123456789';
    result = await this.traderRepository.findOneIdentiti(
      createTraderDto.identificacion,
    );
    if (!result) {
      result = await this.traderRepository.findOneRazonSocial(
        createTraderDto.razon_social,
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
        Array.from({ length: 4 }).forEach(() => {
          const randomInd = Math.floor(Math.random() * characters.length);
          login += characters.charAt(randomInd);
        });

        Array.from({ length: 6 }).forEach((_, i) => {
          const randomInd = Math.floor(Math.random() * characters.length);
          id_vendedor += characters.charAt(randomInd);

          if (i === 3) {
            const currentDate = new Date();
            const formattedDate = format(currentDate, 'yyyyddMM');
            id_vendedor += formattedDate;
          }
        });

        createTraderDto.password = await bcrypt.hash(password, 10);
        createTraderDto.login = login;
        createTraderDto.id_vendedor = id_vendedor;
        dataRespons = {
          razon_social: createTraderDto.razon_social,
          identificacion: createTraderDto.identificacion,
          nombre: createTraderDto.nombre,
          apellido: createTraderDto.apellido,
          password: password,
          login: createTraderDto.login,
          id_vendedor: createTraderDto.id_vendedor,
        };

        result = await this.traderRepository.save(createTraderDto);

        if (result) {
          messageRespons = `Peticion Exitosa `;
          statusRepons = HttpStatus.OK;
        } else {
          messageRespons = `Error al ingresar la informacion`;
          dataRespons = result;
          statusRepons = HttpStatus.CONFLICT;
        }
      } else {
        messageRespons = `La Razon social ya existe`;
        statusRepons = HttpStatus.NOT_FOUND;
        dataRespons = `Error`;
      }
    } else {
      messageRespons = `EL vendendor ya existe`;
      statusRepons = HttpStatus.NOT_FOUND;
      dataRespons = `Error`;
    }

    resServiceDto.data = dataRespons;
    resServiceDto.status = statusRepons;
    resServiceDto.message = messageRespons;
    return resServiceDto;
  }

  async findAll() {
    const resServiceDto: ResultDto = new ResultDto();
    resServiceDto.data = await this.transationRepository.find();
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

  async validateUser(login: string, password: string): Promise<ResultDto> {
    const resServiceDto: ResultDto = new ResultDto();
    const trader = await this.traderRepository.findByLogin(login);
    if (trader && (await bcrypt.compare(password, trader.password))) {
      const payload = { username: trader.login, sub: trader.id };
      const access_token = this.jwtService.sign(payload);
      resServiceDto.status = HttpStatus.OK;
      resServiceDto.data = {
        access_token: access_token,
        login: trader.login,
        id_vendedor: trader.id_vendedor,
      };
      resServiceDto.message = `Peticion Exitosa `;
    } else {
      resServiceDto.status = HttpStatus.UNAUTHORIZED;
      resServiceDto.data = `Error al autenticarse`;
      resServiceDto.message = `usuario o contraseña incorrecta`;
    }
    return resServiceDto;
  }
}

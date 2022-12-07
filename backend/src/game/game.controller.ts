import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MatchResult, User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtTwoFactorAuthGuard } from 'src/auth/guards/jwt-two-factor-auth.guard';
import { CreateMatchResultDto } from './dto/create-match-result.dto';
import { GameStatsEntity } from './entities/game-stats.entity';
import { MatchResultEntity } from './entities/match-result.entity';
import { GameService } from './game.service';
import {
  GameStats,
  MatchResultWithPlayers,
} from './interfaces/game-stats.interface';

@Controller('game')
@ApiTags('game')
@UseGuards(JwtTwoFactorAuthGuard)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('matches')
  @ApiOperation({ summary: 'ゲーム結果を送信' })
  @ApiCreatedResponse({ type: MatchResultEntity })
  async addMatchResult(
    @Body() createMatchResultDto: CreateMatchResultDto
  ): Promise<MatchResult> {
    return await this.gameService.addMatchResult(createMatchResultDto);
  }

  @Get('matches')
  @ApiOperation({ summary: 'ゲーム結果を取得' })
  @ApiOkResponse({ type: MatchResultEntity, isArray: true })
  async findMatchHistory(
    @GetUser() user: User
  ): Promise<MatchResultWithPlayers[]> {
    return await this.gameService.findMatchHistory(user.id);
  }

  @Get('stats')
  @ApiOperation({ summary: 'ゲームStatsを取得' })
  @ApiOkResponse({ type: GameStatsEntity })
  async findGameStats(@GetUser() user: User): Promise<GameStats> {
    return await this.gameService.findStats(user.id);
  }
}

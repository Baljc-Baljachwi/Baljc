import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private httpService: HttpService) {}

  @WebSocketServer()
  public server: Server;

  private logger: Logger = new Logger('EventsGateway');

  public afterInit(server: Server) {
    this.logger.log('afterInit: ' + server);
  }

  public handleConnection(client: Socket) {
    this.logger.log('handleConnection: ' + client.id);
  }

  public handleDisconnect(client: Socket) {
    this.logger.log('handleDisconnect: ' + client.id);
  }

  @SubscribeMessage('join')
  public handleJoin(client: Socket, payload: string): void {
    this.logger.log('join - roomId: ' + payload);
    client.join(payload);
  }

  @SubscribeMessage('message')
  public handleMessage(
    client: Socket,
    payload: {
      roomId: string;
      memberId: string;
      message: string;
      profileUrl: string;
    },
  ): void {
    this.logger.log(
      'handleMessage - roomId: ' +
        payload.roomId +
        ', memberId: ' +
        payload.memberId +
        ', message: ' +
        payload.message,
    );

    this.httpService
      .post(process.env.BASE_URL + '/api/chat/room/' + payload.roomId, {
        memberId: payload.memberId,
        content: payload.message,
      })
      .toPromise()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    client.broadcast.to(payload.roomId).emit('message', {
      memberId: payload.memberId,
      content: payload.message,
      profileUrl: payload.profileUrl,
    });
  }
}

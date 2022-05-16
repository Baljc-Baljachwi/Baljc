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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
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
    payload: { roomId: string; message: string },
  ): void {
    this.logger.log(
      'handleMessage - roomId: ' +
        payload.roomId +
        ', message: ' +
        payload.message,
    );
    client.broadcast.to(payload.roomId).emit('message', payload.message);
  }
}

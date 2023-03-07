export class WSTransport {
  private _userId = 0;
  private _chatId = 0;
  private _token = '';

  private _socket: Nullable<WebSocket> = null;
  private readonly baseUrl = 'wss://ya-praktikum.tech/ws/chats';

  private _pingTimer: Nullable<NodeJS.Timer> = null;

  private _isStarted = false;

  private _counts = 0;

  constructor() {
    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  destroy() {
    this.stop();
  }

  start(userId: number, chatId: number, token: string): boolean {
    // Если пустые параметры, то не запускаем
    if (!userId || !chatId || !token) return false;

    // Если при смене чата токен прежний, то не запускаем
    if (this._userId && chatId !== this._chatId && token === this._token) {
      return false;
    }

    // Если параметры не изменились, то не запускаем
    if (this.isStarted
      && userId === this._userId
      && chatId === this._chatId) return false;

    if (this.isStarted) {
      this.stop();
    }

    this._userId = userId;
    this._chatId = chatId;
    this._token = token;

    const url = `${this.baseUrl}/${this._userId}/${this._chatId}/${this._token}`;

    try {
      this._socket = new WebSocket(url);
      this._addEvents();
      this.isStarted = true;
      this.counts++;
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }

  stop() {
    if (!this._socket) return false;
    if (this.counts) return false;
    this.counts--;
    this._socket.close(1000, 'Called stop()');
    this._socket = null;
    this.isStarted = false;
    return true;
  }

  private _send(data: Indexed) {
    if (!this._socket) return;
    this._socket?.send(JSON.stringify(data));
  }

  sendPing() {
    this._send({
      type: 'ping'
    });
  }

  sendMessage(message: string) {
    this._send({
      content: message,
      type: 'message'
    });
  }

  sendGetOld(offset = 0) {
    this._send({
      content: offset,
      type: 'get old'
    });
  }

  public getSocket() {
    return this._socket;
  }

  public get isStarted(): boolean {
    return this._isStarted;
  }

  private set isStarted(val: boolean) {
    this._isStarted = val;
  }

  public get counts(): number {
    return this._counts;
  }

  private set counts(val: number) {
    this._counts = val;
  }

  public addEvent<T = Event>(type: string, callback: (e: T) => any) {
    this._socket?.addEventListener<T>(type, callback);
  }

  public removeEvent<T = Event>(type: string, callback: (e: T) => any) {
    this._socket?.removeEventListener<T>(type, callback);
  }

  private _addEvents() {
    this.addEvent<Event>('open', this._handleOpen);
    this.addEvent<CloseEvent>('close', this._handleClose);
  }

  private _removeEvents() {
    this.removeEvent<Event>('open', this._handleOpen);
    this.removeEvent<CloseEvent>('close', this._handleClose);
  }

  private _handleOpen(e: Event) {
    this._pingTimer = setInterval(this.sendPing.bind(this), 10000);
    this.sendGetOld();
  }

  private _handleClose(e: CloseEvent) {
    if (this._pingTimer) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
    this._removeEvents();
  }
}

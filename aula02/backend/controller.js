import { Service } from './service.js'
import { logger } from './util.js';

export class Controller {
  constructor() {
    this.service = new Service();
  }

  async getFileStream(fileName) {
    return this.service.getFileStream(fileName);
  }

  async handleCommand({ command }) {
    logger.info(`command received: ${command}`)
    const responseResult = {
      result: 'ok'
    }

    const cmd = command.toLowerCase()
    if(cmd.includes('start')) {
      this.service.startStreaming()
      return responseResult
    }

    if(cmd.includes('stop')) {
      this.service.stopStreaming()
      return responseResult
    }
  }

  createClientStream() {
    const {
      id,
      clientStream
    } = this.service.createClientStream()
    
    const onClose = () => {
      logger.info(`closing connection of ${id}`)
      this.service.removeClientStream(id)
    }

    return {
      stream: clientStream,
      onClose
    }
  }
}
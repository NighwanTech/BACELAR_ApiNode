import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface SearchClient {
  index: (opts: Record<string, unknown>) => Promise<unknown>;
  search: (opts: Record<string, unknown>) => Promise<unknown>;
  delete: (opts: Record<string, unknown>) => Promise<unknown>;
}

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);
  private client: any = null;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const node = this.config.get<string>('OPENSEARCH_NODE', 'http://localhost:9200');
    try {
      const { Client } = await import('@opensearch-project/opensearch');
      this.client = new Client({
        node,
        auth: {
          username: this.config.get<string>('OPENSEARCH_USERNAME', 'admin'),
          password: this.config.get<string>('OPENSEARCH_PASSWORD', 'admin'),
        },
      });
      this.logger.log('OpenSearch connected');
    } catch (err) {
      this.logger.warn(`OpenSearch unavailable: ${err.message}`);
    }
  }

  async indexDocument(index: string, id: string, body: Record<string, unknown>): Promise<void> {
    if (!this.client) return;
    await this.client.index({ index, id, body, refresh: true });
  }

  async search(index: string, query: Record<string, unknown>) {
    if (!this.client) return { hits: { hits: [] } };
    return this.client.search({ index, body: query });
  }

  async deleteDocument(index: string, id: string): Promise<void> {
    if (!this.client) return;
    await this.client.delete({ index, id });
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class NutritionsService {
  config: any;
  normalNutritions = {
    iron: 18,
    vitaminb12: 6,
    folicacid: 400,
    phosphorus: 800,
    potassium: 3000,
    protein: 112,
    sodium: 2500
  };
  constructor(private api: ApiService,
    configService: ConfigService) {
    configService.getConfig().then((config) => {
      this.config = config;
    });
     }

    async search(query) {
      try {
        const result = await this.api.get(`search/instant`,
          { query: query, branded: false, self: false, detailed: true},
          { headers: { 'x-app-id': this.config['x-app-id'], 'x-app-key': this.config['x-app-key']}},
          this.config['nutritionUrl']
        );
        return {success: true, data: result };
      } catch (err) {
        return {success: false, err: err };
      }
    }

    getNormalNutritions() {
      return this.normalNutritions;
    }

}

import { createListFromAdrArray } from '../functions/createListFromAdrArray.js';
import MonterService from '../service/MonterService.js';
import HomeService from '../service/HomeService.js';
import EntranceService from '../service/EntranceService.js';
import VisitService from '../service/VisitService.js';

// const __dirname = path.resolve(path.dirname('.'));

class ImportFileController {
  async createMonter(req, res) {
    try {
      const file = await req.files.file;
      const parse = createListFromAdrArray(JSON.parse(file.data));

      const createMonter = async (obj) => {
        const result = [];
        const nameList = Object.keys(obj);
        for (const name of nameList) {
          const monterId = await MonterService.createMonter({ name });
          const adressList = Object.keys(obj[name]);
          for (const address of adressList) {
            const homeId = await HomeService.createHome({ address });
            await HomeService.home_Monter({ monterId, homeId });
            const entranceList = Object.keys(obj[name][address]);
            for (const entrance of entranceList) {
              const entranceId = await EntranceService
                .createEntrance({ numberOfEntrance: entrance }, homeId);
              const visitList = obj[name][address][entrance];
              for (const visit of visitList) {
                const visitId = await VisitService.createVisit(
                  visit,
                  entranceId,
                  monterId,
                );
                result.push(visitId);
              }
            }
          }
        }
        return result;
      };
      const result = createMonter(parse);

      console.log(await result);
      return res.json(result);
    } catch
    (error) {
      console.log(error);
      return res.json(error);
    }
  }
}

export default new ImportFileController();

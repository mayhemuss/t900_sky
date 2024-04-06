import MonterService from "../service/MonterService.js";
import HomeService from "../service/HomeService.js";
import fs from "fs";
import EntranceService from "../service/EntranceService.js";
import VisitService from "../service/VisitService.js";
import path from "path";

const __dirname = path.resolve(path.dirname(''));

class importFileController {
  async createMonter(req, res) {
    try {

      const file = req.files.file;
      const filePath = path.resolve(__dirname, "uploads", file.name)

      await fs.writeFile(filePath, file.data, async (err) => {
        if (err) {
          return res.status(500).send('Ошибка загрузки файла!');
        }
      })

      await fs.readFile(filePath, async (error, data) => {
        if (error) {  // если возникла ошибка
          return res.send('ошибка чтения файла');
        }



        const inserIntoDataBase = async (data) => {
          try {
            for (const monter of JSON.parse(data)) {
              if (monter !== null) {
                const monterId = await MonterService.createMonter(monter);
                const homeId = await HomeService.createHome(monter, monterId);
                const entranceId = await EntranceService.createEntrance(monter, homeId);
                const visitId = await VisitService.createVisit(monter, entranceId, monterId);
              }
            }
            fs.unlinkSync(filePath)
            res.send('Файл успешно загружен!')
            console.log('Файл успешно загружен!')

          } catch (error) {
            console.log(error)
            // fs.unlinkSync(filePath)
            res.status(500).json({message: error.message});
          }

        };

        inserIntoDataBase(data);


      })


    } catch
      (error) {
      console.log(error)
      return res.json(error)
    }

  }
}

export default new importFileController()

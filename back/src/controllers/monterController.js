import MonterService from "../service/MonterService.js";
import HomeService from "../service/HomeService.js";
import fs from "fs";
import EntranceService from "../service/EntranceService.js";
import VisitService from "../service/VisitService.js";

class monterController {
  async createMonter(req, res) {
    try {


      const file = req.files.file;
      const filePath = `./uploads/${file.name}`;

      await fs.writeFile(filePath, file.data, async (err) => {
        if (err) {
          return res.status(500).send('Ошибка загрузки файла!');
        }
      })

      await fs.readFile(filePath, function (error, data) {
        if (error) {  // если возникла ошибка
          return res.send('ошибка чтения файла');
        }

        const promises = JSON.parse(data).map(e => {
          return () => new Promise(async function (resolve) {



            const monterId = await MonterService.createMonter(e)

            const homeId = await HomeService.createHome(e, monterId)

            const entranceId = await EntranceService.createEntrance(e, homeId)

            const visitId = await VisitService.createVisit(e, entranceId)


            resolve(null)
          });
        })

        async function chain(arr) {
          const result = [];
          for (const item of arr) {
            result.push(await item(result[result.length - 1]));
          }
          fs.unlinkSync(filePath)
        }

        chain(promises)
        res.send('Файл успешно загружен!')
      })



    } catch
      (error) {
      console.log(error)
      return res.json(error)
    }

  }
}

export default new monterController()

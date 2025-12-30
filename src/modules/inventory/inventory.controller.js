import fs from "fs";
import { parse } from "csv-parse";
import { sequelize } from "../../db/dbConnection.js"
import { Book, Author, Store, StoreBook } from "../../db/models/models.js"

const processCSV = async (records) => {
  const transaction = await sequelize.transaction()

  try {
    for (const row of records) {
      const { store_name, store_address, book_name, pages, author_name, price, logo } = row

      const [author] = await Author.findOrCreate({
        where: { name: author_name },
        transaction,
      })

      const [book] = await Book.findOrCreate({
        where: {
          name: book_name,
          author_id: author.id,
        },
        defaults: {
          pages,
        },
        transaction,
      })

      const [store] = await Store.findOrCreate({
        where: { name: store_name },
        defaults: {
          address: store_address,
          logo,
        },
        transaction,
      })

      const [storeBook, created] = await StoreBook.findOrCreate({
        where: {
          store_id: store.id,
          book_id: book.id,
        },
        defaults: {
          price,
          copies: 1,
          sold_out: false,
        },
        transaction,
      })

      // if book is created before, increase book copies 
      if (!created) {
        storeBook.copies += 1
        storeBook.sold_out = false
        await storeBook.save({ transaction })
      }
    }

    await transaction.commit()

    return {state: true, err: null}

  } catch (err) {
    await transaction.rollback()
    return { state: false, err }
  }
}


export const uploadInventory = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'CSV file is required' });
  }

  const records = []
  const uploadDir = './uploads'

  try {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)
    const fileStream = fs.createReadStream(req.file.path)
    const parser = parse({ columns: true, trim: true })

    fileStream.pipe(parser)
      .on('data', (row) => records.push(row))
      .on('end', async () => {
        try {
          const { state, data, err } = await processCSV(records)
          if (!state) {
            return res.status(500).json({ message: err })
          }

          res.json({
            message: 'Inventory uploaded successfully',
            data: records,
          })
        } finally {
          fs.unlink(req.file.path, () => {})
        }
      })
      .on('error', (streamErr) => {
        console.error('Stream/Parser error:', streamErr)
        fs.unlink(req.file.path, () => {})
        res.status(500).json({ message: 'CSV processing failed', error: streamErr.message })
      })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'CSV processing failed' })
  }

}

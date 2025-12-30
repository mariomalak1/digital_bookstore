import express from 'express'
import dayjs from 'dayjs'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'

import { Store, Book, Author, StoreBook } from '../../db/models/models.js'

export const getStoreReports = async (req, res) => {
  try {
    const { id: storeId } = req.params

    const store = await Store.findByPk(storeId)

    if (!store) return res.status(404).json({ message: 'Store not found' })

    const topBooks = await StoreBook.findAll({
      where: { store_id: storeId },
      include: [{ model: Book, include: [Author] }],
      order: [['price', 'DESC']],
      limit: 5,
    })

    const topAuthorsData = await StoreBook.findAll({
      where: { store_id: storeId },
      include: [{ model: Book, include: [Author] }],
    })

    const authorMap = {}
    topAuthorsData.forEach((sb) => {
      const authorName = sb.Book.Author.name
      authorMap[authorName] = (authorMap[authorName] || 0) + 1
    })

    const topAuthors = Object.entries(authorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const doc = new PDFDocument()
    const fileName = `${store.name}-Report-${dayjs().format('YYYY-MM-DD')}.pdf`
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Type', 'application/pdf')

    doc.pipe(res)

    doc.fontSize(20).text(store.name, { align: 'center' })

    if (store.logo) {
      const logoPath = path.join(process.cwd(), store.logo)
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, { width: 150, align: 'center' })
      }
    }

    doc.moveDown()

    // Top 5 priciest books
    doc.fontSize(16).text('Top 5 Priciest Books', { underline: true })
    topBooks.forEach((sb, i) => {
      doc
        .fontSize(12)
        .text(
          `${i + 1}. ${sb.Book.name} by ${sb.Book.Author.name} — $${sb.price} (${sb.copies} copies)`
        )
    })

    doc.moveDown()

    doc.fontSize(16).text('Top 5 Prolific Authors', { underline: true })
    topAuthors.forEach(([name, count], i) => {
      doc.fontSize(12).text(`${i + 1}. ${name} — ${count} book(s)`)
    })

    doc.end()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to generate report' })
  }
}

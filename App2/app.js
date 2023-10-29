import express from 'express'

import { getNotes, getNote, createNote } from './database.js'

const app = express()

app.use(express.json())

app.get("/notes", async (req, res) => {
    const notes = await getNotes()
    res.send(notes)
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id
    const note = await getNote(id)
    res.send(note)
})

app.post("/notes", async (req, res) => {
    const { Note, Details } = req.body
    const note = await createNote(Note, Details)
    res.status(201).send(note)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(`Something broke! Error: ${err.message}`)
  })

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})


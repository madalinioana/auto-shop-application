const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// conectare la baza de date
const uri = 'mongodb+srv://madalinioana:qwertyqwerty@proiectbd.ipyt5ul.mongodb.net/?retryWrites=true&w=majority&appName=ProiectBD';
const client = new MongoClient(uri);

// verificare port
app.listen(port, () => {
  //console.log(`Port: ${port}`);
});

async function connectToDB() {
  try {
    await client.connect();
    console.log('Conectat la baza de date');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDB();

app.use(express.json());

// request HTTP de tip get pentru 'cars'
app.get('/api/cars', async (req, res) => {
  try {
    const db = client.db('auto_shop');
    const collection = db.collection('cars');

    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error('Eroare in procesul de obtinere a documentelor:', error);
    res.status(500).json({ error: 'Eroare interna a serverului' });
  }
});

// request HTTP de tip post pentru 'cars'
app.post('/api/cars', async (req, res) => {
  try {
    const db = client.db('auto_shop');
    const collection = db.collection('cars');

    // se preiau actualizarile din corpul cererii
    const newData = req.body;

    // se adauga noul document in colectie
    const result = await collection.insertOne(newData);

    // se verifica daca documentul a fost adaugat cu succes
    res.json({ message: 'Documentul a fost adaugat cu succes', documentId: result.insertedId });
  } catch (error) {
    console.error('Eroare in procesul de adaugare a documentului:', error);
    res.status(500).json({ error: 'Eroare in procesul de adaugare a documentului' });
  }
});

// request HTTP de tip patch pentru 'cars'
app.patch('/api/cars/:id', async (req, res) => {
  try {
    const db = client.db('auto_shop');
    const collection = db.collection('cars');
    const id = req.params.id;

    // se verifica daca ID-ul este unul valid
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID invalid' });
    }

    // se preiau actualizarile din corpul cererii
    const updates = { $set: req.body };

    // se actualizeaza documentul folosind ID-ul
    const result = await collection.updateOne({ _id: new ObjectId(id) }, updates);

    // se verifica daca documentul a fost actualizat
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Documentul nu a fost gasit' });
    }

    res.json({ message: 'Document actualizat cu succes' });
  } catch (error) {
    console.error('Eroare in procesul de actualizare a documentului:', error);
    res.status(500).json({ error: 'Eroare in procesul de actualizare a documentului' });
  }
});


// request HTTP de tip delete pentru 'cars'
app.delete('/api/cars/:id', async (req, res) => {
  try {
    const db = client.db('auto_shop');
    const collection = db.collection('cars');
    const idToDelete = new ObjectId(req.params.id);

    const result = await collection.deleteOne({ _id: idToDelete });
    if (result.deletedCount === 1) {
      res.json({ message: 'Documentul a fost sters cu succes' });
    } else {
      res.status(404).json({ error: 'Documentul nu a fost gasit' });
    }
  } catch (error) {
    console.error('Eroare in procesul de stergere a documentului:', error);
    res.status(500).json({ error: 'Eroare interna a serverului' });
  }
});


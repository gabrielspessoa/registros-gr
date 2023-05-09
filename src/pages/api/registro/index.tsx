import { db } from '@/lib/firebase';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const registros: any[] = [];
      const querySnapshot = await getDocs(
        query(collection(db, 'registro'), orderBy('date', 'desc'))
      );
      querySnapshot.forEach((doc) => {
        const data: any = { id: doc.id, ...doc.data() };
        data.date = data.date.seconds;

        registros.push(data);
      });
      res.status(201).send(registros);
    } catch (e: any) {
      res.status(401).send(e.message);
    }
  }

  if (req.method === 'POST') {
    try {
      if (req.body.razao_social === '123') {
        throw new Error('ERRO PORRA kkkk');
      }
      const docRef = await addDoc(collection(db, 'registro'), {
        ...req.body,
        date: new Timestamp(req.body.date / 1000, 0),
      });
      res.status(201).send('Document written with ID: ' + docRef.id);
    } catch (e: any) {
      res.status(401).send(e.message);
    }
  }

  if (req.method === 'DELETE') {
    try {
      await deleteDoc(doc(db, 'registro', req.body));

      res.status(201).send('Document deleted with ID: ' + req.body);
    } catch (e: any) {
      res.status(401).send(e.message);
    }
  }

  if (req.method === 'PATCH') {
    try {
      const data = (({ id, ...rest }) => rest)(req.body);
      await updateDoc(doc(db, 'registro', req.body.id), {
        ...data,
        date: new Timestamp(req.body.date / 1000, 0),
      });

      res.status(201).send('Document updated with ID: ' + req.body);
    } catch (e: any) {
      res.status(401).send(e.message);
    }
  }
}

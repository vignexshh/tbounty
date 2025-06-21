import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb"; // adjust path to your clientPromise export

export const config = {
  api: {
    bodyParser: false, // Required for FormData (multipart/form-data)
  },
};

import formidable from "formidable";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Form parsing error" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("tbounty_services"); // replace with your DB name
      const collection = db.collection("tbounty_list");

      const bounty = {
        title: fields.title,
        description: fields.description,
        price: fields.price,
        createdAt: new Date(),
      };

      await collection.insertOne(bounty);

      return res.status(200).json({ success: true, bounty });
    } catch (error) {
      return res.status(500).json({ error: "Database error" });
    }
  });
}
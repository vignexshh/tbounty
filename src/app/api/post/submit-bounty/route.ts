import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");

    const client = await clientPromise;
    const db = client.db("tbounty_services");
    const collection = db.collection("tbounty_list");

    const bounty = {
      title,
      description,
      price,
      createdAt: new Date(),
    };

    await collection.insertOne(bounty);

    return new Response(JSON.stringify({ success: true, bounty }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
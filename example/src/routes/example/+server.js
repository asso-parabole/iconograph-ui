// @ts-nocheck
import { json } from '@sveltejs/kit';

export async function GET({ request, cookies }) {

    let response = [
        { id: "1234", name: "Saint Louis", city: "Paris", type: "HOMME", status: "ACTIVE" },
        { id: "1234", name: "Saint Jean", city: "Jérusalem", type: "HOMME", status: "DISABLED" },
        { id: "1234", name: "Sainte Blandine", city: "Lyon", type: "FEMME", status: "ACTIVE" },
        { id: "1234", name: "Saint Christophe", city: "Corinthe", type: "HOMME", status: "ACTIVE" },
        { id: "1234", name: "Sainte Rita", city: "Lupiano", type: "FEMME", status: "DELETED" },
        { id: "1234", name: "Saint François d'Assise", city: "Assise", type: "HOMME", status: "ACTIVE" }
    ]

	return json({ data: response }, { status: 201 });
}
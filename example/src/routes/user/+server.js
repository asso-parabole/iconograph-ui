// @ts-nocheck
import { json } from '@sveltejs/kit';

export async function GET({ request, cookies, params, url }) {
    let search = url.searchParams.get('contains')

    let users = [
        { id: 1, firstname: "Alice", lastname:"Dupont", avatar: "https://i.pravatar.cc/40?u=alice" },
        { id: 2, firstname: "Bob", lastname:"Martin", avatar: "https://i.pravatar.cc/40?u=bob" },
        { id: 3, firstname: "Charlie", lastname:"Mabrier", avatar: "https://i.pravatar.cc/40?u=charlie" },
        { id: 4, firstname: "David", lastname:"Pascal", avatar: "https://i.pravatar.cc/40?u=david" },
        { id: 5, firstname: "Zoé", lastname:"Brauen", avatar: "https://i.pravatar.cc/40?u=charlie" },
        { id: 6, firstname: "Nathan", lastname:"Chevalier", avatar: "https://i.pravatar.cc/40?u=david" },
    ];

    let filteredUsers = users.filter((user) => {
        let str = (user.firstname + ' ' + user.lastname).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const inputStr = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return str.includes(inputStr);
    });

	return json({ data: filteredUsers }, { status: 201 });
}
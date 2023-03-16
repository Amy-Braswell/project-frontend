import { 
    Form, 
    useLoaderData,
    redirect, 
} from "react-router-dom";
import { updateContact } from "../contacts";

export async function action ({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
    const { contact } = useLoaderData();

    return(
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input  
                    name="first"
                    type="text"
                    aria-label="First name"
                    placeholder="First"
                    defaultValue={contact.first}
                />
                <input
                    name="last"
                    type="text"
                    aria-label="Last name"
                    placeholder="Last"
                    defaultValue={contact.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    name="twitter"
                    type="text"
                    aria-label="Twitter Handle"
                    placeholder="@jack"
                    defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    name="avatar"
                    type="text"
                    aria-label="Avatar URL"
                    placeholder="https://example.com/avatar.jpg"
                    defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button">Cancel</button>
            </p>
        </Form>
    );
}
no .env required for this project

make sure your terminal is in the hardhead-frontend-routes-- directory and then start app with npm run dev

app will run on http://127.0.0.1:5173, you will need to manually reload the browser window after changes

entry to app is through src/main.jsx 

src/routes/root.jsx contains the html elements rendered to the DOM

src/contacts.js provides the fake data

close the app by typing Cntl + C in the terminal window so port 5173 will be available the next time you start the app

Sidebar gets all contacts

Available routes for Main window:
/ for home page -- main window will be empty upon loading
contacts/:contactId  to get a contact
contacts/:contactId/edit to edit(post) a contact 


<!-- Blurb from the documentation might be relevent to client side rendering vs server side rendering...

HTML forms actually cause a navigation in the browser, just like clicking a link. The only difference is in the request: links can only change the URL while forms can also change the request method (GET vs POST) and the request body (POST form data).

Without client side routing, the browser will serialize the form's data automatically and send it to the server as the request body for POST, and as URLSearchParams for GET. React Router does the same thing, except instead of sending the request to the server, it uses client side routing and sends it to a route action. -->

<!-- A Note about React Router's <Form> component ---
This is where the "old school web" programming model shows up. As we discussed earlier, <Form> (specifically the React Router component) prevents the browser from sending the request to the server and sends it to your route action instead. In web semantics, a POST usually means some data is changing. By convention, React Router uses this as a hint to automatically revalidate the data on the page after the action finishes. That means all of your useLoaderData hooks update and the UI stays in sync with your data automatically
 -->

 <!-- A note about URL Parameters ---
 Note the :contactId URL segment. The colon (:) has special meaning, turning it into a "dynamic segment". Dynamic segments will match dynamic (changing) values in that position of the URL, like the contact ID. We call these values in the URL "URL Params", or just "params" for short.
 -->

 <!-- A note about mutation ---
 Without JavaScript, when a form is submitted, the browser will create FormData and set it as the body of the request when it sends it to the server. As mentioned before, React Router prevents that and sends the request to your action instead, including the FormData.

Each field in the form is accessible with formData.get(name). For example, given the input field from above, you could access the first and last names like this:

export async function action({ request, params }) {
  const formData = await request.formData();
  const firstName = formData.get("first");
  const lastName = formData.get("last");
  // ...
}
Since we have a handful of form fields, we used Object.fromEntries to collect them all into an object, which is exactly what our updateContact function wants.

const updates = Object.fromEntries(formData);
updates.first; // "Some"
updates.last; // "Name"
Aside from action, none of these APIs we're discussing are provided by React Router: request, request.formData, Object.fromEntries are all provided by the web platform.

After we finished the action, note the redirect at the end:

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}
Loaders and actions can both return a Response (makes sense, since they received a Request!). The redirect helper just makes it easier to return a response that tells the app to change locations.

Without client side routing, if a server redirected after a POST request, the new page would fetch the latest data and render. As we learned before, React Router emulates this model and automatically revalidates the data on the page after the action. That's why the sidebar automatically updates when we save the form. The extra revalidation code doesn't exist without client side routing, so it doesn't need to exist with client side routing either.-->
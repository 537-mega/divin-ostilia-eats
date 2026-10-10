# Divin Ostilia Eats

Build a complete, responsive website for **Divin Ostilia Wine Bar**, a Roman wine bar at Via Ostilia 4, 00184 Roma, Italia. The result should closely match the structure, content, visual character, and functionality described below. Build the actual working website—not a mockup or a single landing page.

## 1. Purpose and access
The website is primarily for restaurant visitors. Opening the root URL must show the public restaurant homepage directly, with no login screen or sign-in redirect.

Public pages must be accessible without an account:
- `/` — Home
- `/menu` — Menu
- `/booking` — Booking
- `/contact` — Contact

Keep staff login only within the staff-entry flow:
- `/staff` — protected staff area
- `/login` — staff login
- Disable public registration.
- A visitor following the discreet Staff link or opening `/staff` while logged out should be sent to login.
- Staff must be invited accounts. Only admins can manage bookings, closures, or menu content.
- Staff must be able to sign out and return to the public website.
- Never gate the public homepage, menu, booking, or contact pages behind authentication.

## 2. Restaurant identity and design
Create an elegant, warm, editorial wine-bar style. It should feel specific to a welcoming Roman neighborhood restaurant, not like a generic restaurant template or an “AI-style” website.

Use the established palette:
- Burgundy: `#800020`
- Warm cream: `#F3E6D5`
- Near-white: `#FFF9F2`
- Muted rose: `#D45060`

Use refined serif display typography for headings and a clean, readable sans-serif for body text. Use generous spacing, clear hierarchy, restrained borders, subtle rounded corners, and high-contrast text. Keep copy concise and grounded, not flowery. Use real, relevant venue, food, wine, and interior photography; do not use empty image boxes or lorem ipsum. Make the site mobile-first and polished at mobile, tablet, and desktop widths.

Provide English and Italian throughout the public website and staff interface. Use natural, concise translations and remember the selected language as the visitor moves between pages.

## 3. Venue details
Use these details consistently:
- Name: Divin Ostilia Wine Bar
- Address: Via Ostilia 4, 00184 Roma, Italia
- Phone: +39 06 7049 6526
- Phone action: `tel:+390670496526`
- Map directions should open a Google Maps search for Via Ostilia 4, 00184 Roma.
- Opening hours: Monday–Saturday 11:30–23:00; Sunday 11:30–22:30.
- Use the `Europe/Rome` time zone wherever local time affects the interface.

## 4. Shared site navigation and footer
Create a public header with:
- Divin Ostilia wordmark and “Wine Bar · Roma” identity.
- Links to Home, Menu, Booking, and Contact.
- A prominent Reserve CTA linking to `/booking`.
- A clickable phone number on larger screens.
- English/Italian language switch.
- Responsive mobile navigation containing the same public links, reservation action, phone number, language switch, and Roman local time where appropriate.

Do not make Staff/Login a primary visitor-facing navigation item. Add a discreet Staff link in the footer.

The footer should include the venue name, a concise venue introduction, address with working map directions, clickable telephone number, opening hours, public navigation, and the discreet Staff link. All visible links and buttons must have real destinations or actions; no dead links or decorative controls.

## 5. Homepage composition
Build the homepage sections in this order:

### A. Hero
- Full-bleed restaurant image.
- Dark gradient overlay that maintains text readability.
- Venue identity and concise welcome message.
- Location/address context.
- Primary “Reserve a table” action linking to `/booking`.
- Secondary “View the menu” action linking to `/menu`.
- Warm, atmospheric image treatment and a restrained entrance animation.

### B. Story / The room
- Section eyebrow such as “The room” / “La sala”.
- Heading about a welcoming Roman wine-bar atmosphere.
- Concise English and Italian copy describing a warm, lively place with classic Italian cuisine and a wide selection of wines.
- Interior photograph displayed at full natural visual opacity.
- Show the two opening-hour facts: Monday–Saturday 11:30–23:00 and Sunday 11:30–22:30. Do not invent an additional fact.

### C. Signatures / From our counter
Show three distinct food-and-drink cards:
1. Wine / red wine poured into a glass.
2. A board of prosciutto and pecorino.
3. Roman pasta, including cacio e pepe.

Each card has its own independently replaceable image and concise bilingual title/description. Do not make multiple cards share an image-edit target.

### D. Food carousel
- Display three food images at once on desktop, adapting to fewer visible cards on narrow screens.
- Include working previous/next controls and localized captions.
- Include these individual subjects: bruschetta, Roman pastas, grilled octopus, gnocchi, desserts, aperitivo, the menu, and meatballs with potato wedges.
- Each slide must have its own image and English/Italian caption; changing one image must not change another.
- Apply a legible bottom gradient and caption treatment. Preserve clear contrast; do not remove the gradient while leaving white text directly on an unshaded photo.

### E. Gallery
- A curated, responsive set of venue and food photographs.
- Short localized heading and eyebrow.
- Every image independently replaceable.

### F. Location / Proximity
- Show the full address, working map-directions link, and clickable phone number.
- Include a venue/street visual and concise travel/location copy.
- Make it easy to find and visit the wine bar.

### G. Reviews
- Place the reviews area near the bottom of the homepage.
- Keep it compact and visually restrained.
- Include TripAdvisor and Google rating summaries plus a small number of customer quotes.
- Avoid a redundant standalone star row and an overly tall review section.
- Never present invented or placeholder quotes as real reviews. Use editable verified review text, or clearly label sample content until the owner replaces it.
- Do not imply that displayed rating totals are verified unless actual figures are supplied.

### H. Closing CTA
- End with a concise invitation and a working reservation action.

## 6. Motion and responsive behavior
Use subtle scroll-reveal effects for homepage sections as they enter view. Keep the hero entrance restrained. Respect reduced-motion preferences. Do not add gratuitous animation. Ensure carousels, forms, navigation, cards, text, and staff tools remain usable at all screen sizes.

## 7. Menu page and editable menu
Create a public menu page with:
- Clear category navigation.
- Dish names, descriptions, and prices.
- English and Italian content.
- A mobile-friendly category selector/navigation.
- The current seeded bilingual restaurant menu as the fallback until staff saves menu content.
- The latest saved menu shown to all public visitors after staff edits it.

The menu must not be hardcoded in a way that prevents authorized staff updates. Do not invent final menu prices; use supplied restaurant menu data or clearly mark any missing values for the owner to complete.

## 8. Public reservation flow
Build a complete multi-step reservation experience:

### Step 1: Party and date
- Choose a date and party size.
- Default party size to 2.
- Online party-size maximum: **4**.

### Step 2: Time slot
- Load availability for the selected date.
- Show one-hour reservation slots from **12:00 through 22:00** in the Europe/Rome time zone.
- Capacity: **10 seats per slot**.
- Keep capacity and maximum online party size configurable in one place.
- Display remaining seats when useful.
- Disable and visibly grey out closed, full, or otherwise unsuitable slots.
- Show a loading state while availability loads and a clear empty state when no suitable times are available.

### Step 3: Guest details
Collect:
- Guest name
- Email
- Phone
- Optional notes for allergies, occasion, or seating requests

Validate required fields and email format. Display clear inline validation and submission errors. Disable repeat submission while saving.

### Step 4: Confirmation
Show a clear success panel with the submitted reservation details and an action to start another booking.

Before creating a reservation, confirm that the chosen slot still has enough seats. If it became unavailable, refresh availability, explain the issue, and let the guest select another time. Do not silently confirm a reservation that exceeds capacity.

## 9. Staff area
Build a protected staff dashboard with two tabs:

### Bookings tab
- Date navigation with previous-day, next-day, date-picker, and Today controls.
- Show booking and guest totals for the chosen date.
- Display confirmed bookings and slot occupancy.
- Allow authorized staff to add a booking manually.
- Allow authorized staff to cancel a booking and release its held seats.
- Allow authorized staff to block a single time slot or an entire date.
- Support an internal reason/note for closures; never expose the reason publicly.
- Refresh dashboard data after changes and reflect booking/seat-hold updates where realtime subscriptions are available.
- Show loading feedback while date data is being loaded.
- Show the signed-in staff email where space permits.

### Menu tab
- Edit category titles in English and Italian.
- Edit optional category notes in English and Italian.
- Add and remove categories.
- Add and remove dishes.
- Edit dish name, English and Italian descriptions, and price.
- Save changes persistently and make them appear on the public menu.
- Show loading and save-in-progress/success/error feedback.
- Include a reset-to-seeded-menu action.

The dashboard should include a language switch, Back to site action, and working sign-out action. Signed-in non-admins must see an access-denied message rather than management controls.

## 10. Data model and security
Use persistent database entities, with access rules configured at creation. Keep guest information private.

### Booking
Fields:
- `date`
- `time`
- `guests`
- `name`
- `email`
- `phone`
- `notes`
- `status`: `confirmed` or `cancelled`
- `source`: `online` or `staff`

Required fields: date, time, guests, name, email. Public visitors may create online bookings. Only admins may read, update, or delete booking records. Do not expose booking guest details through public availability checks or public pages.

### SeatHold
Fields:
- `date`
- `time`
- `seats`
- optional `booking_id`

Store only anonymous seat counts here—never guest details. Public availability needs the minimum access needed to read capacity counts and create a hold during booking. Only admins may update or delete holds. Do not let public access reveal guest identity.

### Closure
Fields:
- `date`
- `time` (a specific slot or `all`)
- `reason` (internal note)

Availability needs to know whether a date or slot is closed, but public pages must not reveal internal reasons. Only admins may create, update, or delete closures.

### MenuContent
Fields:
- `data`, an object containing the complete menu structure, e.g. `{ "categories": [...] }`

Public visitors may read the menu. Only admins may create, update, or delete menu content.

Filter database reads by the requested date and relevant status on the server; do not fetch entire collections to filter in the browser. Availability must combine that date’s seat holds and closures, sum held seats per slot, and return whether each slot is open, closed, full, or has remaining capacity.

Prevent simultaneous reservations from exceeding the slot capacity. A client-side availability check followed by separate booking and hold writes is not a safe atomic guarantee; use an atomic/server-side mechanism if the platform supports it. If it does not, do not claim strict concurrency protection and make the limitation clear.

## 11. Quality and completion checklist
Deliver complete working flows, not visual stubs:
- Public homepage loads without authentication.
- All four public routes work without signing in.
- Staff login appears only as part of the staff-entry path.
- Registration is disabled.
- Only invited admins can access management.
- Booking date, party size, slot availability, validation, confirmation, and retry-on-unavailable work.
- Full and closed times are disabled visibly.
- Booking and guest details remain private.
- Staff booking additions/cancellations and closure changes persist and refresh the dashboard.
- Menu changes persist and appear on the public menu.
- English and Italian work across public and staff screens.
- All navigation, CTAs, carousel controls, map links, telephone links, tabs, and forms have functioning actions.
- Images are real, relevant, responsive, and independently editable.
- Loading, empty, error, success, and access-denied states are present where the flows require them.
- No lorem ipsum, dead links, nonfunctional controls, misleading review claims, or unsupported business details.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://divin-ostilia-eats.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/71498cb7-3f9c-48b6-a6e7-dfff582d8509).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

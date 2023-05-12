import axios from "axios";



export async function getAllEvents() {
  const response = await axios.get(
    "https://nextjs-project-4fa65-default-rtdb.firebaseio.com/events.json"
  )
  
  const data = await response.data;
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}


export async function getEventById(id : any) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
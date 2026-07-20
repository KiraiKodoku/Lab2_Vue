<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventDetails from '@/components/EventDetails.vue'
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'https://my-json-server.typicode.com/KiraiKodoku/Lab2_Vue_MockServer/events'

const events = ref<Event[] | null>(null)

onMounted(() => {
  axios
    .get(API_URL)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

async function fetchEvents() {
  const res = await fetch(API_URL)
  events.value = await res.json()
}

async function addEvent() {
  const newEvent = {
    id: Date.now(),
    category: 'education',
    title: 'Book Drive',
    description: 'Donate used books for local schools',
    location: 'City Library',
    date: 'August 5, 2026',
    time: '14:00',
    petsAllowed: false,
    organizer: 'Sam Reads',
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent),
  })

  const created = await res.json()
  events.value.push(created)
}

onMounted(fetchEvents)
</script>

<template>
  <div class="home">
    <button class="add-btn" @click="addEvent">Add New Event</button>
    <div class="events">
      <div v-for="event in events" :key="event.id" class="event-row">
        <EventCard :event="event" />
        <EventDetails :event="event" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-btn {
  margin: 16px 0;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #39495c;
  background: #42b983;
  color: white;
  border-radius: 4px;
}
.add-btn:hover {
  opacity: 0.9;
}
.event-row {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
}
</style>

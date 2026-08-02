<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventDetails from '@/components/EventDetails.vue'
import EventService from '@/services/EventService'
import type { Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import axios from 'axios'

const API_URL = 'https://my-json-server.typicode.com/KiraiKodoku/Lab2_Vue_MockServer/events'

const events = ref<Event[] | null>(null)
const totalEvents = ref<number>(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / size.value)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
})
const page = computed(() => props.page)
const size = computed(() => props.size)

onMounted(() => {
  axios
  watchEffect(() => {
    events.value = null
    EventService.getEvents(size.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
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
    <div class="page-size">
      <span>Events per page: </span>
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, size: 2 } }">2</RouterLink> |
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, size: 3 } }">3</RouterLink> |
      <RouterLink :to="{ name: 'event-list-view', query: { page: 1, size: 5 } }">5</RouterLink>
    </div>
    <div class="events">
      <div v-for="event in events" :key="event.id" class="event-row">
        <EventCard :event="event" />
        <EventDetails :event="event" />
      </div>
      <div class="pagination">
        <RouterLink
          :to="{ name: 'event-list-view', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          >Prev Page
        </RouterLink>

        <RouterLink
          :to="{ name: 'event-list-view', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
        >
          Next Page</RouterLink
        >
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
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

.page-size {
  margin-bottom: 12px;
}
.page-size a {
  margin: 0 6px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}
.page-size a.router-link-exact-active {
  color: #42b983;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
